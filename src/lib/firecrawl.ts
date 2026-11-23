import FirecrawlApp from "@mendable/firecrawl-js";

const FIRECRAWL_API = "https://api.firecrawl.dev/v1";

async function firecrawl(path: string, body: unknown): Promise<Response> {
  return fetch(`${FIRECRAWL_API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Flagged: the v1 API shuts down on 2026-12-10.
export const scrapeProduct = (url: string) => firecrawl("/scrape", { url, formats: ["markdown"] });

// Not flagged: /v1/extract is not part of the shutdown.
export const extractPrices = (url: string) => firecrawl("/extract", { urls: [url], prompt: "List the prices." });

// Not flagged: already on v2.
export const searchWeb = (query: string) =>
  fetch("https://api.firecrawl.dev/v2/search", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}` },
    body: JSON.stringify({ query }),
  });

// Flagged: the old SDK method calls v1.
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
export const scrapeWithSdk = (url: string) => app.scrapeUrl(url, { formats: ["markdown"] });

// Crawls a supplier's catalog to keep our price list fresh.
export const crawlCatalog = (url: string) => firecrawl("/crawl", { url, limit: 50 });
