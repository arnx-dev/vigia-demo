import type Stripe from "stripe";

// Stripe webhook handler. Flagged: `charge.refunded` is named by a 2025 change to refunds on cancellation.
export function handleStripeEvent(event: Stripe.Event): string {
  switch (event.type) {
    case "checkout.session.completed":
      return "fulfil the order";
    case "charge.refunded":
      return "mark the order refunded";
    default:
      return "ignore";
  }
}
