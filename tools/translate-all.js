/**
 * Batch Translation Script for SkillQuest Website
 *
 * Translates en.json to all other languages using DeepL API
 * Usage: node tools/translate-all.js
 *
 * Requires: DEEPL_API_KEY environment variable
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// DeepL API configuration
const DEEPL_API_KEY = process.env.DEEPL_API_KEY || 'e9536b0f-909f-400e-8492-1ed622b74647:fx';
const TARGET_LANGUAGES = ['nl', 'de', 'fr', 'es', 'it'];

// Language code mapping
const LANG_MAP = {
  'en': 'EN',
  'nl': 'NL',
  'de': 'DE',
  'fr': 'FR',
  'es': 'ES',
  'it': 'IT'
};

/**
 * Protect ICU MessageFormat placeholders, emojis, and special characters from translation
 */
function protectPlaceholders(text) {
  const protected_items = [];
  let protected = text;

  // First: Replace emojis with XML tags
  // Emoji regex that matches most common emojis including compound emojis
  protected = protected.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}][\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{1F3FB}-\u{1F3FF}]*/gu, (match) => {
    const index = protected_items.length;
    protected_items.push(match);
    return `<x id="${index}"/>`;
  });

  // Second: Protect special characters like arrows (→), bullets (•), etc.
  protected = protected.replace(/[→←↑↓↔•◦∙⚡✓✔✗✘]/g, (match) => {
    const index = protected_items.length;
    protected_items.push(match);
    return `<x id="${index}"/>`;
  });

  // Third: Replace {placeholder} with XML tags
  protected = protected.replace(/\{([^}]+)\}/g, (match, placeholder) => {
    const index = protected_items.length;
    protected_items.push(match); // Store the full {placeholder}
    return `<x id="${index}"/>`;
  });

  return { protected, placeholders: protected_items };
}

/**
 * Restore ICU MessageFormat placeholders and emojis after translation
 */
function restorePlaceholders(text, protected_items) {
  let restored = text;

  // Replace XML tags back to original content (placeholders or emojis)
  protected_items.forEach((item, index) => {
    restored = restored.replace(new RegExp(`<x id="${index}"\\s*/>`, 'g'), item);
    // Also handle cases where DeepL adds spaces
    restored = restored.replace(new RegExp(`<x id="${index}"\\s*>\\s*</x>`, 'g'), item);
  });

  return restored;
}

/**
 * Translate text using DeepL API
 */
async function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
    // Protect placeholders before translation
    const { protected, placeholders } = protectPlaceholders(text);

    const data = JSON.stringify({
      text: [protected],
      source_lang: 'EN',
      target_lang: LANG_MAP[targetLang],
      formality: 'default',
      preserve_formatting: true,
      tag_handling: 'xml',
      ignore_tags: ['x']
    });

    const options = {
      hostname: 'api-free.deepl.com',
      path: '/v2/translate',
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(body);
            if (response.translations && response.translations[0] && response.translations[0].text) {
              // Restore placeholders in translated text
              const translated = restorePlaceholders(response.translations[0].text, placeholders);
              resolve(translated);
            } else {
              reject(new Error(`Empty translation response: ${body}`));
            }
          } catch (e) {
            reject(new Error(`JSON parse error: ${e.message}`));
          }
        } else {
          reject(new Error(`DeepL API error: ${res.statusCode} - ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Recursively translate object values
 */
async function translateObject(obj, targetLang, path = '', stats = { total: 0, translated: 0 }) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === 'string') {
      stats.total++;

      try {
        // Skip strings that are already translated (contain emojis or special chars might be fine as-is)
        if (value.trim() === '') {
          result[key] = value;
          continue;
        }

        process.stdout.write(`\r   [${stats.total}/${stats.total}] ${currentPath.padEnd(50).substring(0, 50)}`);

        result[key] = await translateText(value, targetLang);
        stats.translated++;

        // Rate limiting: wait 500ms between requests (DeepL free tier - avoid 429 errors)
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`\n   ❌ Error translating ${currentPath}: ${error.message}`);
        console.error(`   📝 Original text: "${value.substring(0, 50)}..."`);
        console.error(`   🔍 Full error:`, error);
        result[key] = value; // Keep original on error
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursively translate nested objects
      result[key] = await translateObject(value, targetLang, currentPath, stats);
    } else {
      // Keep non-string values as-is
      result[key] = value;
    }
  }

  return result;
}

/**
 * Translate to one language
 */
async function translateToLanguage(sourceContent, targetLang) {
  const stats = { total: 0, translated: 0 };
  console.log(`\n🌍 Translating EN → ${targetLang.toUpperCase()}...`);

  const translatedContent = await translateObject(sourceContent, targetLang, '', stats);

  console.log(`\n   ✅ Translated ${stats.translated} strings`);

  return translatedContent;
}

/**
 * Main function
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  SkillQuest Website Translation Tool      ║');
  console.log('║  EN → NL/DE/FR/ES/IT via DeepL API        ║');
  console.log('╚════════════════════════════════════════════╝\n');

  // Check API key
  if (!DEEPL_API_KEY) {
    console.error('❌ DEEPL_API_KEY environment variable not set!');
    console.error('\nSet it using:');
    console.error('  Windows: set DEEPL_API_KEY=your_key');
    console.error('  Unix:    export DEEPL_API_KEY=your_key');
    console.error('\nGet your free API key at: https://www.deepl.com/pro-api');
    process.exit(1);
  }

  const messagesDir = path.join(__dirname, '..', 'messages');
  const sourceFile = path.join(messagesDir, 'en.json');

  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Source file not found: ${sourceFile}`);
    process.exit(1);
  }

  console.log('📖 Reading source file: en.json');
  const sourceContent = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

  const startTime = Date.now();

  // Translate to each target language
  for (const targetLang of TARGET_LANGUAGES) {
    const targetFile = path.join(messagesDir, `${targetLang}.json`);

    try {
      const translatedContent = await translateToLanguage(sourceContent, targetLang);

      console.log(`   💾 Writing to ${targetLang}.json...`);
      fs.writeFileSync(targetFile, JSON.stringify(translatedContent, null, 2), 'utf-8');
      console.log(`   ✅ Done!`);

      // Wait 2 seconds between languages to avoid rate limiting
      if (targetLang !== TARGET_LANGUAGES[TARGET_LANGUAGES.length - 1]) {
        console.log(`   ⏳ Waiting 2s before next language...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`\n❌ Failed to translate to ${targetLang}: ${error.message}`);
    }
  }

  const duration = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n╔════════════════════════════════════════════╗`);
  console.log(`║  ✅ All translations complete!             ║`);
  console.log(`║  ⏱️  Duration: ${duration}s`.padEnd(45) + '║');
  console.log(`╚════════════════════════════════════════════╝\n`);
}

// Run the script
main().catch(error => {
  console.error('\n❌ Translation failed:', error.message);
  console.error(error.stack);
  process.exit(1);
});
