#!/usr/bin/env node

/**
 * Find Missing Translations
 *
 * Compares all translation files against English source (en.json)
 * and identifies strings that are still in English in other languages.
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const LANGUAGES = ['nl', 'de', 'fr', 'es', 'it'];

// Read English source (reference)
const enPath = path.join(MESSAGES_DIR, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

/**
 * Recursively find all paths to leaf values in nested object
 */
function getPaths(obj, prefix = '') {
  const paths = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      paths.push({ path: fullPath, value });
    } else if (typeof value === 'object' && value !== null) {
      paths.push(...getPaths(value, fullPath));
    }
  }

  return paths;
}

/**
 * Get value at path in nested object
 */
function getValueAtPath(obj, pathString) {
  const keys = pathString.split('.');
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
}

// Get all English string paths
const enPaths = getPaths(enData);

console.log(`\n🔍 Scanning ${enPaths.length} translation keys across ${LANGUAGES.length} languages...\n`);

// Check each language
const results = {};

for (const lang of LANGUAGES) {
  const langPath = path.join(MESSAGES_DIR, `${lang}.json`);
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

  const missing = [];

  for (const { path: keyPath, value: enValue } of enPaths) {
    const translatedValue = getValueAtPath(langData, keyPath);

    // Check if value is identical to English (likely untranslated)
    if (translatedValue === enValue) {
      missing.push({ path: keyPath, value: enValue });
    }
  }

  results[lang] = missing;
}

// Print results
let totalMissing = 0;

for (const lang of LANGUAGES) {
  const missing = results[lang];
  totalMissing += missing.length;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`📝 ${lang.toUpperCase()} - ${missing.length} untranslated strings`);
  console.log(`${'='.repeat(60)}\n`);

  if (missing.length === 0) {
    console.log('✅ All strings translated!\n');
    continue;
  }

  // Group by section
  const bySection = {};

  for (const { path, value } of missing) {
    const section = path.split('.')[0];
    if (!bySection[section]) {
      bySection[section] = [];
    }
    bySection[section].push({ path, value });
  }

  // Print grouped by section
  for (const [section, items] of Object.entries(bySection)) {
    console.log(`\n📂 ${section.toUpperCase()} (${items.length} strings):`);
    console.log(`${'-'.repeat(50)}`);

    for (const { path, value } of items.slice(0, 10)) { // Show max 10 per section
      const shortValue = value.length > 60 ? value.substring(0, 60) + '...' : value;
      console.log(`  • ${path}`);
      console.log(`    "${shortValue}"`);
    }

    if (items.length > 10) {
      console.log(`  ... and ${items.length - 10} more`);
    }
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 SUMMARY`);
console.log(`${'='.repeat(60)}`);
console.log(`Total translation keys: ${enPaths.length}`);
console.log(`Total untranslated: ${totalMissing}`);
console.log(`Translation coverage: ${((1 - totalMissing / (enPaths.length * LANGUAGES.length)) * 100).toFixed(2)}%`);
console.log(`${'='.repeat(60)}\n`);
