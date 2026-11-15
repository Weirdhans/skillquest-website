// The privacy texts in messages/*.json were converted from Markdown one
// paragraph at a time, so three Markdown constructs survived as literal text
// inside a <p>: "### heading", a pipe table and a "---" rule. The page showed
// them as written, hashes and pipes included. This turns them into real HTML.
//
// Rule of thumb throughout: when a line is not exactly what we expect, leave
// it as it is. Odd-looking text on the page is visible and gets fixed; text
// that silently disappears from a privacy policy does not.
//
// The result carries no class names on purpose: it is rendered inside the
// page's `prose` block, which styles headings and tables, and Tailwind does
// not scan .mjs files in lib/, so a class written here could be purged.

// Only "###" and "####". The page title is the h1 and the section title the
// h2, so a "##" here would put a second h2 inside a section.
const HEADING = /^<p>(#{3,4}) (.+)<\/p>$/;
const RULE = /^<p>-{3,}<\/p>$/;
const ROW = /^<p>\|(.*)\|<\/p>$/;
const SEPARATOR_CELL = /^:?-+:?$/;

/**
 * Splits one table line into cells. A pipe inside a tag, for example in
 * `<a href="/x?a|b">`, is part of that tag and not a cell border.
 *
 * @param {string} row the text between the outer pipes
 * @returns {string[]}
 */
function cells(row) {
  const out = [];
  let cell = '';
  let inTag = false;

  for (const char of row) {
    if (char === '<') inTag = true;
    else if (char === '>') inTag = false;

    if (char === '|' && !inTag) {
      out.push(cell.trim());
      cell = '';
    } else {
      cell += char;
    }
  }

  out.push(cell.trim());
  return out;
}

/** @param {string[]} row */
function isSeparator(row) {
  return row.every((cell) => SEPARATOR_CELL.test(cell));
}

/** @param {string} value */
function escapeAttribute(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * @param {string[]} lines consecutive `<p>| a | b |</p>` lines
 * @param {string | undefined} label accessible name for the scrolling box
 * @returns {string | null} a table, or null when the lines are not one
 */
function renderTable(lines, label) {
  const rows = lines.map((line) => cells(/** @type {RegExpExecArray} */ (ROW.exec(line))[1]));

  // Exactly one table: a header, the separator line under it, then data rows,
  // all with the same number of cells. A second separator further down would
  // mean two tables run together or a data row made of dashes; we cannot tell
  // which, so that block is left alone too.
  if (rows.length < 3) return null;
  const [head, separator, ...body] = rows;
  const width = head.length;
  if (width < 2 || isSeparator(head) || !isSeparator(separator)) return null;
  if (rows.some((row) => row.length !== width)) return null;
  if (body.some(isSeparator)) return null;

  const th = head.map((cell) => `<th scope="col">${cell}</th>`).join('');
  const trs = body
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
    .join('\n');

  // Four columns do not fit a phone. The box scrolls sideways instead of
  // squeezing every cell to a few characters per line. With a name it is a
  // region a keyboard user can reach and scroll; without a name it stays a
  // plain box, because a focus stop that announces nothing helps no one.
  const region = label
    ? ` role="region" aria-label="${escapeAttribute(label)}" tabindex="0"`
    : '';

  return [
    `<div${region} style="overflow-x: auto;">`,
    '<table style="min-width: 34rem;">',
    `<thead><tr>${th}</tr></thead>`,
    '<tbody>',
    trs,
    '</tbody>',
    '</table>',
    '</div>',
  ].join('\n');
}

/**
 * Turns the Markdown leftovers in a privacy section into HTML.
 *
 * @param {string} html one section body: HTML fragments separated by newlines
 * @param {{tableLabel?: string}} [options] tableLabel names the scrolling box
 *   around a table for screen readers; the section title is a good value
 * @returns {string}
 */
export function normalizePrivacyHtml(html, options = {}) {
  const lines = html.split('\n');
  const out = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const heading = HEADING.exec(line);
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${heading[2]}</h${level}>`);
      continue;
    }

    if (RULE.test(line)) continue;

    if (ROW.test(line)) {
      let end = i;
      while (end < lines.length && ROW.test(lines[end])) end += 1;
      const block = lines.slice(i, end);
      out.push(renderTable(block, options.tableLabel) ?? block.join('\n'));
      i = end - 1;
      continue;
    }

    out.push(line);
  }

  return out.join('\n');
}
