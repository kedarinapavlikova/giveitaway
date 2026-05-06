# GiveItAway — Claude Code Rules
## READ THIS ENTIRE FILE BEFORE TOUCHING ANYTHING

---

## 🧠 How to Work With Keddy

Keddy has ADHD and is a non-technical founder. Communicate accordingly:

- **Make executive decisions** — if something is low-risk, just do it. Don't ask.
- **Never ask "do you want to proceed?"** for routine edits. Just proceed.
- **If something IS risky**, stop and explain in one plain-English sentence what could go wrong, then give two options max: "I'll do X" or "I'll skip this."
- **No jargon.** If you must use a technical term, define it in brackets immediately after. e.g. "I need to update the CSS [the styling rules] for this button."
- **Never show raw error messages** to Keddy — always translate them.
- **Bullet points only** for summaries. Short sentences.
- **When done**, always summarise what you changed in 3–5 bullets, plain English.
- **Protect the smoke test checklist** — after any change, mentally verify nothing on that list would break. If you're unsure, say so in one sentence.

---

## 🚨 Critical Variables — Never Rename These

```javascript
let _sb = null;          // Supabase client — MUST be _sb, never supabase (conflicts with CDN global)
let currentUser = null;  // Auth state
let currentProfile = null;
```

The CDN loads `window.supabase` globally. If you use `supabase` as a variable name it will conflict and break all auth silently. Always use `_sb`.

---

## 🎨 Colour System — Never Change These

```css
--papaya-mid: #FF8A65;   /* PRIMARY — use this for buttons, hero, logo, active states */
--papaya: #FFAB91;       /* LIGHT — only for borders, focus rings, hover backgrounds */
--papaya-dark: #E64A19;  /* DARK — hover/pressed states only */
--lagoon: #00BFA5;       /* SECONDARY — links, lagoon buttons, tags */
--lagoon-dark: #00796B;  /* LAGOON hover/pressed */
```

### Common Mistakes to Avoid
- ❌ `background: var(--papaya)` on solid buttons → always use `var(--papaya-mid)`
- ❌ `color: var(--papaya)` on logo → always use `var(--papaya-mid)`
- ❌ `background: var(--papaya)` on hero → always use `var(--papaya-mid)`

---

## 🔒 Auth & Nav Rules

These nav items MUST have `style="display:none"` when logged out:
- `id="nav-msgs"` — Messages (desktop)
- `id="nav-profile"` — My Stuff (desktop)
- `id="tab-msgs"` — Messages (mobile)
- `id="tab-profile"` — My Stuff (mobile)

`updateAuthUI(user, profile)` controls visibility. Never hardcode these as visible.

---

## ❌ Error Messages — Always Use friendlyAuthError()

Never show raw Supabase error strings to users. All auth errors MUST go through:

```javascript
showAuthError(friendlyAuthError(e.message));
```

`friendlyAuthError()` maps technical errors to plain English. If you add new error paths, add cases to this function.

---

## 📋 Before You Edit Any File

1. Read this file completely
2. Note which version you're working from (check file header or git log)
3. Do NOT rename any existing JS variables or CSS custom properties
4. Do NOT remove `style="display:none"` from nav items

---

## 🧪 Smoke Test Checklist — Run Before Every Deploy

Open the live site in an **incognito browser**. Do NOT use the Claude.ai preview — it blocks all network requests.

**Logged-out basics:**
- [ ] Homepage loads with correct papaya `#FF8A65` hero colour (not pale `#FFAB91`)
- [ ] Real listings visible in feed without signing in
- [ ] Messages and My Stuff NOT visible in nav
- [ ] Clicking a listing → prompts sign in
- [ ] "I want this!" → prompts sign in
- [ ] "+ Post Item" → prompts sign in

**Auth:**
- [ ] Sign in works with `pavlikkeddy@gmail.com`
- [ ] Wrong password shows friendly plain-English error (not raw API text)
- [ ] Remember me checkbox present, pre-fills email on next visit
- [ ] Sign out works and returns to logged-out state
- [ ] After sign in: Messages + My Stuff appear in nav

**Feed (logged in):**
- [ ] Own listings show "YOUR POST" badge (papaya, top-left)
- [ ] Own listings show ✏️ pencil + `···` dots menu
- [ ] `···` menu shows: Edit listing / Mark as given / Remove listing
- [ ] Other listings show "I want this!" (no pencil/dots)

**Edit listing:**
- [ ] Opens with prefilled title, location, description
- [ ] Save changes updates the listing in the feed

**Mark as given:**
- [ ] "You made someone's day!" modal appears with animated hearts
- [ ] Listing shows `💚 Given` pill in feed

**Remove listing:**
- [ ] Confirm dialog appears before deleting
- [ ] Listing disappears from feed after confirming

**My Stuff:**
- [ ] Listings load (not stuck in loading state)
- [ ] Item count correct
- [ ] Edit profile saves without eternal loading

**Mobile:**
- [ ] Search bar stacks (search on top, area dropdown below)
- [ ] Bottom tab bar: Browse / Messages / + / Support / My Stuff
- [ ] Footer at bottom on FAQ, Terms, Community Standards pages

---

## 📌 Current Backlog (don't build these without checking with Keddy first)

- Footer fix on Terms / FAQ / Community Standards pages
- "Not live yet" banner on Support modal
- Sent messages showing in Messages tab
- Privacy nudge in claim field ("don't share home address")
- Real given away + givers stats from DB
- Stripe supporter payments
- Supabase Storage for photos (currently base64)
- Real messaging between users (backend)
- Karma emoji tiers (🌱→🌿→🌳) on profile
- Map view
- Mobile app

## ⚠️ Known Fragile Areas

- **`openModal()` function** — has conditional blocks for each modal type. Adding new modals requires adding a new `if (id === 'xyz')` block. Do not restructure this function.
- **`submitPost()`** — async, touches DB and local state. Test carefully after any changes.
- **`updateAuthUI()`** — controls nav visibility for both desktop and mobile. Touch carefully.
- **`loadSupabase()`** — polls for `window.supabase.createClient`. Do not simplify or remove the polling logic.
- **Brace balance** — after any edit, verify `{` count === `}` count in the script block. Mismatches crash everything silently.
