import { stripe } from "./lib/stripe.js";

// Flagged: Stripe removes `payment_method_types` from Checkout Sessions (2026-09-30).
export async function createCheckout(priceId: string) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "https://example.com/ok",
  });
}

// Not flagged: reads a session, passes nothing that changed.
export async function getCheckout(id: string) {
  return stripe.checkout.sessions.retrieve(id);
}
