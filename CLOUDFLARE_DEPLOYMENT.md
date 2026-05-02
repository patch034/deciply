# Cloudflare deployment notes

## GitHub auto-deploy on Cloudflare Pages

- Build command: `npm run build:cloudflare`
- Build output directory: `.open-next/assets`
- Production branch: `main`

## CLI preview / deploy

- Preview: `npm run preview:cloudflare`
- Deploy: `npm run deploy:cloudflare`

## Wrangler config

- `wrangler.jsonc` is the source of truth for local Cloudflare runtime settings.
- The worker output is `.open-next/worker.js`
- Static assets are served from `.open-next/assets`
- Compatibility flags include `nodejs_compat` and `global_fetch_strictly_public`

## Environment variables

Required at build/runtime:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BRANDFETCH_CLIENT_ID`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

Notes:

- Set `NEXT_PUBLIC_SITE_URL` to the production Cloudflare URL or custom domain.
- `ADMIN_PASSWORD` and `ADMIN_SECRET` should be set in the Cloudflare environment, not committed.
- The local `DATABASE_URL="file:./dev.db"` value is fine for development, but if runtime database access is needed on Cloudflare, production must point to a real hosted database or Cloudflare-supported persistence layer.

## Why `open-next.config.ts`

- The current `@opennextjs/cloudflare` adapter uses `open-next.config.ts`.
- The older `cloudflare-next.config.json` file is not required for the current adapter flow, so it should not be used.
