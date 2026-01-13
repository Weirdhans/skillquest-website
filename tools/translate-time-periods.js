#!/usr/bin/env node

/**
 * Translate Time Periods (/month, /year)
 *
 * Translates time period suffixes in pricing strings
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

const TRANSLATIONS = {
  nl: {
    '/month': '/maand',
    '/year': '/jaar'
  },
  de: {
    '/month': '/Monat',
    '/year': '/Jahr'
  },
  fr: {
    '/month': '/mois',
    '/year': '/an'
  },
  es: {
    '/month': '/mes',
    '/year': '/año'
  },
  it: {
    '/month': '/mese',
    '/year': '/anno'
  }
};

// Keys that contain /month or /year
const KEYS_WITH_TIME_PERIODS = [
  'pricing.tiers.premium.pricePer',
  'pricing.tiers.premium.priceYearly',
  'pricing.tiers.family.pricePer',
  'pricing.tiers.family.priceYearly'
];

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

/**
 * Set value at path in nested object
 */
function setValueAtPath(obj, pathString, value) {
  const keys = pathString.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

function main() {
  console.log('\n⏰ Translating time periods (/month, /year)...\n');

  let totalTranslated = 0;

  for (const lang of Object.keys(TRANSLATIONS)) {
    const langPath = path.join(MESSAGES_DIR, `${lang}.json`);
    const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📝 ${lang.toUpperCase()}`);
    console.log(`${'='.repeat(50)}\n`);

    let translatedCount = 0;

    for (const key of KEYS_WITH_TIME_PERIODS) {
      let value = getValueAtPath(langData, key);

      if (!value) {
        console.log(`⚠️  Key not found: ${key}`);
        continue;
      }

      let originalValue = value;
      let changed = false;

      // Replace /month
      if (value.includes('/month')) {
        value = value.replace('/month', TRANSLATIONS[lang]['/month']);
        changed = true;
      }

      // Replace /year
      if (value.includes('/year')) {
        value = value.replace('/year', TRANSLATIONS[lang]['/year']);
        changed = true;
      }

      if (changed) {
        console.log(`Translating: ${key}`);
        console.log(`  BEFORE: "${originalValue}"`);
        console.log(`  AFTER:  "${value}"`);
        console.log('');

        setValueAtPath(langData, key, value);
        translatedCount++;
        totalTranslated++;
      }
    }

    if (translatedCount > 0) {
      fs.writeFileSync(langPath, JSON.stringify(langData, null, 2) + '\n', 'utf8');
      console.log(`✅ Saved ${translatedCount} translations to ${lang}.json\n`);
    } else {
      console.log(`ℹ️  No translations needed for ${lang.toUpperCase()}\n`);
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Translation complete!`);
  console.log(`${'='.repeat(50)}`);
  console.log(`Total strings translated: ${totalTranslated}`);
  console.log(`${'='.repeat(50)}\n`);
}

main().catch(console.error);
