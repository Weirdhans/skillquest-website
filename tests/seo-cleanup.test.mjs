import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import ts from 'typescript';
import nextConfig from '../next.config.js';

const legacyRoutes = [
  ['/en/app', '/en/download'],
  ['/nl/handleiding', '/nl/guides'],
  ['/es/faq', '/es/support#faq']
];

test('legacy redirects are permanent and limited to the three reviewed paths', async () => {
  const redirects = await nextConfig.redirects();
  assert.deepEqual(
    redirects.filter((redirect) => redirect.permanent),
    legacyRoutes.map(([source, destination]) => ({source, destination, permanent: true}))
  );
});

test('campaign short links stay temporary so their UTM targets can change', async () => {
  const shortLinks = (await nextConfig.redirects()).filter((redirect) => !redirect.permanent);
  assert.ok(shortLinks.length > 0);
  for (const redirect of shortLinks) {
    assert.match(redirect.source, /^\/[a-z-]+$/, `${redirect.source} is not a short link`);
  }
});

test('iOS universal links cover the app link /open/* next to the invite links', async () => {
  const file = await readFile(new URL('../public/.well-known/apple-app-site-association', import.meta.url), 'utf8');
  const paths = JSON.parse(file).applinks.details.flatMap((detail) => detail.paths);
  assert.ok(paths.includes('/open/*'));
  assert.ok(paths.includes('/invite/*'));
});

test('the /open route is exempt from the locale redirect and only points at the app host', async () => {
  const proxy = await readFile(new URL('../src/proxy.ts', import.meta.url), 'utf8');
  assert.match(proxy, /pathname\.startsWith\('\/open\/'\)/);
  const route = await readFile(new URL('../src/app/open/[[...path]]/route.ts', import.meta.url), 'utf8');
  assert.match(route, /const EXPLANATION_ORIGIN = 'https:\/\/app\.skill-quest\.app';/);
});

test('support page keeps a stable, visible FAQ anchor for legacy links', async () => {
  const source = await readFile(new URL('../src/app/[locale]/support/page.tsx', import.meta.url), 'utf8');
  assert.match(source, /<section id="faq"[^>]*>[\s\S]*?\{copy\.faqHeading\}/);
});

for (const file of ['feature-pages.ts', 'marketing.ts']) {
  test(`${file} does not expose editorial instructions in public copy`, async () => {
    const source = await readFile(new URL(`../src/lib/${file}`, import.meta.url), 'utf8');
    const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const editorialTerms = /release[- ]audits?|marketing|productmodellen|product models|Produktmodell|modèles produit|modelos de producto|modelli prodotto|Store- en release-informatie blijft|Store and release information is kept|Store- und Release-Informationen bleiben|informations de store et de release restent|información de tiendas y releases se mantiene|informazioni su store e release restano/i;

    function inspect(node) {
      // Comments and import paths are not visitor copy.
      if (ts.isImportDeclaration(node)) return;
      if (ts.isStringLiteralLike(node)) {
        assert.doesNotMatch(node.text, editorialTerms);
      }
      ts.forEachChild(node, inspect);
    }

    inspect(tree);
  });
}
