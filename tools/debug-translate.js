/**
 * Debug script to see exact DeepL API responses
 */

const https = require('https');

const DEEPL_API_KEY = 'e9536b0f-909f-400e-8492-1ed622b74647:fx';

async function debugTranslate(text, targetLang) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      text: [text],
      source_lang: 'EN',
      target_lang: targetLang,
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

    console.log(`\n🧪 Testing EN → ${targetLang}`);
    console.log(`📝 Text: "${text}"`);
    console.log(`🔑 API Key: ${DEEPL_API_KEY.substring(0, 10)}...`);
    console.log(`🌐 Target: ${targetLang}`);
    console.log('\n⏳ Sending request...\n');

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`📊 Status Code: ${res.statusCode}`);
        console.log(`📄 Full Response Body:\n${body}\n`);

        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(body);
            console.log(`✅ Parsed Response:`);
            console.log(JSON.stringify(response, null, 2));

            if (response.translations && response.translations.length > 0) {
              console.log(`\n✅ Translation: "${response.translations[0].text}"`);
              resolve(response.translations[0].text);
            } else {
              console.log(`\n❌ No translations in response!`);
              resolve(null);
            }
          } catch (e) {
            console.error(`❌ JSON Parse Error: ${e.message}`);
            reject(e);
          }
        } else {
          console.error(`❌ API Error: ${res.statusCode}`);
          reject(new Error(`API returned ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request Error:`, error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Test multiple languages
async function runTests() {
  const testText = "Family Mode";
  const languages = ['NL', 'DE', 'FR', 'ES', 'IT'];

  console.log('╔════════════════════════════════════════════╗');
  console.log('║  DeepL API Debug Test                     ║');
  console.log('╚════════════════════════════════════════════╝');

  for (const lang of languages) {
    try {
      await debugTranslate(testText, lang);
      console.log('\n' + '─'.repeat(50) + '\n');

      // Wait 200ms between requests
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`\n❌ Failed for ${lang}: ${error.message}\n`);
    }
  }

  console.log('\n✅ All tests completed!');
}

runTests().catch(console.error);
