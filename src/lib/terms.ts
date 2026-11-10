// Terms of Service. Dutch (nl.json) is written by hand; English (en.json) is the
// source for the other languages, translated with scripts/translate-terms.py
// (DeepL) and then checked against the app glossary.
//
// Text may contain links written as <a href="...">label</a>. An address that
// starts with "/" is a page on this site, "#" is a section on this page.
import type {Locale} from '@/lib/marketing';
import de from '@/content/terms/de.json';
import en from '@/content/terms/en.json';
import es from '@/content/terms/es.json';
import fr from '@/content/terms/fr.json';
import it from '@/content/terms/it.json';
import nl from '@/content/terms/nl.json';

export type TermsListItem = {lead?: string; text: string};

export type TermsBlock =
  | {type: 'p'; text: string}
  | {type: 'ul'; items: TermsListItem[]};

export type TermsSection = {title: string; blocks: TermsBlock[]};

export type TermsCopy = {
  locale: string;
  // ISO date (YYYY-MM-DD) of the last change to the text.
  updated: string;
  lastUpdatedLabel: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  sections: TermsSection[];
};

export const termsCopy: Record<Locale, TermsCopy> = {
  nl: nl as TermsCopy,
  en: en as TermsCopy,
  de: de as TermsCopy,
  fr: fr as TermsCopy,
  es: es as TermsCopy,
  it: it as TermsCopy
};

export type TermsSegment =
  | {type: 'text'; value: string}
  | {type: 'link'; href: string; label: string};

// Splits a text into plain text and links. Everything that is not a link stays
// plain text, so the page never has to render HTML from the content files.
export function splitLinks(text: string): TermsSegment[] {
  const link = /<a href="([^"]+)">([^<]*)<\/a>/g;
  const segments: TermsSegment[] = [];
  let last = 0;
  let match = link.exec(text);
  while (match) {
    if (match.index > last) {
      segments.push({type: 'text', value: text.slice(last, match.index)});
    }
    segments.push({type: 'link', href: match[1], label: match[2]});
    last = match.index + match[0].length;
    match = link.exec(text);
  }
  if (last < text.length) {
    segments.push({type: 'text', value: text.slice(last)});
  }
  return segments;
}
