import { spawn, spawnSync } from 'node:child_process'
import nextEnv from '@next/env'

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

const DEFAULT_LOCAL_DATABASE_URL = 'postgresql://payload:payload@localhost:5433/payload_app'
const DEFAULT_POSTGRES_CONTAINER = 'chex-public-pages-postgres'

type CommandSpec = {
  args: string[]
  command: string
  label: string
}

const argv = process.argv.slice(2)

function cliValue(name: string) {
  const prefix = `${name}=`
  return argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length)
}

function hasFlag(name: string) {
  return argv.includes(name)
}

function redactDatabaseURL(value: string) {
  try {
    const url = new URL(value)

    if (url.password) {
      url.password = '****'
    }

    return url.toString()
  } catch {
    return value.replace(/\/\/([^:@/]+):([^@/]+)@/, '//$1:****@')
  }
}

function parseDatabaseURL(value: string) {
  try {
    return new URL(value)
  } catch {
    throw new Error(`Invalid database connection string: ${redactDatabaseURL(value)}`)
  }
}

function normalizedDatabaseIdentity(value: string) {
  const url = parseDatabaseURL(value)
  const port = url.port || (url.protocol === 'postgresql:' || url.protocol === 'postgres:' ? '5432' : '')

  return [
    url.protocol,
    url.username,
    url.hostname.toLowerCase(),
    port,
    url.pathname,
  ].join('|')
}

function sameDatabase(left: string, right: string) {
  return normalizedDatabaseIdentity(left) === normalizedDatabaseIdentity(right)
}

function isLocalhostDatabase(value: string) {
  const { hostname } = parseDatabaseURL(value)
  const normalized = hostname.toLowerCase()

  return normalized === 'localhost' || normalized === '127.0.0.1' || normalized === '[::1]' || normalized === '::1'
}

function isDefaultDockerMappedDatabase(value: string) {
  const url = parseDatabaseURL(value)
  const postgresPort = process.env.POSTGRES_PORT || '5433'

  return isLocalhostDatabase(value) && (url.port || '5432') === postgresPort
}

function commandExists(command: string) {
  const result = spawnSync(command, ['--version'], {
    encoding: 'utf8',
    stdio: ['ignore', 'ignore', 'ignore'],
  })

  return result.status === 0
}

function dockerContainerRunning(containerName: string) {
  if (!commandExists('docker')) {
    return false
  }

  const result = spawnSync('docker', ['inspect', '-f', '{{.State.Running}}', containerName], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  })

  return result.status === 0 && result.stdout.trim() === 'true'
}

function dockerSourceURL(sourceDatabaseURL: string) {
  const url = parseDatabaseURL(sourceDatabaseURL)
  url.hostname = 'localhost'
  url.port = '5432'

  return url.toString()
}

function buildDumpCommand(sourceDatabaseURL: string, containerName: string): CommandSpec {
  const baseArgs = [
    '--clean',
    '--if-exists',
    '--no-owner',
    '--no-privileges',
    '--format=plain',
  ]

  if (isDefaultDockerMappedDatabase(sourceDatabaseURL) && dockerContainerRunning(containerName)) {
    const sourceForContainer = dockerSourceURL(sourceDatabaseURL)

    return {
      args: ['exec', '-i', containerName, 'pg_dump', ...baseArgs, '--dbname', sourceForContainer],
      command: 'docker',
      label: `docker exec ${containerName} pg_dump --dbname ${redactDatabaseURL(sourceForContainer)}`,
    }
  }

  return {
    args: [...baseArgs, '--dbname', sourceDatabaseURL],
    command: 'pg_dump',
    label: `pg_dump --dbname ${redactDatabaseURL(sourceDatabaseURL)}`,
  }
}

function buildRestoreCommand(targetDatabaseURL: string): CommandSpec {
  return {
    args: [
      '--set',
      'ON_ERROR_STOP=1',
      '--single-transaction',
      '--dbname',
      targetDatabaseURL,
    ],
    command: 'psql',
    label: `psql --dbname ${redactDatabaseURL(targetDatabaseURL)}`,
  }
}

