import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/MarketingPages.tsx', import.meta.url), 'utf8');
const tree = ts.createSourceFile('MarketingPages.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const tagName = (node) => ts.isJsxElement(node) ? node.openingElement.tagName.getText(tree) : '';

test('homepage hero title is not hidden inside a client entrance animation', () => {
  let titles = 0;
  function visit(node, ancestors = []) {
    if (tagName(node) === 'h1' && node.getText(tree).includes('copy.hero.title')) {
      titles++;
      assert.ok(!ancestors.some((ancestor) =>
        ['Stagger', 'StaggerItem', 'Reveal', 'motion.div'].includes(tagName(ancestor))
      ), 'critical heading must be visible before animation hydration');
    }
    ts.forEachChild(node, (child) => visit(child, [...ancestors, node]));
  }
  visit(tree);
  assert.equal(titles, 1);
});

test('trust items render li directly inside the list, not an animation wrapper', () => {
  let checked = false;
  function visit(node) {
    if (tagName(node) === 'ul' && node.getText(tree).includes('copy.trust.items.map')) {
      const expression = node.children.find((child) => ts.isJsxExpression(child))?.expression;
      assert.ok(expression && ts.isCallExpression(expression));
      const callback = expression.arguments[0];
      assert.ok(ts.isArrowFunction(callback));
      const body = ts.isParenthesizedExpression(callback.body) ? callback.body.expression : callback.body;
      assert.equal(tagName(body), 'li');
      checked = true;
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  assert.ok(checked, 'the trust list was checked');
});
