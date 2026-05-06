# GiveItAway — Claude Code Rules
## READ THIS ENTIRE FILE BEFORE TOUCHING ANYTHING

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

Open the live site in an incognito browser and check:

- [ ] Homepage loads with correct papaya `#FF8A65` hero colour (not pale `#FFAB91`)
- [ ] Sign in button works — try signing in with `pavlikkeddy@gmail.com`
- [ ] Wrong password shows friendly error (not raw API message)
- [ ] Logged-out state: Messages and My Stuff NOT visible in nav
- [ ] Logged-in state: Messages and My Stuff visible, Sign out works
- [ ] "+ Post Item" prompts sign in if logged out
- [ ] "I want this!" prompts sign in if logged out
- [ ] Remember me checkbox present on sign in form
- [ ] Mobile: search bar stacks (search on top, area dropdown below)
- [ ] Footer sits at bottom of page on all content pages (FAQ, Terms, Community Standards)

---

## 🏗️ Architecture

Single-file HTML app (`index.html`). Everything lives in one file:
- CSS in `<style>` block in `<head>`
- HTML views: `view-feed`, `view-messages`, `view-profile`, `view-about`, `view-faq`, `view-community`, `view-terms`
- Single `<script>` block at bottom

**Supabase project:** `rpqyszpzyivypbfykakg` (Canada Central)
**Live URL:** `https://giveitawayapp.com`
**Deploys:** GitHub → Vercel (auto on push)

---

## 🎯 Design System

**Fonts:**
- Display/headings: `Fraunces` (Google Fonts), weights 400 + 700
- Body/UI: `DM Sans` (Google Fonts), weights 400 + 500 + 600

**Border radius:** 16px cards, 12px inputs, 24px pills, 50% avatars

**Key CSS variables:** See `:root` block at top of `<style>`. Never add hardcoded hex colours — always use variables.

---

## 📌 Current Backlog (don't build these without checking with Keddy first)

- Edit listings from My Stuff + feed
- Footer fix on Terms / FAQ / Community Standards pages
- "Not live yet" banner on Support modal
- Karma / points system
- Stripe integration for supporter payments
- Supabase Storage for photo uploads
- Real messaging between users
- Map view
- Mobile app

---

## ⚠️ Known Fragile Areas

- **`openModal()` function** — has conditional blocks for each modal type. Adding new modals requires adding a new `if (id === 'xyz')` block. Do not restructure this function.
- **`submitPost()`** — async, touches DB and local state. Test carefully after any changes.
- **`updateAuthUI()`** — controls nav visibility for both desktop and mobile. Touch carefully.
- **`loadSupabase()`** — polls for `window.supabase.createClient`. Do not simplify or remove the polling logic.
- **Brace balance** — after any edit, verify `{` count === `}` count in the script block. Mismatches crash everything silently.
