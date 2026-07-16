import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Startup Navigator source includes required product surfaces", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(layout, /Startup Navigator - Comprehensive Guide to Startups/);
  assert.match(page, /Explore Topics/);
  assert.match(page, /AI Search/);
  assert.match(page, /Resources/);
  assert.match(page, /Admin Section/);
  assert.match(page, /Dashboard/);
  assert.match(page, /RAG-style assistant/);
  assert.match(page, /admin@startupnavigator\.com/);
  assert.doesNotMatch(page, /Your site is taking shape|react-loading-skeleton/i);
});
