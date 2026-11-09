import { expect, it } from "vitest";
import { createBilling } from "./abacatepay.js";

it("exports the billing call", () => {
  expect(typeof createBilling).toBe("function");
});
