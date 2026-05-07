# Deployment Safety

Deciply should stay on a normal Next.js/Vercel build path unless deployment changes are approved deliberately.

## Rules

- Never set `output: "export"` without explicit approval.
- Never statically generate all compare, tool, or locale combinations.
- Do not prebuild cartesian products for `compare-auto` or similar routes.
- Do not commit build artifacts such as `.next`, `out`, `.open-next`, or `.vercel`.
- Keep `compare-auto` dynamic unless a small curated list is intentionally chosen.

## Safe Build

- Safe Vercel build command: `npm run build`

## Intended Static Budget

- Maximum intended static route generation budget: 2,000 generated files per build artifact target.
- Large generated route sets should stay dynamic or be explicitly curated.

## Guardrails

- `npm run check:build-safety` must pass before build.
- `npm run build` also re-checks build safety after compilation.
- Any file over 25 MB should be reviewed before committing.
