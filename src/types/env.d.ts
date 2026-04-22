declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL?: string
    NEXT_PUBLIC_SERVER_URL?: string
    PAYLOAD_SECRET?: string
    POSTGRES_DB?: string
    POSTGRES_PASSWORD?: string
    POSTGRES_PORT?: string
    POSTGRES_USER?: string
  }
}

