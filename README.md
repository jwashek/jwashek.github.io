# Golden Mouth Database

**Quotes from the Holy Saints of the Eastern Orthodox Church**

A searchable database of patristic quotes, sayings, and wisdom from the Holy Saints of the Eastern Orthodox Church — with AI-powered search.

**[goldenmouth.app](https://goldenmouth.app)**

---

## Features

- **Filter by topic, saint, or tag** via the sidebar
- **Keyword search** across quotes, saints, references, and tags
- **AI-powered search** — ask natural language questions like *"What did the Saints say about being judgmental?"* and get relevant results even without exact keyword matches
- **One-click copy** — copy any quote with full reference to your clipboard
- **Mobile-friendly** responsive design for mobile users

## How It Works

### Architecture

```
┌─────────────┐    build-quotes.js     ┌──────────────┐
│  Notion DB  │ ─────────────────────→ │ quotes.json  │
└─────────────┘                        └──────────────┘
       │                                      │
       │         build-embeddings.js    ┌──────────────────┐
       └──────────────────────────────→ │ embeddings.json  │
                                        └──────────────────┘
                                              │
                                              ↓
                                        ┌────────────┐
                                        │ index.html │ → GitHub Pages
                                        └────────────┘
```

- **Notion** is used as the CMS for authoring and editing quotes
- **GitHub Actions** runs daily (or on-demand) to pull quotes from Notion, generate semantic embeddings, and commit the static files
- **GitHub Pages** serves the static site — no backend, no serverless functions
- **Transformers.js** runs a lightweight AI model directly in the user's browser for semantic search (no API keys required)

### AI Search

The AI search uses [Transformers.js](https://huggingface.co/docs/transformers.js) with the `all-MiniLM-L6-v2` model to enable natural language queries. Embeddings are pre-computed at build time and stored as a static JSON file. When a user asks a question, the model runs in-browser to compute a query embedding, then ranks quotes by cosine similarity.

## Tech Stack

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend | Vanilla HTML/CSS/JS | Free |
| Fonts | Inter + Newsreader (Google Fonts) | Free |
| AI Search | Transformers.js + all-MiniLM-L6-v2 | Free |
| CMS | Notion | Free |
| Build | GitHub Actions | Free |
| Hosting | GitHub Pages | Free |
| CDN | jsDelivr (for Transformers.js) | Free |

**Total cost: $0** (aside from domain registration)

## Source

Content: All quotes are attributed to their respective Saints and sources and pulled generally from [New Advent](https://www.newadvent.org/fathers/) and [CCEL](https://ccel.org/fathers). Other quotes have been pulled directly from public PDFs of Saint's works which are all linked as sources in the quotes themselves.
