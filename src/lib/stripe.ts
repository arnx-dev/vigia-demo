import Stripe from "stripe";

// Pinned to an old API version: vigia shows how many breaking versions came after it.
export const stripe = new Stripe(process.env.STRIPE_KEY!, { apiVersion: "2024-06-20" });
