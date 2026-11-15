// The privacy texts in messages/*.json were converted from Markdown one
// paragraph at a time, so three Markdown constructs survived as literal text
// inside a <p>: "### heading", a pipe table and a "---" rule. The page showed
// them as written, hashes and pipes included. This turns them into real HTML.
//
// The result carries no class names on purpose: it is rendered inside the
// page's `prose` block, which styles headings and tables, and Tailwind does
// not scan .mjs files in lib/, so a class written here could be purged.

const HEADING = /^<p>(#{2,4}) (.+)<\/p>$/;
const RULE = /^<p>-{3,}<\/p>$/;
const ROW = /^<p>\|(.*)\|<\/p>$/;
const SEPARATOR_CELL = /^:?-+:?$/;

/** @param {string} row the text between the outer pipes of one table line */
function cells(row) {
  return row.split('|').map((cell) => cell.trim());
}

/**
 * @param {string[]} lines consecutive `<p>| a | b |</p>` lines
 * @returns {string | null} a table, or null when the lines are not one
 */
function renderTable(lines) {
  const rows = lines
    .map((line) => cells(/** @type {RegExpExecArray} */ (ROW.exec(line))[1]))
    .filter((row) => !row.every((cell) => SEPARATOR_CELL.test(cell)));

  // A header and at least one row, all with the same number of cells.
  // Anything else stays as it was: better odd-looking than wrong.
  if (rows.length < 2) return null;
  const width = rows[0].length;
  if (width < 2 || rows.some((row) => row.length !== width)) return null;

  const [head, ...body] = rows;
  const th = head.map((cell) => `<th scope="col">${cell}</th>`).join('');
  const trs = body
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
    .join('\n');

  // Four columns do not fit a phone. The wrapper scrolls sideways instead of
  // squeezing every cell to a few characters per line.
  return [
    '<div style="overflow-x: auto;">',
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
 * @returns {string}
 */
export function normalizePrivacyHtml(html) {
  const lines = html.split('\n');
  const out = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const heading = HEADING.exec(line);
    if (heading) {
      // The page title is the h1 and the section title the h2, so "###" is
      // already the right level.
      const level = heading[1].length;
      out.push(`<h${level}>${heading[2]}</h${level}>`);
      continue;
    }

    if (RULE.test(line)) continue;

    if (ROW.test(line)) {
      let end = i;
      while (end < lines.length && ROW.test(lines[end])) end += 1;
      const block = lines.slice(i, end);
      out.push(renderTable(block) ?? block.join('\n'));
      i = end - 1;
      continue;
    }

    out.push(line);
  }

  return out.join('\n');
}
