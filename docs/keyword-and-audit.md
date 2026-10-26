# Keyword Research + URL Analyzer

## Keyword Research

- UI: `/dashboard/keywords`
- API: `POST /api/keywords` with `{ seed, country }`
- Provider: DataForSEO Google Ads Keywords for Keywords (live)
- Env: `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD`
- Every response includes `source` and `fetchedAt`
- No fake volumes if provider is missing — returns clear 503 error

## URL Analyzer (Technical Audit)

- UI: `/dashboard/audit`
- API: `POST /api/audit` with `{ url }`
- Fetches live HTML and checks status, title, meta, H1/H2, canonical, robots, viewport
- Score 0–100 from observed issues only
- Ranking keywords / traffic / CPC for arbitrary URLs are NOT invented; labeled as Pro/rank-data provider later

## Setup DataForSEO

1. Create account at dataforseo.com
2. Get API login + password
3. Add to Vercel env:
   - DATAFORSEO_LOGIN
   - DATAFORSEO_PASSWORD
4. Redeploy
