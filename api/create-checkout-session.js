const Stripe = require('stripe');

module.exports = async (req, res) => {
  const ALLOWED_ORIGINS = ['https://giveitawayapp.com', 'https://www.giveitawayapp.com', 'https://giveitaway-rose.vercel.app'];
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const PRICE_IDS = {
    neighbour: process.env.STRIPE_PRICE_NEIGHBOUR,
    champion:  process.env.STRIPE_PRICE_CHAMPION,
    founding:  process.env.STRIPE_PRICE_FOUNDING,
  };

  const { tier, userId, email } = req.body || {};
  const priceId = PRICE_IDS[tier];

  if (!priceId) {
    return res.status(400).json({ error: 'Invalid tier selected.' });
  }

  // userId links the payment to the supporter's profile (used by the stripe-webhook function)
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!userId || !UUID_RE.test(userId)) {
    return res.status(400).json({ error: 'Please sign in first.' });
  }
  const SITE = 'https://www.giveitawayapp.com';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: userId,
      customer_email: typeof email === 'string' && email.includes('@') ? email : undefined,
      metadata: { user_id: userId, tier },
      subscription_data: { metadata: { user_id: userId, tier } },
      success_url: `${SITE}/?payment=success&tier=${tier}`,
      cancel_url:  `${SITE}/?payment=cancelled`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
