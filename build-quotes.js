/**
 * build-quotes.js
 * Fetches quotes from three Notion databases (Saints, Texts, Councils)
 * and outputs saints.json, texts.json, councils.json
 */

import { writeFileSync } from 'fs';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_SAINTS_DATABASE_ID = process.env.NOTION_SAINTS_DATABASE_ID;
const NOTION_TEXTS_DATABASE_ID = process.env.NOTION_TEXTS_DATABASE_ID;
const NOTION_COUNCILS_DATABASE_ID = process.env.NOTION_COUNCILS_DATABASE_ID;

if (!NOTION_TOKEN || !NOTION_SAINTS_DATABASE_ID || !NOTION_TEXTS_DATABASE_ID || !NOTION_COUNCILS_DATABASE_ID) {
  console.error('Missing required environment variables:');
  console.error('  NOTION_TOKEN, NOTION_SAINTS_DATABASE_ID, NOTION_TEXTS_DATABASE_ID, NOTION_COUNCILS_DATABASE_ID');
  process.exit(1);
}

const NOTION_API = 'https://api.notion.com/v1';
const headers = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

/**
 * Fetch all pages from a Notion database using pagination
 */
async function fetchAllPages(databaseId) {
  const pages = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const body = { page_size: 100 };
    if (startCursor) body.start_cursor = startCursor;

    const response = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Notion API error (${response.status}): ${error}`);
    }

    const data = await response.json();
    pages.push(...data.results);
    hasMore = data.has_more;
    startCursor = data.next_cursor;
  }

  return pages;
}

/**
 * Extract plain text from a Notion rich_text array
 */
function extractRichText(richTextArray) {
  if (!richTextArray || !Array.isArray(richTextArray)) return '';
  return richTextArray.map(t => t.plain_text || '').join('');
}

/**
 * Extract value from a select property
 */
function extractSelect(prop) {
  if (!prop || !prop.select) return '';
  return prop.select.name || '';
}

/**
 * Extract values from a multi-select property
 */
function extractMultiSelect(prop) {
  if (!prop || !prop.multi_select) return [];
  return prop.multi_select.map(s => s.name).filter(Boolean);
}

/**
 * Extract URL from a url property
 */
function extractUrl(prop) {
  if (!prop) return '';
  return prop.url || '';
}

/**
 * Process Saints database pages
 */
function processSaints(pages) {
  return pages.map((page, index) => {
    const props = page.properties;

    const topic = extractSelect(props['TAG']) || '';
    const tags = extractMultiSelect(props['Various tag']);
    const quote = extractRichText(props['Full Quote and Reference']?.rich_text);
    const reference = extractRichText(props['Reference']?.rich_text);
    const saint = extractRichText(props['Saint']?.rich_text);
    const url = extractUrl(props['URL']);

    return {
      id: `saint-${index}`,
      type: 'saint',
      topic,
      quote,
      reference,
      source: saint,
      tags,
      url
    };
  }).filter(item => item.quote.trim() !== '');
}

/**
 * Process Texts database pages
 */
function processTexts(pages) {
  return pages.map((page, index) => {
    const props = page.properties;

    const document = extractSelect(props['TAG']) || '';
    const tags = extractMultiSelect(props['Various tag']);
    // Topic can be select or rich_text
    let topic = '';
    if (props['Topic']?.select) {
      topic = extractSelect(props['Topic']);
    } else if (props['Topic']?.rich_text) {
      topic = extractRichText(props['Topic'].rich_text);
    }
    const chapterSection = extractRichText(props['Chapter and Section']?.rich_text);
    const quote = extractRichText(props['Full Quote and Reference']?.rich_text);
    const url = extractUrl(props['URL']);

    return {
      id: `text-${index}`,
      type: 'text',
      topic,
      quote,
      reference: chapterSection,
      source: document,
      tags,
      url,
      chapterSection
    };
  }).filter(item => item.quote.trim() !== '');
}

/**
 * Process Councils database pages
 */
function processCouncils(pages) {
  return pages.map((page, index) => {
    const props = page.properties;

    const council = extractSelect(props['TAG']) || '';
    const tags = extractMultiSelect(props['Various tag']);
    const councilType = extractSelect(props['Type']) || '';
    const reference = extractRichText(props['Reference']?.rich_text);
    const quote = extractRichText(props['Full Quote and Reference']?.rich_text);
    const url = extractUrl(props['URL']);

    return {
      id: `council-${index}`,
      type: 'council',
      topic: councilType,
      quote,
      reference,
      source: council,
      tags,
      url,
      councilType
    };
  }).filter(item => item.quote.trim() !== '');
}

async function main() {
  console.log('🏗️  Golden Mouth Database — Build Quotes');
  console.log('=========================================\n');

  // Fetch Saints
  console.log('📖 Fetching Saints database...');
  const saintsPages = await fetchAllPages(NOTION_SAINTS_DATABASE_ID);
  console.log(`   Found ${saintsPages.length} pages`);
  const saints = processSaints(saintsPages);
  console.log(`   Processed ${saints.length} valid quotes\n`);

  // Fetch Texts
  console.log('📜 Fetching Texts database...');
  const textsPages = await fetchAllPages(NOTION_TEXTS_DATABASE_ID);
  console.log(`   Found ${textsPages.length} pages`);
  const texts = processTexts(textsPages);
  console.log(`   Processed ${texts.length} valid quotes\n`);

  // Fetch Councils
  console.log('⚖️  Fetching Councils database...');
  const councilsPages = await fetchAllPages(NOTION_COUNCILS_DATABASE_ID);
  console.log(`   Found ${councilsPages.length} pages`);
  const councils = processCouncils(councilsPages);
  console.log(`   Processed ${councils.length} valid quotes\n`);

  // Write output files
  writeFileSync('saints.json', JSON.stringify(saints, null, 2));
  console.log(`✅ saints.json written (${saints.length} items)`);

  writeFileSync('texts.json', JSON.stringify(texts, null, 2));
  console.log(`✅ texts.json written (${texts.length} items)`);

  writeFileSync('councils.json', JSON.stringify(councils, null, 2));
  console.log(`✅ councils.json written (${councils.length} items)`);

  const total = saints.length + texts.length + councils.length;
  console.log(`\n🎉 Total: ${total} quotes across all sections`);
}

main().catch(err => {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
});
