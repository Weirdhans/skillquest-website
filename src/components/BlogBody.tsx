import type {ReactNode} from 'react';
import {Link} from '@/i18n/routing';
import {resolveBlogHref} from '@/lib/blog';
import type {Locale} from '@/lib/marketing';

// Renders the small Markdown subset the blog articles use: ## headings,
// paragraphs, ordered and unordered lists, tables, **bold**, *italic* and
// [links](/xx/path). No HTML passes through, text is always escaped by React.
// Links to blog articles or tips that are not public yet render as plain text.

const INLINE = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string, locale: Locale, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of Array.from(text.matchAll(INLINE))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${index++}`;
    if (match[1] !== undefined) {
      nodes.push(<strong key={key}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={key}>{match[2]}</em>);
    } else {
      const label = match[3];
      const href = match[4];
      const target = resolveBlogHref(locale, href);
      if (target === null) {
        nodes.push(label);
      } else if (/^https?:\/\//.test(target)) {
        nodes.push(
          <a key={key} href={target} rel="noopener" className="font-semibold underline">
            {label}
          </a>
        );
      } else {
        nodes.push(
          <Link key={key} href={target} className="font-semibold underline">
            {label}
          </Link>
        );
      }
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function splitRow(line: string): string[] {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

type Block =
  | {type: 'h2'; text: string}
  | {type: 'p'; text: string}
  | {type: 'ol' | 'ul'; items: string[]}
  | {type: 'table'; head: string[]; rows: string[][]};

function parseBlocks(markdown: string): Block[] {
  return markdown
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      const lines = chunk.split('\n');
      if (/^## /.test(chunk)) return {type: 'h2', text: chunk.replace(/^## /, '')};
      if (lines.length >= 2 && lines[0].startsWith('|') && /^\|?[\s:|-]+\|?$/.test(lines[1])) {
        return {type: 'table', head: splitRow(lines[0]), rows: lines.slice(2).map(splitRow)};
      }
      if (lines.every((line) => /^\d+\. /.test(line))) {
        return {type: 'ol', items: lines.map((line) => line.replace(/^\d+\. /, ''))};
      }
      if (lines.every((line) => /^[-*] /.test(line))) {
        return {type: 'ul', items: lines.map((line) => line.replace(/^[-*] /, ''))};
      }
      return {type: 'p', text: lines.join(' ')};
    });
}

export default function BlogBody({markdown, locale}: {markdown: string; locale: Locale}) {
  return (
    <>
      {parseBlocks(markdown).map((block, i) => {
        const key = `b${i}`;
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={key} className="mt-12 font-display text-subsection theme-title">
                {block.text}
              </h2>
            );
          case 'ol':
          case 'ul': {
            const List = block.type;
            return (
              <List
                key={key}
                className={`mt-4 space-y-3 pl-6 text-lg leading-relaxed theme-copy ${block.type === 'ol' ? 'list-decimal' : 'list-disc'}`}
              >
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, locale, `${key}-${j}`)}</li>
                ))}
              </List>
            );
          }
          case 'table':
            return (
              <div key={key} className="mt-6 overflow-x-auto rounded-xl border" style={{borderColor: 'var(--sq-border)'}}>
                <table className="w-full min-w-[32rem] border-collapse text-left text-sm leading-relaxed theme-copy">
                  <thead>
                    <tr>
                      {block.head.map((cell, j) => (
                        <th
                          key={`${key}-h${j}`}
                          scope="col"
                          className="border-b px-4 py-3 font-semibold theme-title"
                          style={{borderColor: 'var(--sq-border)'}}
                        >
                          {renderInline(cell, locale, `${key}-h${j}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={`${key}-r${r}`}>
                        {row.map((cell, c) => (
                          <td
                            key={`${key}-r${r}c${c}`}
                            className="border-t px-4 py-3 align-top"
                            style={{borderColor: 'var(--sq-border)'}}
                          >
                            {renderInline(cell, locale, `${key}-r${r}c${c}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return (
              <p key={key} className="mt-4 text-lg leading-relaxed theme-copy">
                {renderInline(block.text, locale, key)}
              </p>
            );
        }
      })}
    </>
  );
}
