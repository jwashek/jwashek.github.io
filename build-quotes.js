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
 * Extract text from any Notion property (handles all types)
 */
function extractText(prop) {
  if (!prop) return '';
  if (prop.type === 'select' && prop.select) return prop.select.name || '';
  if (prop.type === 'multi_select' && prop.multi_select) return prop.multi_select.map(s => s.name).join(', ');
  if (prop.type === 'title' && prop.title) return prop.title.map(t => t.plain_text || '').join('');
  if (prop.type === 'rich_text' && prop.rich_text) return prop.rich_text.map(t => t.plain_text || '').join('');
  if (prop.type === 'url') return prop.url || '';
  if (prop.type === 'formula' && prop.formula) return prop.formula.string || '';
  if (prop.type === 'rollup' && prop.rollup?.array?.length) return extractText(prop.rollup.array[0]);
  // Fallback: try common shapes
  if (prop.select) return prop.select.name || '';
  if (prop.rich_text) return prop.rich_text.map(t => t.plain_text || '').join('');
  if (prop.title) return prop.title.map(t => t.plain_text || '').join('');
  return '';
}

/**
 * Extract values from a multi-select property
 */
function extractMultiSelect(prop) {
  if (!prop || !prop.multi_select) return [];
  return prop.multi_select.map(s => s.name).filter(Boolean);
}


/**
 * Process Saints database pages
 */
function processSaints(pages) {
  return pages.map((page, index) => {
    const props = page.properties;

    const topic = extractText(props['TAG']).trim();
    const tags = extractMultiSelect(props['Various tag']);
    const quote = extractText(props['Full Quote and Reference']).trim();
    const reference = extractText(props['Reference']).trim();
    const saint = extractText(props['Saint']).replace(/,\s*$/, '').trim();
    const text = extractText(props['Text']).trim();
    const subText = extractText(props['Sub-Text']).trim();
    const url = (props['URL'] && props['URL'].url) || '';

    return {
      id: `saint-${index}`,
      type: 'saint',
      topic,
      quote,
      reference,
      source: saint,
      tags,
      url,
      text,
      subText
    };
  }).filter(item => item.quote.trim() !== '');
}

/**
 * Process Texts database pages
 */
function processTexts(pages) {
  return pages.map((page, index) => {
    const props = page.properties;

    const document = extractText(props['TAG']).trim();
    const tags = extractMultiSelect(props['Various tag']);
    const topic = extractText(props['Topic']).trim();
    const chapterSection = extractText(props['Chapter and Section']).trim();
    const quote = extractText(props['Full Quote and Reference']).trim();
    const url = (props['URL'] && props['URL'].url) || '';

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

    const council = extractText(props['TAG']).trim();
    const tags = extractMultiSelect(props['Various tag']);
    const councilType = extractText(props['Type']).trim();
    const reference = extractText(props['Reference']).trim();
    const quote = extractText(props['Full Quote and Reference']).trim();
    const url = (props['URL'] && props['URL'].url) || '';

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
