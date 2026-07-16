import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Startup Navigator source includes required product surfaces", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const app = await readFile(new URL("../components/startup-navigator-app.tsx", import.meta.url), "utf8");
  const pages = await readFile(new URL("../components/pages.tsx", import.meta.url), "utf8");
  const content = await readFile(new URL("../lib/startup-content.ts", import.meta.url), "utf8");
  const rag = await readFile(new URL("../lib/rag.ts", import.meta.url), "utf8");

  assert.match(layout, /Startup Navigator - Comprehensive Guide to Startups/);
  assert.match(page, /StartupNavigatorApp/);
  assert.match(app, /HomePage/);
  assert.match(pages, /Explore Topics/);
  assert.match(pages, /AI Search/);
  assert.match(pages, /Resources/);
  assert.match(pages, /Admin Section/);
  assert.match(pages, /Dashboard/);
  assert.match(pages, /RAG-style assistant/);
  assert.match(content, /Registering a startup in India/);
  assert.match(rag, /buildAnswer/);
  assert.doesNotMatch(`${page}\n${app}`, /Your site is taking shape|react-loading-skeleton/i);
});
