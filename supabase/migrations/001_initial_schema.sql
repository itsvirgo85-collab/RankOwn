-- RankOwn Initial Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  google_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_google_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  access_token TEXT,
  refresh_token TEXT,
  expiry_date TIMESTAMPTZ,
  scope TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE websites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  url TEXT NOT NULL,
  gsc_property TEXT,
  ga4_property_id TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, domain)
);

CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status_code INT,
  title TEXT,
  meta_description TEXT,
  canonical TEXT,
  h1 TEXT[],
  h2 TEXT[],
  robots TEXT,
  has_viewport BOOLEAN,
  has_structured_data BOOLEAN,
  issues JSONB DEFAULT '[]',
  score INT,
  crawled_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gsc_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  clicks INT DEFAULT 0,
  impressions INT DEFAULT 0,
  ctr DECIMAL(8,4),
  position DECIMAL(8,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(website_id, date)
);

CREATE TABLE gsc_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  clicks INT DEFAULT 0,
  impressions INT DEFAULT 0,
  ctr DECIMAL(8,4),
  position DECIMAL(8,2),
  date_range_start DATE,
  date_range_end DATE,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gsc_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  page TEXT NOT NULL,
  clicks INT DEFAULT 0,
  impressions INT DEFAULT 0,
  ctr DECIMAL(8,4),
  position DECIMAL(8,2),
  date_range_start DATE,
  date_range_end DATE,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE keyword_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seed_keyword TEXT NOT NULL,
  country TEXT DEFAULT 'US',
  results JSONB,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_websites_user_id ON websites(user_id);
CREATE INDEX idx_audits_website_id ON audits(website_id);
CREATE INDEX idx_gsc_performance_website_date ON gsc_performance(website_id, date);
CREATE INDEX idx_gsc_queries_website ON gsc_queries(website_id);
CREATE INDEX idx_gsc_pages_website ON gsc_pages(website_id);
CREATE INDEX idx_keyword_searches_user ON keyword_searches(user_id);
