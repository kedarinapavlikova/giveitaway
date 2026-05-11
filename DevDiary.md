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

---

## Session 4 — May 4–6, 2026

**Time:** ~4 hours across multiple sittings
**Versions shipped:** v13, v14 (reverted), v13 patched
**Real users:** 1 (Keddy — first real account created)
**Real listings:** 1 (Barbies, Lequime Rd 👋)

### What we built

- Real auth end-to-end — sign up, branded confirmation email, sign in, session restore
- Confirmation email redirects to `giveitawayapp.com` (was going to localhost:3000)
- Branded confirmation email — papaya/lagoon design, "Confirm my email" button
- First real listing posted by a real user and showing in the feed
- "Your listing" badge on own posts — not clickable, no claim button
- Report button inside claim modal (removed from card — cleaner)
- My Stuff page fetches real listings from DB with photo, status, category, condition
- Edit profile modal — name, neighbourhood, bio. Saves to Supabase, updates UI everywhere instantly
- Remember me checkbox on sign in with localStorage persistence
- Friendly error messages for all Supabase auth error codes
- Messages dot only shows when there are unread threads
- Support modal "not live yet" banner — tier selection works, no fake payment flow
- Stripe account created, test keys saved
- **CLAUDE.md** created and uploaded to GitHub — Claude Code reads this before touching anything

### Bugs fixed

**Bug 1 — Supabase key format**
`sb_publishable_` key not supported by supabase-js for auth. Swapped to legacy anon JWT key (`eyJ...`).

**Bug 2 — Email confirmation localhost redirect**
Supabase was redirecting confirmation links to `localhost:3000`. Fixed in Supabase → Authentication → URL Configuration → Site URL set to `https://giveitawayapp.com`.

**Bug 3 — Email rate limit**
Hit Supabase free tier email limit during testing. Solution: use `email+test2@gmail.com` format for test accounts.

**Bug 4 — _sb null at call time (sign out / My Stuff / save profile all stuck loading)**
All three functions called `_sb` without awaiting `loadSupabase()` first. On page refresh `_sb` is null until the CDN loads. Fixed by awaiting `loadSupabase()` before every DB/auth call and adding proper error states instead of silent bails.

### Claude Code regression (and the fix)

Claude Code edited `index.html` directly without knowing the project rules. It:
- Renamed `_sb` → `supabase` (conflicts with CDN global, breaks all auth silently)
- Changed `var(--papaya-mid)` → `var(--papaya)` (lighter colour, wrong on buttons/hero)
- Removed `style="display:none"` from Messages and My Stuff nav items (showed when logged out)
- Broke friendly error messages (raw API errors showing)
- Removed remember me checkbox

**Root cause:** No rules file. Claude Code didn't know the conventions.
**Fix:** Created `CLAUDE.md` in repo root. Claude Code reads it automatically every session.
**Cost:** Half a session. Won't happen again.

### Process decisions

- **Claude Code owns the file** — builds and deploys
- **Claude.ai does design, diagnosis, strategy** — review broken things here via screenshot
- **Smoke test before every deploy** — Keddy's reputation is on the line
- **Database changes** → always screenshot here before proceeding in Claude Code
- **CLAUDE.md is the contract** — if Claude Code breaks something in the file, it's on Claude Code

### Lessons

- Always `await loadSupabase()` before any `_sb` call. Silent null failures are the hardest bugs to spot.
- Never let two tools edit the same file without a handoff contract.
- The CLAUDE.md smoke test checklist is the minimum bar before any deploy.

---

## Progress Update

```
[█████████████████░░░░░░░] 68%

✅ Prototype    ✅ Live URL    ✅ Auth         ✅ Database
🟡 Stability    🟡 Features    ⬜ Launch
```

---

## Session 5 — To Do

- [ ] Mark as picked up + delete listing flow
- [ ] Karma tally on pickup
- [ ] Edit listings from My Stuff + feed
- [ ] Sent messages appearing in Messages tab
- [ ] Privacy nudge in claim message field
- [ ] Footer fix on Terms / FAQ / Community Standards pages
- [ ] Stripe supporter payments
- [ ] Real given away + givers stats from DB
- [ ] Update CLAUDE.md with any new conventions
- [ ] Update progress bar to ~80%
- [ ] Update progress bar to ~75%

 [DEVDIARY_session5.md](https://github.com/user-attachments/files/27533305/DEVDIARY_session5.md)
 ## Session 5 — May 8, 2026

**Time:** ~1.5 hours
**Versions shipped:** v14 (patched)
**Bugs squashed:** 0 (we BUILT stuff this time, very refreshing)
**Vibes:** ☀️ Kelowna spring energy; mild hyperfixation; productive

---

### What we built

- **Location pre-fill on post modal** — neighbourhood dropdown + location text field now auto-populate from the user's saved profile when opening "+ Post Item." Both fields stay fully editable (because life is chaos and you might be posting from Nana's). Resets cleanly after posting so there's no bleed-through to the next listing.

