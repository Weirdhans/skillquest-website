/**
 * Check for untranslated strings in translation files
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');
const enFile = path.join(messagesDir, 'en.json');

// Load English source
const en = JSON.parse(fs.readFileSync(enFile, 'utf-8'));

function findUntranslated(enObj, targetObj, currentPath = '') {
  const untranslated = [];

  for (const [key, value] of Object.entries(enObj)) {
    const fullPath = currentPath ? `${currentPath}.${key}` : key;

    if (typeof value === 'string') {
      // Check if target has same English value
      if (targetObj && targetObj[key] === value) {
        untranslated.push({ path: fullPath, value });
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recurse into nested objects
      const nestedUntranslated = findUntranslated(
        value,
        targetObj ? targetObj[key] : {},
        fullPath
      );
      untranslated.push(...nestedUntranslated);
    }
  }

  return untranslated;
}

// Check each target language
const languages = ['nl', 'de', 'fr', 'es', 'it'];

console.log('\n📋 Checking for untranslated strings...\n');

languages.forEach(lang => {
  const targetFile = path.join(messagesDir, `${lang}.json`);
  const target = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));

  const untranslated = findUntranslated(en, target);

  console.log(`${lang.toUpperCase()}: ${untranslated.length} untranslated strings`);

  if (untranslated.length > 0) {
    untranslated.forEach(item => {
      console.log(`   ❌ ${item.path}: "${item.value.substring(0, 50)}..."`);
    });
  }
  console.log('');
});

console.log('✅ Check complete!\n');
