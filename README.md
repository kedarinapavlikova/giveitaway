# GiveItAway 🌿
### Free community marketplace for kids stuff based in Kelowna, BC.

**Live:** [giveitawayapp.com](https://giveitawayapp.com) · **Status:** Active development (82%) · **Built by:** [Keddy Pavlik](https://www.linkedin.com/in/pavlikkeddy/) + Claude

---

## What it is

GiveItAway is a community marketplace for giving away kids' clothing and gear — for free, forever. No selling. No fees. No algorithms deciding who gets the stuff. Just people with things they don't need and people who do.

It was born from a real problem: kids outgrow things in two months, landfills don't need more onesies, and Facebook Marketplace is exhausting. The name of the founder's daughter is Rosie. Vercel randomly assigned "rose" to the deployment URL before the domain was purchased. The universe, apparently, is on board.

> *"I want this app to help communities and the planet. I want to connect kids to clothes and gear, and I want to give away things I don't need. I want it to be EASY."* — Keddy Pavlik, May 2026

---

## Tech stack

| Layer | Tool | Cost |
|---|---|---|
| Frontend | HTML / CSS / JS (single file) | Free |
| Hosting | Vercel | Free |
| Version control | GitHub | Free |
| Database + Auth | Supabase | Free tier |
| Payments | Stripe | % of revenue |
| Domain | giveitawayapp.com | ~C$7/yr |

No framework. No build step. One file that does the whole thing.

---

## Features shipped

- **Marketplace feed** — masonry layout, live search with text highlighting, category filters, condition grades
- **Granular sizing** — Preemie → 16 for kids; Infant → 12C for shoes; XS–3X for maternity. Auto-swaps by category.
- **Kid profiles** — add your kids, birthday → auto size suggestions, 13 emoji options. Kids are feral and don't grow on schedule; parents can override.
- **ISO / "Looking For" posts** — two-sided: you can ask for things, not just give them. Visually distinct (blue dashed border, "I have this! 🙌" CTA)
- **Real auth** — Supabase Auth, branded confirmation email, remember me, friendly error messages for every auth error code
- **Claim + messaging** — in-app threads between givers and claimers; message badges on listing cards so givers don't miss asks
- **My Stuff** — manage your listings; edit profile (name, neighbourhood, bio)
- **Supporter subscriptions** — 3 tiers (Neighbour $3 / Champion $7 / Founding Giver $15) via Stripe; tier persists to DB
- **Advanced filtering** — sort, condition, pickup method, posted within, size; active filter chips; live result count
- **Legal** — full ToS + Privacy Policy (PIPEDA + BC PIPA compliant); plain-language TL;DR card because nobody reads legalese
- **PWA** — installable from browser on iOS + Android; service worker with network-first for data, cache-first for shell; 8 icon sizes
- **Feed skeleton loading** — shimmer cards on load; "Load more" over infinite scroll (doom loops are not the vibe)

---

## How it was built

9 sessions. ~20 hours total. One dev (Keddy), one AI collaborator (Claude). Zero prior deployment experience at session start.

**Session breakdown:**
| Session | Date | Highlight |
|---|---|---|
| 1 | Apr 30, 2025 | Full marketplace UI; Vercel deploy; live URL |
| 2 | May 1, 2025 | Domain purchased (C$6.79); Supabase project spun up |
| 3 | May 2–3, 2025 | FAQ, Community Standards, T&C placeholder; beta feedback from Katie C. |
| 4 | May 4–6, 2026 | Real auth end-to-end; first real listing posted; CLAUDE.md created |
| 5 | May 8, 2026 | Location pre-fill on post modal; nothing broke (framed it) |
| 5b | May 11, 2026 | Stripe checkout live; feed skeleton loading |
| 6 | May 12, 2026 | Legal docs shipped; giver messaging with badge notifications |
| 7–9 | May 12–14, 2026 | Kid profiles; advanced filtering; ISO posts; PWA |

---

## CLAUDE.md

This repo includes a `CLAUDE.md` in the root. Claude Code reads it automatically before touching anything.

It exists because Claude Code once renamed `_sb` to `supabase` (conflicts with the CDN global), swapped palette variables, and quietly removed auth-gated nav items — all in one session, all silently. Half a session to fix. `CLAUDE.md` is the contract. It documents variable naming conventions, colour tokens, deployment rules, and a smoke test checklist that runs before every deploy.

Lesson: never let two tools edit the same file without a handoff contract.

---

## Revenue model

No fees on giving or receiving — ever. Revenue comes from:
- Optional supporter subscriptions (live via Stripe)
- Local business neighbourhood sponsorships
- ESG brand partnerships (impact data: kg diverted from landfill, CO₂ saved)

**Business structure:** Registered BC Sole Proprietor → future conversion to BC Society (nonprofit) once traction is established.

---

## What's next

- [ ] Stripe full payment confirmation (needs a real guinea pig with a real card)
- [ ] Supabase Storage for photos (base64 does not scale; we know)
- [ ] Karma tiers — real milestones, real badges, completely meaningless points that are deeply satisfying
- [ ] AI photo → listing (snap it, Claude names it, category filled, done)
- [ ] Soft launch — real neighbours, real feedback

---

## Contributing

This is a solo + AI project in active early development. If you're interested in contributing, have beta feedback, or want to be a community mod — reach out.

---

*Built in Kelowna, BC. Powered by Supabase, Vercel, and the sincere belief that your neighbour wants your old snow pants.*