---

### Design decisions

- **Profile → form bridge:** Rather than asking users to type their location every single time they post, we pull it silently from their profile on modal open. Zero friction. Very GiveItAway.
- **Editable, not locked:** Pre-fill is a starting point, not a cage. Givers who move, visit, or just aren't home get full control.
- **Reset on submit:** The form wipes on close/submit so old values don't haunt the next post. Lesson from the bio-duplication incident of Session 2. We don't repeat our sins.

---

### Bugs & struggles

Nothing broke. Truly. We just... shipped a thing. Take a screenshot. Frame it.

---

### Moment of the session

> *"I want this app to help communities and the planet. I want to connect kids to clothes and gear, and I want to give away things I don't need. I want it to be EASY."* — Keddy Pavlik, May 8, 2026

That's it. That's the mission statement. That's the T-shirt.

---

### Family cameo

Rosie turns **7 on May 13.** Jordie turns **1 on April 23** (just happened!). The two tiny humans who inspired an entire community platform. Jordie is already in the demographic. Rosie is probably ready to start giving away the toys she's "over."

---

### Backlog status

Still standing. No new items added this session — the pre-fill was focused, contained, and done. A rare and beautiful thing.

---

## Progress Update

```
[█████████████████░░░░░░░] 70%

✅ Prototype    ✅ Live URL    ✅ Auth         ✅ Database
✅ Location UX  🟡 Messaging   🟡 Stats        ⬜ Launch
```

---

## Session 6 — To Do

- [ ] Real messaging backend (Supabase `messages` table — send AND receive)
- [ ] Supabase Storage for photos (base64 will not scale)
- [ ] Stripe supporter payments + Vercel serverless function
- [ ] Privacy nudge in claim/message flow
- [ ] Karma emoji tier badges on profile
- [ ] Size filter in feed (filter chips for size alongside category)
- [ ] Tiny Humans — kid profiles (avatar, bday → size suggestions, editable)
- [ ] Full T&C + Privacy Policy (before Stripe ever goes live)

[DEVDIARY_session5.md](https://github.com/user-attachments/files/27614163/DEVDIARY_session5.md)
---

## Session 5 — May 11, 2026

**Time:** ~1 hour
**Versions shipped:** 1 (Stripe + skeleton patch)
**Bugs squashed:** 2
**Money spent:** $0 (Keddy's real card: TBD 👀)

### What we built

- **Stripe checkout is live.** Real money. Real modal. Real Stripe checkout page. CA$7.00 Champion tier loaded correctly, Keddy's email pre-filled, GiveItAway branding showing. The whole thing. 🎉
- **Feed skeleton loading state.** Six shimmering placeholder cards now appear the instant the page loads. Real listings swap in once Supabase responds. No more jarring "No items" flash.

### Bugs fixed

**Bug 1 — "Payments aren't live yet" banner still showing**
Yellow warning banner was still rendering inside the supporter modal even though Stripe was fully set up. Removed entirely.

**Bug 2 — `selectTier()` showing stale toast**
Selecting a tier was triggering a leftover `showToast('We'll email you when payments go live')` and closing the modal — completely bypassing the checkout step. Root cause: `btn.onclick` was still wired to the old no-op toast handler from pre-Stripe days. Fixed by replacing with `() => goToPayStep()`. The full flow now works: tier select → pay step → Stripe → redirect back with badge.

### Testing notes

- Stripe error on test card (`4242 4242 4242 4242`) in live mode = **correct behaviour.** Stripe blocks test cards in production. That's the system working, not a bug.
- Full payment confirmation (real card, real charge, success redirect + badge) pending a guinea pig beta user. Keddy is not volunteering herself. Reasonable.

### Design decisions

- **Skeleton cards over spinner.** A full-screen loading overlay felt heavy. Six shimmer cards give the user immediate spatial orientation — they can see the masonry layout before content arrives. Feels faster even if it isn't.
- **6 skeletons at varying heights** to match the natural rhythm of the masonry grid. Not all the same height — that would look like a PowerPoint template from 2009.

### Lessons

- Stale toast handlers are sneaky. When wiring up new flows, always grep for old `showToast` calls attached to the same button. They survive refactors like cockroaches.
- The gap between "Stripe checkout loads" and "full payment confirmed" is a real gap. Don't call it done until someone actually pays. (Hi, beta user. Thank you for your service.)

---

## Progress Update

```
[██████████████████░░░░░░] 73%

✅ Prototype    ✅ Live URL    ✅ Auth         ✅ Database
✅ Stripe       🟡 Stability   🟡 Features     ⬜ Launch
```

---

## Session 6 — To Do

- [ ] Confirm Stripe full payment flow with real card (beta user)
- [ ] Supabase Storage for photos (base64 won't scale)
- [ ] Real messaging for givers
- [ ] Karma tally + tiers
- [ ] Filtering & sorting UI mockup → build
- [ ] Tiny Humans (kid profiles)

