// GiveItAway: Stripe webhook
// Stripe calls this URL whenever a supporter pays, changes tier, or cancels.
// It updates profiles.supporter_tier so badges always match real payments.
//
// Secrets needed (Supabase > Edge Functions > Secrets):
//   STRIPE_WEBHOOK_SECRET  (whsec_..., from Stripe > Developers > Webhooks)
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically.

import { createClient } from "npm:@supabase/supabase-js@2";

const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const sb = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

// Live price IDs -> tier names used in index.html (TIERS)
const PRICE_TO_TIER: Record<string, string> = {
  "price_1TW1KCRrpTDEyDd1OT281wjG": "neighbour", // $3
  "price_1TW1KCRrpTDEyDd1AlInUuAW": "champion", // $7
  "price_1TW1KIRrpTDEyDd1gR5fkJeR": "founding", // $15
};
const VALID_TIERS = new Set(Object.values(PRICE_TO_TIER));
const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"]);
const TOLERANCE_SECONDS = 300;

// ---------- Signature check (Stripe's documented HMAC-SHA256 scheme) ----------
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function verifyStripeSignature(payload: string, header: string, secret: string): Promise<boolean> {
  const parts = header.split(",").map((p) => p.trim().split("="));
  const t = parts.find(([k]) => k === "t")?.[1];
  const sigs = parts.filter(([k]) => k === "v1").map(([, v]) => v);
  if (!t || sigs.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > TOLERANCE_SECONDS) return false;

  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${payload}`));
  const expected = Array.from(new Uint8Array(mac)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return sigs.some((s) => timingSafeEqual(s, expected));
}

// ---------- Helpers ----------
// deno-lint-ignore no-explicit-any
function tierFromSubscription(sub: any): string | null {
  const metaTier = sub?.metadata?.tier;
  if (metaTier && VALID_TIERS.has(metaTier)) return metaTier;
  const priceId = sub?.items?.data?.[0]?.price?.id;
  return PRICE_TO_TIER[priceId] ?? null;
}

async function updateProfile(match: { id?: string; subId?: string }, fields: Record<string, unknown>) {
  let q = sb.from("profiles").update(fields);
  if (match.id) q = q.eq("id", match.id);
  else if (match.subId) q = q.eq("stripe_subscription_id", match.subId);
  else return;
  const { error } = await q;
  if (error) throw new Error(`DB update failed: ${error.message}`);
}

// ---------- Handler ----------
Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!WEBHOOK_SECRET) return new Response("Webhook secret not configured", { status: 500 });

  const payload = await req.text();
  const sigHeader = req.headers.get("stripe-signature") ?? "";
  if (!(await verifyStripeSignature(payload, sigHeader, WEBHOOK_SECRET))) {
    return new Response("Invalid signature", { status: 400 });
  }

  // deno-lint-ignore no-explicit-any
  let event: any;
  try {
    event = JSON.parse(payload);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  const obj = event?.data?.object ?? {};

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        if (obj.mode !== "subscription") break;
        const userId = obj.client_reference_id ?? obj.metadata?.user_id;
        const tier = obj.metadata?.tier;
        if (!userId || !VALID_TIERS.has(tier)) {
          console.warn("checkout.session.completed missing user or tier", obj.id);
          break;
        }
        await updateProfile({ id: userId }, {
          supporter_tier: tier,
          stripe_customer_id: obj.customer ?? null,
          stripe_subscription_id: obj.subscription ?? null,
        });
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const userId = obj.metadata?.user_id;
        const tier = ACTIVE_STATUSES.has(obj.status) ? tierFromSubscription(obj) : null;
        const fields = {
          supporter_tier: tier,
          stripe_customer_id: obj.customer ?? null,
          stripe_subscription_id: obj.id,
        };
        // "incomplete" = first payment still processing; don't wipe anything yet
        if (obj.status === "incomplete") break;
        // Clearing a badge only touches the profile tied to THIS subscription,
        // so an old cancelled sub can't wipe a newer one
        const match = tier && userId ? { id: userId } : { subId: obj.id };
        await updateProfile(match, fields);
        break;
      }
      case "customer.subscription.deleted": {
        await updateProfile({ subId: obj.id }, { supporter_tier: null });
        break;
      }
      default:
        // Ignore other event types
        break;
    }
  } catch (err) {
    console.error(err);
    // 500 tells Stripe to retry later
    return new Response("Handler error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
