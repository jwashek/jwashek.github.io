/**
 * build-embeddings.js
 * Reads saints.json, texts.json, councils.json
 * Generates embeddings using @xenova/transformers (all-MiniLM-L6-v2)
 * Outputs embeddings.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { pipeline } from '@xenova/transformers';

async function main() {
  console.log('🧠 Golden Mouth Database — Build Embeddings');
  console.log('=============================================\n');

  // Load quote data
  console.log('📂 Loading quote files...');
  const saints = JSON.parse(readFileSync('saints.json', 'utf-8'));
  const texts = JSON.parse(readFileSync('texts.json', 'utf-8'));
  const councils = JSON.parse(readFileSync('councils.json', 'utf-8'));

  const allQuotes = [...saints, ...texts, ...councils];
  console.log(`   Total items: ${allQuotes.length}\n`);

  // Load the embedding model
  console.log('🔄 Loading embedding model (all-MiniLM-L6-v2)...');
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  console.log('   Model loaded successfully\n');

  // Generate embeddings
  console.log('⚡ Generating embeddings...');
  const embeddings = [];

  for (let i = 0; i < allQuotes.length; i++) {
    const item = allQuotes[i];

    // Compose text for embedding: quote + source + topic + tags
    const parts = [
      item.quote || '',
      item.source || '',
      item.topic || '',
      (item.tags || []).join(' ')
    ].filter(Boolean);

    const text = parts.join(' ');

    // Generate embedding
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data).map(v => Math.round(v * 10000) / 10000);
    embeddings.push(embedding);

    // Progress reporting every 50 items
    if ((i + 1) % 50 === 0 || i === allQuotes.length - 1) {
      const pct = ((i + 1) / allQuotes.length * 100).toFixed(1);
      console.log(`   Progress: ${i + 1}/${allQuotes.length} (${pct}%)`);
    }
  }

  // Write embeddings
  writeFileSync('embeddings.json', JSON.stringify(embeddings));
  console.log(`\n✅ embeddings.json written (${embeddings.length} vectors)`);

  const dims = embeddings[0]?.length || 0;
  console.log(`   Dimensions per vector: ${dims}`);
  console.log(`   File size: ${(Buffer.byteLength(JSON.stringify(embeddings)) / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(err => {
  console.error('❌ Embedding generation failed:', err.message);
  process.exit(1);
});
