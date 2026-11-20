const BASE = "https://api.abacatepay.com/v1";

// Not flagged today: AbacatePay has not published a date for retiring v1.
export async function createPix(amount: number): Promise<Response> {
  return fetch(`${BASE}/pixQrCode/create`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.ABACATEPAY_KEY}` },
    body: JSON.stringify({ amount }),
  });
}
