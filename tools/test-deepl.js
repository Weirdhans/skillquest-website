/**
 * Test DeepL API connection
 */

const https = require('https');

const DEEPL_API_KEY = 'e9536b0f-909f-400e-8492-1ed622b74647:fx';

async function testDeepL() {
  return new Promise((resolve, reject) => {
    const text = "Track Your Skills.";

    const data = JSON.stringify({
      text: [text],
      source_lang: 'EN',
      target_lang: 'NL',
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

    console.log('\n🧪 Testing DeepL API...');
    console.log(`📝 Original: "${text}"`);
    console.log(`🔑 API Key: ${DEEPL_API_KEY.substring(0, 10)}...`);
    console.log(`🌐 Endpoint: ${options.hostname}${options.path}`);
    console.log('\n⏳ Sending request...\n');

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`📊 Status Code: ${res.statusCode}`);
        console.log(`📄 Response Body: ${body.substring(0, 200)}\n`);

        if (res.statusCode === 200) {
          const response = JSON.parse(body);
          console.log(`✅ Translation successful!`);
          console.log(`📝 Translated: "${response.translations[0].text}"\n`);
          resolve(response.translations[0].text);
        } else {
          reject(new Error(`DeepL API error: ${res.statusCode} - ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error:`, error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

testDeepL()
  .then(() => {
    console.log('✅ Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  });