async function runCommand(command: string, args: string[], label: string) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'inherit', 'inherit'],
    })

    child.on('error', (error) => {
      reject(new Error(`Unable to start ${label}: ${error.message}`))
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${label} exited with code ${code ?? 'unknown'}`))
    })
  })
}

async function waitForDockerPostgres(containerName: string, sourceDatabaseURL: string) {
  const url = parseDatabaseURL(sourceDatabaseURL)
  const dbName = url.pathname.replace(/^\//, '') || process.env.POSTGRES_DB || 'payload_app'
  const dbUser = decodeURIComponent(url.username || process.env.POSTGRES_USER || 'payload')

  for (let attempt = 1; attempt <= 30; attempt += 1) {
    const result = spawnSync('docker', ['exec', containerName, 'pg_isready', '-U', dbUser, '-d', dbName], {
      encoding: 'utf8',
      stdio: ['ignore', 'ignore', 'ignore'],
    })

    if (result.status === 0) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  throw new Error(`Timed out waiting for ${containerName} to accept PostgreSQL connections.`)
}

async function ensureLocalDockerPostgres(sourceDatabaseURL: string, containerName: string) {
  if (hasFlag('--skip-docker-start') || !isDefaultDockerMappedDatabase(sourceDatabaseURL)) {
    return
  }

  if (dockerContainerRunning(containerName)) {
    return
  }

  if (!commandExists('docker')) {
    return
  }

  console.log('Local PostgreSQL container is not running; starting docker compose postgres...')
  await runCommand('docker', ['compose', 'up', '-d', 'postgres'], 'docker compose up -d postgres')
  await waitForDockerPostgres(containerName, sourceDatabaseURL)
}

async function runPipeline(dumpCommand: CommandSpec, restoreCommand: CommandSpec) {
  await new Promise<void>((resolve, reject) => {
    const dump = spawn(dumpCommand.command, dumpCommand.args, {
      stdio: ['ignore', 'pipe', 'inherit'],
    })
    const restore = spawn(restoreCommand.command, restoreCommand.args, {
      stdio: ['pipe', 'inherit', 'inherit'],
    })

    let dumpClosed = false
    let restoreClosed = false
    let failed = false

    const fail = (error: Error) => {
      if (failed) {
        return
      }

      failed = true
      dump.kill()
      restore.kill()
      reject(error)
    }

    dump.on('error', (error) => {
      fail(new Error(`Unable to start ${dumpCommand.label}: ${error.message}`))
    })

    restore.on('error', (error) => {
      fail(new Error(`Unable to start ${restoreCommand.label}: ${error.message}`))
    })

    restore.stdin.on('error', () => {
      // If psql exits early, the dump stream may see EPIPE. The process exit
      // handlers below report the real failure.
    })

    dump.stdout.pipe(restore.stdin)

    dump.on('close', (code) => {
      dumpClosed = true

      if (failed) {
        return
      }

      if (code !== 0) {
        fail(new Error(`${dumpCommand.label} exited with code ${code ?? 'unknown'}`))
        return
      }

      if (restoreClosed) {
        resolve()
      }
    })

    restore.on('close', (code) => {
      restoreClosed = true

      if (failed) {
        return
      }

      if (code !== 0) {
        fail(new Error(`${restoreCommand.label} exited with code ${code ?? 'unknown'}`))
        return
      }

      if (dumpClosed) {
        resolve()
      }
    })
  })
}

async function captureCommand(command: string, args: string[], label: string) {
  return await new Promise<string>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    const stdout: Buffer[] = []
    const stderr: Buffer[] = []

    child.stdout.on('data', (chunk: Buffer) => stdout.push(chunk))
    child.stderr.on('data', (chunk: Buffer) => stderr.push(chunk))

    child.on('error', (error) => {
      reject(new Error(`Unable to start ${label}: ${error.message}`))
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve(Buffer.concat(stdout).toString('utf8'))
        return
      }

      const message = Buffer.concat(stderr).toString('utf8').trim()
      reject(new Error(`${label} exited with code ${code ?? 'unknown'}${message ? `: ${message}` : ''}`))
    })
  })
}

function quoteIdentifier(value: string) {
  return `"${value.replace(/"/g, '""')}"`
}

