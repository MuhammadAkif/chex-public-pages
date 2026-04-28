# ── Stage 1: Install all dependencies ────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time.
# Pass --build-arg NEXT_PUBLIC_SERVER_URL=https://your-domain.com for production.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# ── Stage 3: Production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Tell the Payload CLI where to find the config (matches the yarn script behaviour)
ENV PAYLOAD_CONFIG_PATH=payload.config.ts

# node_modules are kept in full because `payload migrate` compiles
# payload.config.ts at runtime and requires all peer packages.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Next.js production output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Source files the Payload CLI needs to parse the config and collections
COPY --from=builder /app/src ./src
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Optional seed / import scripts devs may run inside the container
COPY --from=builder /app/scripts ./scripts

EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
