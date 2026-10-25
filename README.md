# RankOwn

**Own your rankings. Understand your site.**

Professional SEO intelligence platform built on real Google data.

## Features

### Free
- Google Login
- Connect Google Search Console
- Real clicks, impressions, queries
- Technical SEO Audit
- Limited Keyword Research (20/day)

### Pro
- Unlimited Keyword Research
- Competitor Analysis
- Keyword Gap
- Reports & Export

## Tech Stack

- Next.js 15 + TypeScript
- NextAuth (Google OAuth)
- Supabase (PostgreSQL)
- Google Search Console API
- Tailwind CSS

## Setup

1. Clone repo
2. Copy `.env.example` to `.env.local`
3. Fill Google OAuth + Supabase keys
4. `npm install`
5. `npm run dev`

## Environment Variables

```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Google Cloud Setup

Enable these APIs:
- Google Search Console API
- Google Analytics Data API (optional)

OAuth scopes used:
- `webmasters.readonly`
- `analytics.readonly`

## License

Private
