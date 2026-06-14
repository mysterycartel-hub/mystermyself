# MysterMyself Ecosystem — Setup Guide

## Quick Start

```bash
cd mysterymyself
npm install
npm run dev
```

Open http://localhost:3000

---

## File Structure

```
mysterymyself/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── globals.css         # Global styles, Tailwind, custom utilities
│   ├── page.tsx            # Home page
│   ├── brands/page.tsx     # Brands page
│   ├── playbooks/page.tsx  # Playbooks / products page
│   ├── free-content/page.tsx
│   ├── community/page.tsx
│   └── about/page.tsx
├── components/
│   ├── Navbar.tsx          # Fixed top nav with mobile menu
│   ├── Hero.tsx            # Full-screen hero with candlestick BG
│   ├── BrandCard.tsx       # Individual brand card component
│   ├── BrandCards.tsx      # Brand cards section (4 brands)
│   ├── RoadmapStep.tsx     # Individual roadmap step card
│   ├── MoneyMoveRoadmap.tsx # 4-step roadmap section
│   ├── CharacterCard.tsx   # Individual character card
│   ├── MeetTheCharacters.tsx # 6-character grid section
│   ├── LeadMagnetForm.tsx  # Email capture form (Supabase-ready)
│   └── Footer.tsx          # Full footer with socials + links
├── lib/
│   └── supabase.ts         # Supabase client (commented, ready to wire)
├── .env.local.example      # Environment variable template
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## Connecting Supabase (Email Capture)

1. Create a project at https://supabase.com
2. Run this SQL in the Supabase SQL editor:

```sql
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  interest text NOT NULL,
  source text DEFAULT 'free_guide_form',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role insert" ON leads FOR INSERT WITH CHECK (true);
```

3. Copy `.env.local.example` to `.env.local` and add your Supabase URL + anon key
4. In `components/LeadMagnetForm.tsx`, uncomment the Supabase block in `saveLeadToSupabase()`

---

## Connecting Stripe (Product Sales)

1. Create products in your Stripe dashboard
2. Add your Stripe keys to `.env.local`
3. Create `/app/api/checkout/route.ts` for checkout sessions
4. Wire the playbook card buttons to the checkout API

---

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Add your env vars in the Vercel dashboard under Project → Settings → Environment Variables.

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| Gold | `#D4AF37` | Primary accent, CTAs, borders |
| Gold Light | `#F5C518` | Highlights, gradients |
| Red Energy | `#EF4444` | Secondary CTAs, urgency |
| Background | `#0A0A0A` | Base dark |
| Card | `#111111` | Glass card base |

---

Built for Maurice Scott / MysterMyself Ecosystem
Skills. Plays. Freedom.
