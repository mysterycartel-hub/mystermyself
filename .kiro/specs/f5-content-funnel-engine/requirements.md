# F5 — Content Funnel Engine

## Overview
Funnels, ebooks, YouTube thumbnails, email sequences, Beehiiv newsletter, Stan Store, and Telegram community management.

## Requirements

### Default Funnel Structure
```
Free hook (YouTube/TikTok/IG) 
  → email/Telegram capture (Beehiiv Opportunity List)
    → $27-47 ebook (Stripe checkout)
      → high-ticket system (membership/coaching)
```

### Newsletter System
- Platform: Beehiiv
- Name: The Opportunity List
- URL: maurices-newsletter-b7274b.beehiiv.com
- Publication ID: pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7
- Tags per lane: interest_trading_chef, interest_route_harbor, interest_food, etc.

### Site Integration
- `/opportunity-list` — main capture page (exists, working)
- OpportunitySignup component — Beehiiv API integration
- Lane selection drives personalized content delivery
- /welcome page personalizes based on selected lane

### Content Formats
| Format | Shorthand | Output |
|--------|-----------|--------|
| YouTube hooks | /hook | 3 variations, short, punchy |
| CTA variations | /cta | 3 call-to-action options |
| Kitchen metaphors | /lingo | Trading concepts in chef language |
| Outlines | /outline | Structure only, no full copy |
| Investor pitches | /pitch | Formal business pitch |
| Menu items | /menu | Food product descriptions |
| Courier outreach | /route | Outreach emails to labs/pharmacies |
| Legal language | /legal | Contract/legal phrasing |

### Payment Systems
- Stripe (primary digital products)
- Stan Store (alternative storefront)
- Cash App, PayPal, Zelle (catering/services)

### Content Templates (in repo)
- `content/newsletter-templates/` — 6 drop templates
- Email sequences: welcome, lane-specific drip, product launch

### YouTube/Social Strategy
- Short hooks (15-60s) → full video CTA
- Every short includes one kitchen metaphor (F1)
- Thumbnail: bold text, character face, gold/black palette
- Description: always includes Opportunity List link

### Telegram (future)
- Free community group
- VIP paid group (TCU members)
- Automated welcome + resource delivery

## Success Criteria
- [ ] Beehiiv integration works (/api/newsletter/subscribe)
- [ ] Lane tags properly applied on signup
- [ ] /opportunity-list captures leads with lane selection
- [ ] Welcome page personalizes by lane
- [ ] Stripe checkout flows work for digital products
- [ ] Newsletter templates exist in content/
- [ ] /api/health shows Beehiiv connected
