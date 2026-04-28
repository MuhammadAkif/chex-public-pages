# Chex Public Pages

A Next.js application powered by [Payload CMS](https://payloadcms.com/) with a PostgreSQL database.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **CMS:** Payload CMS 3
- **Database:** PostgreSQL 17 (via Docker)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Sass
- **Package Manager:** Yarn

## Prerequisites

- Node.js >= 20.9.0
- Yarn
- Docker (for local PostgreSQL)

## Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Update the values in `.env` as needed. If `DATABASE_URL` is omitted, local development falls back to `postgresql://payload:payload@localhost:5433/payload_app`, while Docker falls back to its internal `postgres` service.

### 3. Start the database

```bash
yarn db:up
```

### 4. Start the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The Payload admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the server | `http://localhost:3000` |
| `PAYLOAD_SECRET` | Secret key for Payload CMS (use a long random string in production) | — |
| `DATABASE_URL` | Optional PostgreSQL connection string. Hosted databases can be set here. | local PostgreSQL |
| `SOURCE_DATABASE_URL` | Optional source database for `db:migrate:local-to-env` | `postgresql://payload:payload@localhost:5433/payload_app` |
| `POSTGRES_DB` | PostgreSQL database name | `payload_app` |
| `POSTGRES_USER` | PostgreSQL user | `payload` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `payload` |
| `POSTGRES_PORT` | PostgreSQL host port | `5433` |

## Scripts

| Script | Description |
|---|---|
| `yarn dev` | Start the development server with Turbopack |
| `yarn build` | Build for production |
| `yarn start` | Start the production server |
| `yarn typecheck` | Run TypeScript type checking |
| `yarn db:migrate:local-to-env --yes` | Copy the local PostgreSQL database into the database configured by `DATABASE_URL` |
| `yarn db:up` | Start the PostgreSQL Docker container |
| `yarn db:down` | Stop the PostgreSQL Docker container |
| `yarn payload` | Run Payload CLI commands |
| `yarn payload:generate:types` | Generate Payload TypeScript types |
| `yarn payload:generate:importmap` | Generate Payload import map |
| `yarn payload:migrate` | Run database migrations |
| `yarn payload:migrate:create` | Create a new migration |
| `yarn payload:migrate:status` | Check migration status |
| `yarn payload:migrate:refresh` | Refresh migrations |
