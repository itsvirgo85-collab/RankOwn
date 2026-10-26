# RankOwn — Free Google-only setup

## What works for free

1. **Search Console** — your verified sites (clicks, impressions, queries)
2. **Keyword Research** — Google Ads Keyword Planner API (official)
3. **URL Analyzer** — live on-page HTML audit (no paid API)

## What free Google APIs cannot do fully

- Competitor ranking databases
- Keyword gap across arbitrary domains
- Accurate traffic estimates for any URL
- Full backlink indexes

Those need commercial data or your own crawler at scale.

## Keyword Planner setup (free)

1. Create a Google Ads account at https://ads.google.com (billing may be required by Google even at $0 spend).
2. In Google Cloud: enable **Google Ads API**.
3. Apply for **Basic** access if Keyword Planner / planning services are blocked on Explorer.
4. Put customer ID in Vercel: `GOOGLE_ADS_CUSTOMER_ID=1234567890`
5. User must sign in with Google and accept **adwords** scope (or set `GOOGLE_ADS_REFRESH_TOKEN`).
6. Redeploy.

## Search Console

- OAuth scopes already include `webmasters.readonly`
- User connects verified properties after login

## URL Audit

- `POST /api/audit` — no extra keys