function quoteLiteral(value: string) {
  return `'${value.replace(/'/g, "''")}'`
}

async function printTargetCounts(targetDatabaseURL: string) {
  const tableListSQL = `
    select table_schema, table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_type = 'BASE TABLE'
    order by table_name
  `
  const tableOutput = await captureCommand(
    'psql',
    [
      '--tuples-only',
      '--no-align',
      '--field-separator',
      '\t',
      '--dbname',
      targetDatabaseURL,
      '--command',
      tableListSQL,
    ],
    `psql --dbname ${redactDatabaseURL(targetDatabaseURL)}`,
  )
  const tables = tableOutput
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [schema, table] = line.split('\t')
      return { schema, table }
    })

  if (!tables.length) {
    console.log('Validation: target has no public tables.')
    return
  }

  const countSQL = `${tables
    .map(({ schema, table }) => {
      const label = `${schema}.${table}`
      return `select ${quoteLiteral(label)} as table_name, count(*)::bigint as row_count from ${quoteIdentifier(schema)}.${quoteIdentifier(table)}`
    })
    .join('\nunion all\n')}\norder by table_name`
  const countOutput = await captureCommand(
    'psql',
    [
      '--tuples-only',
      '--no-align',
      '--field-separator',
      '\t',
      '--dbname',
      targetDatabaseURL,
      '--command',
      countSQL,
    ],
    `psql --dbname ${redactDatabaseURL(targetDatabaseURL)}`,
  )
  const counts = countOutput
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [table, rowCount] = line.split('\t')
      return { rowCount: Number(rowCount), table }
    })
  const totalRows = counts.reduce((total, { rowCount }) => total + rowCount, 0)

  console.log(`Validation: target has ${counts.length} public tables and ${totalRows} total rows.`)
  for (const { rowCount, table } of counts) {
    console.log(`- ${table}: ${rowCount}`)
  }
}

async function main() {
  const sourceDatabaseURL =
    cliValue('--source') ||
    process.env.SOURCE_DATABASE_URL ||
    process.env.LOCAL_DATABASE_URL ||
    DEFAULT_LOCAL_DATABASE_URL
  const targetDatabaseURL =
    cliValue('--target') ||
    process.env.TARGET_DATABASE_URL ||
    process.env.DATABASE_URL ||
    DEFAULT_LOCAL_DATABASE_URL
  const containerName =
    cliValue('--postgres-container') ||
    process.env.POSTGRES_CONTAINER ||
    DEFAULT_POSTGRES_CONTAINER

  console.log(`Source: ${redactDatabaseURL(sourceDatabaseURL)}`)
  console.log(`Target: ${redactDatabaseURL(targetDatabaseURL)}`)

  if (sameDatabase(sourceDatabaseURL, targetDatabaseURL)) {
    throw new Error(
      'Source and target resolve to the same database. Set DATABASE_URL/TARGET_DATABASE_URL to the hosted database before migrating.',
    )
  }

  if (!hasFlag('--yes')) {
    throw new Error(
      'This will restore the source schema and rows into the target database. Re-run with --yes to continue.',
    )
  }

  await ensureLocalDockerPostgres(sourceDatabaseURL, containerName)

  const dumpCommand = buildDumpCommand(sourceDatabaseURL, containerName)
  const restoreCommand = buildRestoreCommand(targetDatabaseURL)

  console.log(`Dumping with: ${dumpCommand.label}`)
  console.log(`Restoring with: ${restoreCommand.label}`)
  await runPipeline(dumpCommand, restoreCommand)
  await printTargetCounts(targetDatabaseURL)
  console.log('Migration complete.')
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
