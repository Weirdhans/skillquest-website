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
  assert.deepEqual(
    await nextConfig.redirects(),
    legacyRoutes.map(([source, destination]) => ({source, destination, permanent: true}))
  );
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
