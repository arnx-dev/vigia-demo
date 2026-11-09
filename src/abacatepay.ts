const BASE = "https://api.abacatepay.com/v1";

export async function createBilling(): Promise<Response> {
  return fetch(`${BASE}/billing/create`, { method: "POST" });
}

export async function getCheckout(id: string): Promise<Response> {
  return fetch(`https://api.abacatepay.com/v2/checkouts/get?id=${id}`);
}

// Already on the new path: not flagged.
export async function getSubscriptionCheckout(id: string): Promise<Response> {
  return fetch(`https://api.abacatepay.com/v2/subscriptions/checkouts/get?id=${id}`);
}
