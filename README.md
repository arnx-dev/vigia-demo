# vigia-demo

A small shop backend that calls four vendor APIs, watched by [vigia](https://github.com/arnx-dev/vigia).
The vendor changes in `.vigia/changes` were read live from the vendors' own pages through Firecrawl; nothing here is a fixture.

There is no vendor list to maintain: vigia finds Stripe, Firecrawl, Resend and AbacatePay in the code.

## What vigia reports here

| Where | Vendor change | Why it matters |
| --- | --- | --- |
| `src/lib/firecrawl.ts`, `scrapeProduct` | Firecrawl shuts down the v1 API on 2026-12-10 | A v1 call through a wrapper function; it returns HTTP 410 after that date |
| `src/lib/firecrawl.ts`, `scrapeWithSdk` | same | The old SDK method `scrapeUrl` calls v1 |
| `src/checkout.ts`, `createCheckout` | Stripe removes `payment_method_types` from Checkout Sessions (2026-09-30) | The call passes that parameter; the client is created in another file |
| `src/webhooks/stripe.ts` | Stripe stops creating a Refund object on payment cancellation (2025-03-31) | The handler waits for `charge.refunded` |
| `src/lib/stripe.ts` | heads-up only | The client is pinned to API version 2024-06-20 |

## What it leaves alone

- `extractPrices` calls `/v1/extract`, which Firecrawl's notice says is not part of the shutdown.
- `searchWeb` is already on v2.
- `getCheckout` reads a session and passes nothing that changed.
- `src/mail.ts` (Resend) and `src/lib/abacatepay.ts`: no published change touches these calls. AbacatePay has not announced a date for retiring v1.

## Try it

```sh
git clone https://github.com/arnx-dev/vigia.git && cd vigia && npm ci && npm run build && cd ..
cd vigia-demo
node ../vigia/dist/cli.js scan
```

`scan` needs no key and no network: it matches the stored changes against the code. `watch` (daily, in `.github/workflows/vigia-watch.yml`) is the step that reads the vendor pages and needs `FIRECRAWL_API_KEY`.
Here it runs only when the repository variable `VIGIA_WATCH` is `on`, since each run spends Firecrawl credits. With `VIGIA_EMAIL_TO`, `VIGIA_EMAIL_FROM` and the `RESEND_API_KEY` secret set, the same workflow mails the affected calls through Resend.
