Cloudflare Settings:

Workers settings:
- Build command: `npm run build:cloudflare`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Compatibility flag: `nodejs_compat`
- Worker entry: `.open-next/worker.js`
- Assets directory: `.open-next/assets`

Recommended workflow:
- Production deploy: `npm run deploy`
- Local preview: `npm run preview:cloudflare`
