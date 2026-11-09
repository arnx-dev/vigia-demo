> Note: the knowledge base in `.vigia/changes` is a fixture seed until the first live `vigia watch` run.

# vigia-demo

A small checkout app with outdated vendor calls, watched by [vigia](https://github.com/arnx-dev/vigia).

- `src/abacatepay.ts`: a v1 call through a const `BASE`, the moved `/v2/checkouts/get`, and one call already on the new path (not flagged).
- `src/stripe.ts`: `apiVersion: "2024-06-20"` and `checkout.sessions.create`.

Run `node <path-to-vigia>/dist/cli.js scan` here to see the findings.
