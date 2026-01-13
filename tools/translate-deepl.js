/**
 * DeepL Translation Script for SkillQuest Website
 *
 * Translates JSON message files using DeepL API
 * Usage: node tools/translate-deepl.js <source-lang> <target-lang>
 * Example: node tools/translate-deepl.js en nl
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// DeepL API configuration
const DEEPL_API_KEY = process.env.DEEPL_API_KEY || 'your_api_key_here';
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

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
 * Translate text using DeepL API
 */
async function translateText(text, sourceLang, targetLang) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      text: [text],
      source_lang: LANG_MAP[sourceLang],
      target_lang: LANG_MAP[targetLang],
      formality: 'default',
      preserve_formatting: true
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
          const response = JSON.parse(body);
          resolve(response.translations[0].text);
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
async function translateObject(obj, sourceLang, targetLang, path = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === 'string') {
      // Translate string value
      try {
        console.log(`Translating: ${currentPath}`);
        result[key] = await translateText(value, sourceLang, targetLang);

        // Rate limiting: wait 100ms between requests (DeepL free tier allows 500k chars/month)
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error translating ${currentPath}: ${error.message}`);
        result[key] = value; // Keep original on error
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursively translate nested objects
      result[key] = await translateObject(value, sourceLang, targetLang, currentPath);
    } else {
      // Keep non-string values as-is
      result[key] = value;
    }
  }

  return result;
}

/**
 * Main translation function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: node translate-deepl.js <source-lang> <target-lang>');
    console.error('Example: node translate-deepl.js en nl');
    console.error('Supported languages: en, nl, de, fr, es, it');
    process.exit(1);
  }

  const [sourceLang, targetLang] = args;

  if (!LANG_MAP[sourceLang] || !LANG_MAP[targetLang]) {
    console.error(`Invalid language code. Supported: ${Object.keys(LANG_MAP).join(', ')}`);
    process.exit(1);
  }

  if (DEEPL_API_KEY === 'your_api_key_here') {
    console.error('❌ DEEPL_API_KEY environment variable not set!');
    console.error('Set it using: set DEEPL_API_KEY=your_key (Windows) or export DEEPL_API_KEY=your_key (Unix)');
    process.exit(1);
  }

  const messagesDir = path.join(__dirname, '..', 'messages');
  const sourceFile = path.join(messagesDir, `${sourceLang}.json`);
  const targetFile = path.join(messagesDir, `${targetLang}.json`);

  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Source file not found: ${sourceFile}`);
    process.exit(1);
  }

  console.log(`\n📖 Reading source file: ${sourceLang}.json`);
  const sourceContent = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

  console.log(`🌍 Translating ${sourceLang.toUpperCase()} → ${targetLang.toUpperCase()} using DeepL API...`);
  console.log(`⏳ This may take a few minutes...\n`);

  const translatedContent = await translateObject(sourceContent, sourceLang, targetLang);

  console.log(`\n💾 Writing translation to: ${targetLang}.json`);
  fs.writeFileSync(targetFile, JSON.stringify(translatedContent, null, 2), 'utf-8');

  console.log(`\n✅ Translation complete!`);
  console.log(`📄 Output: ${targetFile}`);
}

// Run the script
main().catch(error => {
  console.error('❌ Translation failed:', error.message);
  process.exit(1);
});
