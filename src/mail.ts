import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Not flagged: nothing in Resend's changelog touches this call.
export const sendReceipt = (to: string, html: string) =>
  resend.emails.send({ from: "shop <shop@example.com>", to, subject: "Your receipt", html });
