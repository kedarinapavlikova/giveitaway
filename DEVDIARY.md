# GiveItAway — Dev Diary 🌿

> Built by Kedarina Pavlikova + Claude. No budget. No prior deployment experience. One session.

---

## Progress to Launch

```
[████████░░░░░░░░░░░░░░░░] 32%

✅ Prototype    ✅ Live URL    ✅ Beta users
⬜ Database     ⬜ Auth        ⬜ Photos      ⬜ Launch
```

---

## Session 1 — April 30, 2025

**Time:** ~2 hours  
**Versions shipped:** 6  
**Bugs squashed:** 3  
**Money spent:** $0  

### What we built

- Full marketplace UI from scratch — masonry feed, listing cards, category filters, live search with text highlighting
- Granular size multi-select (Preemie → 16) for kids clothing listings
- Claim flow with in-app messaging threads
- Post form with mandatory location, condition, pickup type fields
- Supporter subscription flow — 3 tiers (Neighbour $3 / Champion $7 / Founding Giver $15) with profile badge system
- Beta feedback widget — emoji rating, area tags, free text, optional contact
- Mobile bottom tab bar (Browse / Messages / + / Support / My Stuff)
- Deployed to GitHub + Vercel — live at `giveitaway-rose.vercel.app`

### Design decisions

- **Palette pivot:** Ditched the original orange + green for Papaya & Lagoon (`#FFAB91` + `#00BFA5`) after a 3-option colour picker. The original felt corporate. New palette feels warm and community-forward.
- **Size granularity:** Preemie, Newborn, 0–3m, 3–6m, 6–12m, 12m, 12–18m, 18–24m, then 2T–5T, 6–16. Granular for tiny babies, broader for older kids. Users can multi-select for lot listings.
- **Pickup options:** Porch Pickup / Meetup / Drop Off — giver can offer multiple. No-contact porch drop is a popular pattern.
- **Monetisation:** No fees on giving/receiving — ever. Revenue from optional supporter subscriptions + eventual local business sponsorships + grants.
- **Moderation:** Admins + community mods. Community flagging system.
- **Name:** Still TBD. Leading candidates: Rosieroo, Rosie, Pasalong, PorchPass. Note: Vercel randomly assigned "rose" to the deployment URL. Builder's daughter is named Rosie. The universe is apparently involved.

### Bugs & struggles

**Bug 1 — Mobile nav overflow**  
Desktop nav links overflowing on small screens. Fixed by replacing the top nav with a bottom tab bar on mobile — the industry standard pattern for good reason (thumbs live at the bottom).

**Bug 2 — Duplicate `const h` declaration**  
Adding real photo support broke the entire feed. Root cause: two lines got merged during an edit, leaving `const h` declared twice. JavaScript doesn't allow re-declaring the same variable — kills the whole script. Diagnosed in one screenshot from the browser console.

**Bug 3 — Unsplash images blocked**  
Unsplash URLs are blocked in the Claude preview environment due to network restrictions. Swapped to `picsum.photos` for local preview. Unsplash works fine on the live Vercel deployment.

**Struggle — quote escaping in `onerror` attribute**  
Tried to write a fallback image handler using nested HTML inside an `onerror` string. Mixed single/double quotes broke the card renderer silently. Simplified to `this.style.display='none'` — lesson: keep inline event handlers dead simple.

### Beta feedback so far

- Friend (mom of 3) suggested a **queue/waitlist** to show position in line for a claimed item. FB Marketplace doesn't do this either — pinned for Phase 2.
- Claim message field needs to be a **textarea** (not single-line input) with 300 char limit + live counter. Pre-filled default message was clipping on mobile.

---

## Backlog / Feature Ideas

| Feature | Priority | Notes |
|---|---|---|
| Queue/waitlist for claimed items | Phase 2 | Genuine gap vs FB Marketplace |
| Claim message → textarea + 300 char limit | Next session | Current single input clips on mobile |
| Favourites / save item | Next session | Easy add once DB is live |
| Map view | Phase 2 | "Show me what's near me" |
| Push notifications | Phase 2 | Needs auth + DB first |
| AI safety scan on listings | Phase 2 | Auto-flag sketchy posts |
| Mobile app (React Native) | Month 6+ | Web first |

---

## Business Notes

- Register as **BC Sole Proprietor** first (~$40, 20 min at bcregistryservices.gov.bc.ca)
- Convert to **BC Society (nonprofit)** once traction is established
- Apply for **CRA charitable status** if tax receipts for donors are needed
- Revenue model: optional supporter subscriptions + local business neighbourhood sponsorships + ESG brand partnerships (impact data: kg diverted from landfill, CO₂ saved)

---

## Tech Stack

| Layer | Tool | Cost |
|---|---|---|
| Frontend | HTML / CSS / JS (single file) | Free |
| Hosting | Vercel | Free |
| Version control | GitHub | Free |
| Database (next) | Supabase | Free tier |
| Auth (next) | Supabase Auth | Free |
| Payments | Stripe (when ready) | % of revenue |
| Domain | TBD — rosieroo.ca? | ~$12/yr |

---

## Session 2 — To Do

- [ ] Compile beta feedback, triage into fix now / next session / backlog
- [ ] Hook up Supabase — real persistent listings
- [ ] User login + sign up flow
- [ ] Real photo uploads on listings
- [ ] Fix claim message → textarea + 300 char limit + live counter
- [ ] Custom domain setup
- [ ] Noodle on the name 🌹

---

*"The best way to predict the future is to create it."*  
*Total cost to ship a live marketplace app: $0 and one afternoon.*
