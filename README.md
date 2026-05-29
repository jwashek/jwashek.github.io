# Golden Mouth Database

**Quotes from the Holy Saints of the Eastern Orthodox Church**

A searchable database of patristic quotes, sayings, and wisdom from the Holy Saints of the Eastern Orthodox Church — with AI-powered search.

**[goldenmouth.app](https://goldenmouth.app)**

---

## Overview
### Inspiration
My inspiration for building this app came from a book I purchased years ago called [A Dictionary of Early Christian Beliefs](https://www.amazon.com/Dictionary-Early-Christian-Beliefs-Reference/dp/1565633571). This book did several things for me: 

1. It showed me that my (then) Protestant Christian beliefs were not aligned to the early Christians in their doctrinal beliefs, their way of life, and in their worship of God.
2. It reinforced my belief that Christianity is true.
3. It showed me how faith has "been once delivered" (i.e., Jude 3) and was preserved through Apostolic Succession (i.e., Acts 1:20–26, Acts 14:23, 1 Timothy 4:14, 2 Timothy 1:6, 2 Timothy 2:2, etc.), as argued by several Saints.
4. It gave me a deep desire to seek out "the Church" that is called the "pillar and foundation of truth" (i.e., 1 Timothy 3:15) that Christ Himself established (i.e., Matthew 16:18).

### Intent
My intention for creating this app is to make reading the Saints more accessible to all Christians, no matter their practicing denomination. This way, all can see first-hand what the early Christians believed themselves, how they lived their lives, and how they worshipped God. I did this in hopes of leading professing Christians to "the Church", where I am fully convinced resides in the Eastern Orthodox Church. The Saints were my guides leading me to the Church and I hope this app can do the same for others as it did for me: to carve a more accessible trail of the many winding, chaotic paths in a forest of opposing, subjective interpretations that is modern-day Christianity. If the Church is the pillar and foundation of truth (i.e., 1 Timothy 3:15), then let Her be our objective path out of the chaos.

In addition to this, and maybe more importantly, I want to prevent "cherry-picking" that many (especially Protestant) Christians do when they read the Saints out of context or "cut the leg off an animal and keep it to themselves" where they neglect the whole teaching as Saint John Chrysostom puts it in [Homily 1, Section 8](https://www.newadvent.org/fathers/200101.htm) of his Homilies on Matthew. This is especially important to me as I believe this is the biggest hurdle that prevents Christians from changing their mind--they commit many logical fallacies such as the Texas Sharpshooter Fallacy and Cherry-Picking Fallacy which only lets them confirm their own bias and presuppositions when reading the Saints. I attempted to fight this in several ways:

1. Providing sources for every quote.
2. Intentionally not redirecting the source to the exact word-for-word quote, but linking to the main, general source. This forces readers to find the quote and hopefully read some of the context in the process.
3. Adding context. You might notice some quotes have `[i.e., {some background}]` text. This is to add context on arguments, why the quote(s) was made, or to provide some historical basis for the quote(s). This also serves an additional purpose: for readers not to take my word for it, but to verify the quote for themselves.
4. Keeping some quotes lengthy, so this provides surrounding context to the quote as a whole.

### Why "Golden Mouth"? 
Saint John Chrysostom is my [Patron Saint](https://orthodoxwiki.org/Patron_saint) and was rightly given the name "Chrysostom", meaning "[golden-mouthed](https://en.wikipedia.org/wiki/John_Chrysostom#:~:text=mouthed)", due to his eloquent preaching. He holds a very dear place in my heart and is one of the reasons I fell in love with the Saints and found the Church. Not only is this app paying respect to him by taking his name, but also to all Saints who--in my opinion--have "golden-mouths" of their own. 

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

All quotes are attributed to their respective Saints and sources and pulled generally from [New Advent](https://www.newadvent.org/fathers/) and [CCEL](https://ccel.org/fathers). Other quotes have been pulled directly from public PDFs of Saint's works which are all linked as sources in the quotes themselves.
