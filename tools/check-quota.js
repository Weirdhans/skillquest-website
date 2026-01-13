const https = require('https');

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || 'e9536b0f-909f-400e-8492-1ed622b74647:fx';

const options = {
  hostname: 'api-free.deepl.com',
  path: '/v2/usage',
  method: 'GET',
  headers: {
    'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);

    if (res.statusCode === 200) {
      const data = JSON.parse(body);
      console.log('\n📊 DeepL API Usage:');
      console.log(`   Used: ${data.character_count.toLocaleString()} characters`);
      console.log(`   Limit: ${data.character_limit.toLocaleString()} characters`);
      console.log(`   Remaining: ${(data.character_limit - data.character_count).toLocaleString()} characters`);
      console.log(`   Percentage used: ${((data.character_count / data.character_limit) * 100).toFixed(2)}%`);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.end();
