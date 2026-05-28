#!/usr/bin/env node
/**
 * build-quotes.js
 * 
 * Fetches all quotes from your Notion database and writes them to
 * a static quotes.json file. Run this:
 *   - Manually after adding quotes: `node build-quotes.js`
 *   - On a schedule via GitHub Actions (see workflow below)
 *   - Via Vercel cron (see vercel.json config below)
 * 
 * Required env vars:
 *   NOTION_TOKEN        - Your Notion integration token
 *   NOTION_DATABASE_ID  - Your Notion database ID
 */

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID  = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN || !DATABASE_ID) {
  console.error('❌ Missing NOTION_TOKEN or NOTION_DATABASE_ID env vars');
  process.exit(1);
}

function extractText(prop) {
  if (!prop) return '';
  if (prop.select && prop.select.name) return prop.select.name;
  if (prop.multi_select && prop.multi_select.length) return prop.multi_select[0].name;
  if (prop.title && prop.title.length) return prop.title.map(r => r.plain_text).join('');
  if (prop.rich_text && prop.rich_text.length) return prop.rich_text.map(r => r.plain_text).join('');
  if (prop.formula && prop.formula.string) return prop.formula.string;
  if (prop.rollup && prop.rollup.array && prop.rollup.array.length) return extractText(prop.rollup.array[0]);
  return '';
}

async function fetchAllQuotes() {
  let allResults = [];
  let cursor = undefined;
  let page = 0;

  do {
    page++;
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;

    console.log(`  Fetching page ${page}...`);

    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Notion API error (${res.status}): ${err}`);
    }

    const data = await res.json();
    allResults = allResults.concat(data.results);
    cursor = data.has_more ? data.next_cursor : undefined;

    console.log(`  Got ${data.results.length} results (total: ${allResults.length})`);
  } while (cursor);

  return allResults;
}

function transformQuotes(results) {
  return results
    .map((page, i) => {
      const props = page.properties;

      const topic     = extractText(props['TAG']).trim();
      const quote     = extractText(props['Full Quote and Reference']).trim();
      const reference = extractText(props['Reference']).trim();
      const saint     = extractText(props['Saint']).replace(/,\s*$/, '').trim();
      const tags      = (props['Various tag'] && props['Various tag'].multi_select || [])
                          .map(t => t.name.trim()).filter(Boolean);
      const url       = (props['URL'] && props['URL'].url) || '';

      return { id: i, topic, quote, reference, saint, tags, url };
    })
    .filter(q => q.quote);
}

async function main() {
  console.log('🔄 Fetching quotes from Notion...\n');

  const results = await fetchAllQuotes();
  const quotes = transformQuotes(results);

  console.log(`\n✅ Processed ${quotes.length} quotes`);

  // Write to quotes.json in the same directory (repo root or public/)
  const fs = await import('fs');
  const path = await import('path');
  
  const outPath = path.default.join(process.cwd(), 'quotes.json');
  fs.default.writeFileSync(outPath, JSON.stringify(quotes, null, 0));
  
  const sizeKB = (Buffer.byteLength(JSON.stringify(quotes)) / 1024).toFixed(1);
  console.log(`📄 Written to: ${outPath} (${sizeKB} KB)`);

  // Stats
  const topics = [...new Set(quotes.map(q => q.topic))].filter(Boolean);
  const saints = [...new Set(quotes.map(q => q.saint))].filter(Boolean);
  const tags   = [...new Set(quotes.flatMap(q => q.tags))].filter(Boolean);
  
  console.log(`\n📊 Stats:`);
  console.log(`   ${quotes.length} quotes`);
  console.log(`   ${topics.length} topics`);
  console.log(`   ${saints.length} saints`);
  console.log(`   ${tags.length} unique tags`);
}

main().catch(err => {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
});
