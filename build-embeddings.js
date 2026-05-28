#!/usr/bin/env node
/**
 * build-embeddings.js
 * 
 * Reads quotes.json and generates semantic embeddings for each quote
 * using a lightweight model compatible with Transformers.js.
 * 
 * Output: embeddings.json — an array of float32 arrays, one per quote,
 * in the same order as quotes.json.
 * 
 * Run after build-quotes.js:
 *   node build-embeddings.js
 * 
 * Requires: @xenova/transformers (install via npm)
 */

import { pipeline } from '@xenova/transformers';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const QUOTES_PATH = join(process.cwd(), 'quotes.json');
const OUTPUT_PATH = join(process.cwd(), 'embeddings.json');

// Use a small, fast model that Transformers.js supports
// all-MiniLM-L6-v2 is ~23MB, great quality for semantic search
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';

async function main() {
  console.log('📖 Reading quotes.json...');
  const quotes = JSON.parse(readFileSync(QUOTES_PATH, 'utf-8'));
  console.log(`   Found ${quotes.length} quotes\n`);

  console.log(`🤖 Loading model: ${MODEL_NAME}...`);
  const extractor = await pipeline('feature-extraction', MODEL_NAME);
  console.log('   Model loaded\n');

  console.log('⚡ Generating embeddings...');
  const embeddings = [];

  for (let i = 0; i < quotes.length; i++) {
    const q = quotes[i];
    // Combine quote text with metadata for richer semantic matching
    const text = [
      q.quote,
      q.saint,
      q.topic,
      q.tags.join(', ')
    ].filter(Boolean).join(' | ');

    const output = await extractor(text, { pooling: 'mean', normalize: true });
    // Convert to regular array of numbers (float32 → ~4 decimal places for size)
    const embedding = Array.from(output.data).map(v => Math.round(v * 10000) / 10000);
    embeddings.push(embedding);

    if ((i + 1) % 50 === 0 || i === quotes.length - 1) {
      console.log(`   ${i + 1} / ${quotes.length}`);
    }
  }

  console.log('\n💾 Writing embeddings.json...');
  writeFileSync(OUTPUT_PATH, JSON.stringify(embeddings));

  const sizeMB = (Buffer.byteLength(JSON.stringify(embeddings)) / (1024 * 1024)).toFixed(2);
  console.log(`✅ Done! ${embeddings.length} embeddings (${sizeMB} MB)`);
}

main().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
