const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID  = process.env.NOTION_DATABASE_ID;

function extractText(prop) {
  if (!prop) return '';
  if (prop.select && prop.select.name) return prop.select.name;
  if (prop.multi_select && prop.multi_select.length) return prop.multi_select[0].name;
  if (prop.title && prop.title.length) return prop.title.map(function(r){ return r.plain_text; }).join('');
  if (prop.rich_text && prop.rich_text.length) return prop.rich_text.map(function(r){ return r.plain_text; }).join('');
  if (prop.formula && prop.formula.string) return prop.formula.string;
  if (prop.rollup && prop.rollup.array && prop.rollup.array.length) return extractText(prop.rollup.array[0]);
  return '';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    let allResults = [];
    let cursor = undefined;

    do {
      const body = { page_size: 100 };
      if (cursor) body.start_cursor = cursor;

      const notionRes = await fetch('https://api.notion.com/v1/databases/' + DATABASE_ID + '/query', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + NOTION_TOKEN,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!notionRes.ok) {
        const err = await notionRes.text();
        return res.status(500).json({ error: err });
      }

      const data = await notionRes.json();
      allResults = allResults.concat(data.results);
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);

    const quotes = allResults
      .map(function(page, i) {
        const props = page.properties;

        const topic     = extractText(props['TAG']).trim();
        const quote     = extractText(props['Full Quote and Reference']).trim();
        const reference = extractText(props['Reference']).trim();
        const saint     = extractText(props['Saint']).replace(/,\s*$/, '').trim();
        const tags      = (props['Various tag'] && props['Various tag'].multi_select || []).map(function(t){ return t.name.trim(); }).filter(Boolean);
        const url       = (props['URL'] && props['URL'].url) || '';

        return { id: i, topic: topic, quote: quote, reference: reference, saint: saint, tags: tags, url: url };
      })
      .filter(function(q){ return q.quote; });

    res.status(200).json(quotes);

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
