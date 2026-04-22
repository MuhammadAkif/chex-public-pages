declare module './admin/importMap.js' {
  import type { ImportMap } from 'payload'

  export const importMap: ImportMap
}

declare module '../importMap.js' {
  import type { ImportMap } from 'payload'

  export const importMap: ImportMap
}
