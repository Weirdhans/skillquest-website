#!/usr/bin/env node

/**
 * Translate Optional Strings
 *
 * Translates footer sections, hero titles, and other optional strings
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const DEEPL_API_KEY = process.env.DEEPL_API_KEY || 'e9536b0f-909f-400e-8492-1ed622b74647:fx';

// Keys that should be translated (optional strings)
const KEYS_TO_TRANSLATE = {
  // Hero
  'hero.titleAccent': true,
  'painPoints.successStory.before.title': true,

  // Footer
  'footer.sections.product.title': true,
  'footer.sections.resources.guide': true,
  'footer.sections.resources.contact': true,
  'footer.sections.legal.title': true,
};

const TARGET_LANGUAGES = ['nl', 'de', 'fr', 'es', 'it'];

const DEEPL_LANG_MAP = {
  'nl': 'NL',
  'de': 'DE',
  'fr': 'FR',
  'es': 'ES',
  'it': 'IT'
};

/**
 * Translate text using DeepL API
 */
async function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      text: [text],
      target_lang: DEEPL_LANG_MAP[targetLang],
      source_lang: 'EN',
      preserve_formatting: true,
      tag_handling: 'xml',
      ignore_tags: ['x']
    });

    const options = {
      hostname: 'api-free.deepl.com',
      port: 443,
      path: '/v2/translate',
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(responseData);
            resolve(result.translations[0].text);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        } else {
          reject(new Error(`DeepL API error ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
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

async function main() {
  const enPath = path.join(MESSAGES_DIR, 'en.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  console.log('\n🌐 Translating optional strings...\n');

  let totalTranslated = 0;

  for (const lang of TARGET_LANGUAGES) {
    const langPath = path.join(MESSAGES_DIR, `${lang}.json`);
    const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📝 ${lang.toUpperCase()}`);
    console.log(`${'='.repeat(50)}\n`);

    let translatedCount = 0;

    for (const key of Object.keys(KEYS_TO_TRANSLATE)) {
      const enValue = getValueAtPath(enData, key);
      const langValue = getValueAtPath(langData, key);

      // Only translate if it matches English (untranslated)
      if (enValue && langValue === enValue) {
        console.log(`Translating: ${key}`);
        console.log(`  EN: "${enValue}"`);

        try {
          // Rate limiting: wait 500ms between requests
          await new Promise(resolve => setTimeout(resolve, 500));

          const translated = await translateText(enValue, lang);
          console.log(`  ${lang.toUpperCase()}: "${translated}"`);

          setValueAtPath(langData, key, translated);
          translatedCount++;
          totalTranslated++;
        } catch (error) {
          console.error(`  ❌ Error: ${error.message}`);
        }

        console.log('');
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
