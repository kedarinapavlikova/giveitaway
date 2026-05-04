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


---

## Session 2 — May 1, 2025

**Time:** ~3 hours  
**Versions shipped:** v7, v8, v9  
**Bugs squashed:** 8+  
**Money spent:** C$6.79 (domain!)  

### What we built

- About page with founder story, real photo, and Keds signature with scrappy SVG heart
- Shoes category with child shoe sizing (Infant → 12C) — sizes auto-swap based on category
- Photo upload field in post form — tap to select, preview before submitting
- Posted items now appear at top of feed instantly
- Claim message upgraded to textarea with 300 char live counter
- Removed "the giver picks who gets it" — was giving favouritism vibes
- localStorage routing — refresh now stays on current page
- Mobile footer: About removed, Support added. About lives in desktop nav only
- Footer note added with Support link and "Made in Kelowna by Keds"
- "Free kids stuff." added to hero headline for immediate clarity
- "Kids Clothes" → "Clothes" — kids is implied in the category
- Beta feedback widget added (floating button, emoji rating, tag chips, free text)
- Supabase project created — Canada Central 🍁, Healthy, API key saved

### Design decisions

- **"Kids" in category:** Removed — implied. But kept in the hero headline ("Free kids stuff.") where a first-time visitor needs it.
- **Mobile footer:** Support tab replaces About tab. About accessible via desktop nav only — less critical for mobile use case.
- **Claim copy:** Removed "the giver picks who gets it" — too much like favouritism. Replaced with "Keep it friendly!"
- **Founder bio:** Written by Keddy, barely edited. The line "I am basically a one-woman operation trying to make kids' clothing and gear more cyclical" is the tagline. Someone put it on a tote bag.

### Bugs & struggles

**Bug 1 — "Ryan" on the About page**  
Named the founder "Ryan" — that's the husband. Corrected immediately. Ryan was not available for comment.

**Bug 2 — Bio duplication**  
About text kept appearing twice due to multiple str_replace edits layering. Fixed by replacing the entire block cleanly. Verified with `grep -c "When I was pregnant" = 1`.

**Bug 3 — Domain giveitaway.ca taken**  
Someone is sitting on it. Pivoted to `giveitawayapp.com` — C$6.79 with promo code NEWCOM679. Honestly a better domain anyway.

**Bug 4 — Namecheap had old DNS records**  
URL Redirect Record + old A + CNAME were conflicting. Deleted all three, added fresh A record (`216.198.79.1`) and CNAME (`8a16a48f7ce0bda6.vercel-dns-017.com.`). Both went green within minutes.

### Milestones

- 🎉 `giveitawayapp.com` purchased, DNS configured, live at a real domain
- 🗄️ Supabase project spun up — Canada Central, publishable key saved, ready to wire in Session 3

### Backlog additions

- **Karma / points system** — earn points for giving, completely meaningless but deeply satisfying. Emoji tiers + fun messaging on each give. (Phase 2)
- **Queue / waitlist** — show position in line for a claimed item. (Phase 2)

---

## Progress Update

```
[█████████████░░░░░░░░░░░] 52%

✅ Prototype    ✅ Live URL    ✅ Beta users   ✅ Domain
🟡 Database     ⬜ Auth        ⬜ Photos       ⬜ Launch
```

---

## Session 3 — To Do

- [ ] Wire Supabase to the app
- [ ] User login + sign up flow
- [ ] Listings save to real database
- [ ] Photos stored in Supabase storage
- [ ] Real messages between users
- [ ] Triage beta feedback
- [ ] Update progress bar to ~70%
*"The best way to predict the future is to create it."*  
*Total cost to ship a live marketplace app: $0 and one afternoon.*

----
---
 
## Session 3 — May 2–3, 2025
 
**Time:** ~2 hours
**Versions shipped:** v10, v11
**Bugs squashed:** 5+
**Special guest:** Katie C. (Debrand) — beta tester & potential community mod 🏅
 
### What we built
 
- FAQ page — 7 questions covering: is it free, what to post, condition grades, location, who gets the item, reporting, and the supporter program
- Community Standards page — non-negotiables, mission, removal policy, note from Keds
- Terms & Privacy page — plain language beta version with "full legal terms coming" banner
- Condition info icon — ⓘ button next to condition field in post form. Hover (desktop) or tap (mobile) shows grade descriptions + wash reminder. Closes on outside click.
- Maternity category — filter chip, post form dropdown, XS–3X sizing. Auto-swaps size grid on category select.
- Toast upgraded — auto-dismisses after 3 seconds AND has an ✕ close button. Clears on page navigation.
- Sticky site footer — sits at true bottom of content on all pages. Links: About · FAQ · Community Standards · Terms & Privacy · Feedback.
- About page copy finalised in Keddy's own voice. "How we do things around here" replaces "The rules — always."
 
### Bugs fixed
 
**Bug 1 — Duplicate Support tab in mobile footer**
Extra tab sneaked in from layered edits. Fixed: Browse / Messages / + / Support / My Stuff. One instance only.
 
**Bug 2 — + button not floating above bar**
Was sitting inside the flex row. Fixed by wrapping in a spacer div with absolute positioning. Now properly elevated with white border ring and shadow.
 
**Bug 3 — Tab bar padding imbalance**
Top and bottom padding were unequal, making icons look top-heavy. Fixed with symmetric 10px padding and centered alignment.
 
**Bug 4 — Unread dot misplaced**
Moved to true upper-right of message icon with white border.
 
**Bug 5 — Footer not sticky on Messages page**
Footer was floating just below the message threads with blank space below. Fixed with proper `site-footer` CSS class.
 
### Design decisions
 
- **"Who gets the item?" FAQ** — reworded to neutral marketplace language. "OPs are asked to triage requests and make appropriate arrangements." Removes any favouritism implication.
- **Wash reminder** — lives at pickup, not at posting. Kept in condition tooltip and FAQ. Post form stays light.
- **T&Cs** — placeholder pages for now, full legal copy before any payments go live.
- **Footer** — Support link removed, About added. Cleaner, less repetitive.
 
### Community input — Katie C. (Debrand)
 
Katie works in secondhand fashion and provided sharp beta feedback:
- Suggested condition grade descriptions → acted on (info icon tooltip)
- Suggested onboarding walkthrough with community standards → pinned for Session 4 (needs auth first)
- Reminded us that bed bugs are real and people genuinely don't wash items → wash reminder added
 
> "You'd be surprised how many people don't wash their items before they give them away and bed bugs are crazy." — Katie C., telling it like it is. 🐛
 
Katie is a strong community mod candidate.
 
### Backlog additions
 
- Onboarding/sign-up walkthrough with community standards (needs auth — Session 4)
- Full T&C + Privacy Policy copy (before Stripe integration)
- FAQ link in post form under condition field — "not sure which to pick? See FAQ"
 
---
 
## Progress Update
 
```
[████████████████░░░░░░░░] 62%
 
✅ Prototype    ✅ Live URL      ✅ Beta users    ✅ Domain
🟡 Database     🟡 Content/FAQ   ⬜ Auth          ⬜ Launch
```
 
---
 
## Session 4 — To Do
 
- [ ] Wire Supabase to the app
- [ ] User login + sign up flow
- [ ] Listings save to real database
- [ ] Photos stored in Supabase storage
- [ ] Real messages between users
- [ ] Onboarding community agreement screen
- [ ] Triage more beta feedback
- [ ] Update progress bar to ~75%
 
