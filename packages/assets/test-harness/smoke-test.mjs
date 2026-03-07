import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const outDir = new URL('./artifacts/', import.meta.url);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
await page.locator('section').screenshot({ path: new URL('./artifacts/assets-consumer.png', import.meta.url).pathname });
const payload = {
  title: await page.title(),
  h1: await page.locator('h1').textContent(),
  imageCount: await page.locator('img').count(),
  interfaceDump: await page.locator('#interface-dump').textContent()
};
await writeFile(new URL('./artifacts/assertions.json', import.meta.url), `${JSON.stringify(payload, null, 2)}\n`);
await browser.close();
