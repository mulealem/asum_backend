# ── Stage 1: install + build ──────────────────────────────────
FROM node:22-alpine AS builder

# bcrypt needs build tools
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
COPY scripts ./scripts/

RUN npm ci

COPY . .

RUN npm run build && \
    test -f dist/main.js || (echo "ERROR: dist/main.js not found after build" && exit 1)

# ── Stage 2: production image ─────────────────────────────────
FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/main"]
