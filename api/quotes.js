const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID  = process.env.NOTION_DATABASE_ID;

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
        const topic     = (props['TAG'] && props['TAG'].select && props['TAG'].select.name || '').trim();
        const quote     = (props['Full Quote and Reference'] && props['Full Quote and Reference'].rich_text || []).map(function(r){ return r.plain_text; }).join('').trim();
        const reference = (props['Reference'] && props['Reference'].rich_text || []).map(function(r){ return r.plain_text; }).join('').trim();
        const saint     = (props['Saint'] && props['Saint'].rich_text || []).map(function(r){ return r.plain_text; }).join('').replace(/,\s*$/, '').trim();
        const tags      = (props['Various tag'] && props['Various tag'].multi_select || []).map(function(t){ return t.name.trim(); }).filter(Boolean);
        return { id: i, topic: topic, quote: quote, reference: reference, saint: saint, tags: tags };
      })
      .filter(function(q){ return q.quote; });

    res.status(200).json(quotes);

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
