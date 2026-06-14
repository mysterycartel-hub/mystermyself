-- ============================================================
-- MysterMyself Ecosystem OS — Supabase Database Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- ── LEADS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  interest    text NOT NULL DEFAULT 'general',
  source      text NOT NULL DEFAULT 'website',
  division    text,                        -- which brand page they came from
  ip_address  text,
  user_agent  text,
  created_at  timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- Allow public inserts (lead capture forms)
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
-- Only service role can read
CREATE POLICY "Service role read leads" ON leads FOR SELECT USING (false);

-- ── SUBSCRIBERS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email               text NOT NULL UNIQUE,
  plan                text NOT NULL DEFAULT 'free',    -- free | playbook | member
  status              text NOT NULL DEFAULT 'active',  -- active | cancelled | past_due
  stripe_customer_id  text,
  stripe_sub_id       text,
  division            text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role all" ON subscribers USING (false);

-- ── PRODUCTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name             text NOT NULL,
  description      text,
  price_cents      integer NOT NULL,
  stripe_price_id  text UNIQUE,
  division         text NOT NULL,   -- trading-chef-university | courier-income-lab | etc
  active           boolean DEFAULT true,
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active products" ON products FOR SELECT USING (active = true);
CREATE POLICY "Service role all products" ON products USING (false);

-- ── ORDERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email               text NOT NULL,
  product_id          uuid REFERENCES products(id),
  stripe_session_id   text UNIQUE,
  stripe_payment_id   text,
  amount_cents        integer,
  currency            text DEFAULT 'usd',
  status              text NOT NULL DEFAULT 'pending', -- pending | paid | refunded
  created_at          timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role all orders" ON orders USING (false);

-- ── COMMUNITY MEMBERS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS community_members (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  username    text,
  division    text,
  tier        text DEFAULT 'free',    -- free | inner-circle | vip
  joined_at   timestamptz DEFAULT now()
);

ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- ── USEFUL VIEWS ─────────────────────────────────────────────
CREATE OR REPLACE VIEW admin_stats AS
SELECT
  (SELECT COUNT(*) FROM leads)                                     AS total_leads,
  (SELECT COUNT(*) FROM leads WHERE created_at > now() - interval '7 days') AS leads_this_week,
  (SELECT COUNT(*) FROM subscribers WHERE status = 'active')       AS active_subscribers,
  (SELECT COUNT(*) FROM orders WHERE status = 'paid')              AS total_orders,
  (SELECT COALESCE(SUM(amount_cents), 0) FROM orders WHERE status = 'paid') AS total_revenue_cents,
  (SELECT COALESCE(SUM(amount_cents), 0) FROM orders WHERE status = 'paid' AND created_at > date_trunc('month', now())) AS revenue_this_month_cents;

-- ── SEED DATA (optional demo products) ───────────────────────
INSERT INTO products (name, description, price_cents, division) VALUES
  ('TCU Gold Starter Guide',        'Free gold trading starter guide — sessions, setups, and the 8AM play.',         0,    'trading-chef-university'),
  ('TCU Gold Playbook',             'Complete XAUUSD education ebook — all 6 modules + cheat sheets.',               4700, 'trading-chef-university'),
  ('TCU Membership',                'Monthly membership — live sessions, community, new lessons monthly.',            9700, 'trading-chef-university'),
  ('Medical Courier Starter Guide', 'Everything to launch a medical courier route — licensing to first contract.',    3700, 'courier-income-lab'),
  ('Food Pop-Up Blueprint',         'Launch a profitable food pop-up from scratch — location, menu, systems.',        4700, 'breaded'),
  ('Money Move Starter Pack',       'Income ideas, templates, and step-by-step systems for your first play.',         2700, 'playbooks'),
  ('Fantasy Draft Bible 2025',      'Complete draft guide — rankings, sleepers, ADP analysis, and strategy.',        1700, 'fantasy'),
  ('AI Operator Starter Kit',       'Claude + ChatGPT automation playbooks for your business OS.',                   4700, 'ai-operator-lab')
ON CONFLICT DO NOTHING;
