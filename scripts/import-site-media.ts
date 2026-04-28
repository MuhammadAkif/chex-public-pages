import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import nextEnv from '@next/env'
import ts from 'typescript'
import { getPayload } from 'payload'

type AssetEntry = {
  absPath: string
  hash: string
  relPath: string
}

type UploadedAsset = {
  filename: string
  url: string
}

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

const assetsDir = path.join(repoRoot, 'src/app/(site)/assets')
const siteDir = path.join(repoRoot, 'src/app/(site)')
const importPrefix = '@/app/(site)/assets/'
const supportedExtensions = new Set(['.gif', '.jpeg', '.jpg', '.mp4', '.png', '.svg', '.webp'])

function requiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required`)
  }

  return value
}

function publicURLFor(filename: string) {
  const bucket = requiredEnv('S3_BUCKET')
  const region = requiredEnv('S3_REGION')
  const baseURL = process.env.S3_PUBLIC_URL || `https://${bucket}.s3.${region}.amazonaws.com`

  return `${baseURL.replace(/\/$/, '')}/${encodeURIComponent(filename)}`
}

async function walkFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        return walkFiles(fullPath)
      }

      if (entry.isFile()) {
        return [fullPath]
      }

      return []
    }),
  )

  return files.flat()
}

async function hashFile(absPath: string) {
  const buffer = await fs.readFile(absPath)

  return crypto.createHash('sha256').update(buffer).digest('hex')
}

function titleFromFilename(filename: string) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function safeFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  const name = path
    .basename(filename, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${name || 'asset'}${ext}`
}

function dedupeAssets(entries: AssetEntry[]) {
  const byHash = new Map<string, AssetEntry[]>()

  for (const entry of entries) {
    const group = byHash.get(entry.hash) || []
    group.push(entry)
    byHash.set(entry.hash, group)
  }

  const usedFilenames = new Map<string, string>()
  const deduped = [...byHash.entries()]
    .map(([hash, group]) => {
      const sources = group.sort((a, b) => a.relPath.localeCompare(b.relPath))
      const representative = sources[0]
      const baseFilename = safeFilename(path.basename(representative.relPath))
      const existingHash = usedFilenames.get(baseFilename)
      let filename = baseFilename

      if (existingHash && existingHash !== hash) {
        const ext = path.extname(baseFilename)
        const name = path.basename(baseFilename, ext)
        filename = `${name}-${hash.slice(0, 8)}${ext}`
      }

      usedFilenames.set(filename, hash)

      return {
        filename,
        hash,
        representative,
        sources,
      }
    })
    .sort((a, b) => a.filename.localeCompare(b.filename))

  return deduped
}

async function getContentFiles() {
  const allFiles = await walkFiles(siteDir)

  return allFiles.filter((file) => path.basename(file) === 'content.ts').sort()
}

function collectAssetImports(filePath: string, sourceText: string) {
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true)
  const imports: Array<{
    alias: string
    assetRelPath: string
    end: number
    start: number
  }> = []

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
      continue
    }

    const modulePath = statement.moduleSpecifier.text
    const defaultImport = statement.importClause?.name?.text

    if (!defaultImport || !modulePath.startsWith(importPrefix)) {
      continue
    }

    imports.push({
      alias: defaultImport,
      assetRelPath: path.join('src/app/(site)/assets', modulePath.slice(importPrefix.length)),
      end: statement.getEnd(),
      start: statement.getStart(sourceFile),
    })
  }

  return imports
}

function removeImportDeclarations(sourceText: string, imports: ReturnType<typeof collectAssetImports>) {
  const ranges = imports
    .map((item) => {
      const lineStart = sourceText.lastIndexOf('\n', item.start) + 1
      const nextNewline = sourceText.indexOf('\n', item.end)

      return {
        end: nextNewline === -1 ? sourceText.length : nextNewline + 1,
        start: lineStart,
      }
    })
    .sort((a, b) => b.start - a.start)

  let next = sourceText

  for (const range of ranges) {
    next = next.slice(0, range.start) + next.slice(range.end)
  }

  return next
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function rewriteContentImports(assetURLs: Map<string, string>) {
  const contentFiles = await getContentFiles()
  let changedFiles = 0

  for (const filePath of contentFiles) {
    const sourceText = await fs.readFile(filePath, 'utf8')
    const imports = collectAssetImports(filePath, sourceText)

    if (!imports.length) {
      continue
    }

    let next = removeImportDeclarations(sourceText, imports)

    for (const item of imports.sort((a, b) => b.alias.length - a.alias.length)) {
      const url = assetURLs.get(item.assetRelPath)

      if (!url) {
        throw new Error(`Missing uploaded URL for ${item.assetRelPath}`)
      }

      const literal = JSON.stringify(url)
      const escapedAlias = escapeRegExp(item.alias)
      next = next.replace(new RegExp(`\\b${escapedAlias}\\.src\\b`, 'g'), literal)
      next = next.replace(new RegExp(`\\b${escapedAlias}\\b(?!\\s*:)`, 'g'), literal)
    }

    if (next !== sourceText) {
      await fs.writeFile(filePath, next)
      changedFiles += 1
    }
  }

  return changedFiles
}

async function main() {
  requiredEnv('S3_ACCESS_KEY_ID')
  requiredEnv('S3_SECRET_ACCESS_KEY')

  const files = (await walkFiles(assetsDir)).filter((file) =>
    supportedExtensions.has(path.extname(file).toLowerCase()),
  )
  const entries = await Promise.all(
    files.map(async (absPath) => ({
      absPath,
      hash: await hashFile(absPath),
      relPath: path.relative(repoRoot, absPath),
    })),
  )
  const deduped = dedupeAssets(entries)
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  try {
    const assetURLs = new Map<string, string>()
    const tempDir = path.join('/tmp', 'chex-payload-media-import')
    let created = 0
    let reused = 0

    await fs.mkdir(tempDir, { recursive: true })

    for (const asset of deduped) {
      const existing = await payload.find({
        collection: 'media',
        limit: 1,
        overrideAccess: true,
        where: {
          sourceHash: {
            equals: asset.hash,
          },
        },
      })

      let uploaded: UploadedAsset

      if (existing.docs[0]) {
        const doc = existing.docs[0] as { filename?: string; url?: string }
        const filename = doc.filename || asset.filename
        uploaded = {
          filename,
          url: doc.url || publicURLFor(filename),
        }
        reused += 1
      } else {
        const tempPath = path.join(tempDir, asset.filename)
        await fs.copyFile(asset.representative.absPath, tempPath)

        const doc = (await payload.create({
          collection: 'media',
          data: {
            alt: titleFromFilename(asset.filename),
            sourceHash: asset.hash,
            sourcePath: asset.representative.relPath,
          },
          filePath: tempPath,
          overrideAccess: true,
          overwriteExistingFiles: true,
        })) as { filename?: string; url?: string }

        const filename = doc.filename || asset.filename
        uploaded = {
          filename,
          url: doc.url || publicURLFor(filename),
        }
        created += 1
      }

      for (const source of asset.sources) {
        assetURLs.set(source.relPath, uploaded.url)
      }
    }

    const changedFiles = await rewriteContentImports(assetURLs)

    console.log(
      JSON.stringify(
        {
          changedContentFiles: changedFiles,
          duplicateLocalAssets: entries.length - deduped.length,
          mediaCreated: created,
          mediaReused: reused,
          totalLocalAssets: entries.length,
          uniqueMedia: deduped.length,
        },
        null,
        2,
      ),
    )
  } finally {
    await payload.destroy()
  }
}

try {
  await main()
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
