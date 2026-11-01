// Carousel slides for the tips: one cover, one slide per section and a closing
// slide, built only from the article text. Plain .mjs so tests/tips.test.mjs can
// import it without a TypeScript build.
//
// A slide shows the section title and the first sentence of the section, unless
// that sentence is personal: the articles tell a story here and there ("my son
// had to read for 10 minutes"), and the social accounts do not. Then the slide
// shows the title alone. Nothing is rewritten or shortened.

export const SLIDE_WIDTH = 1080;
export const SLIDE_HEIGHT = 1350;
export const SLIDE_LOCALES = ['en'];
export const MAX_BODY_LENGTH = 200;

// Lower-case words that mark a personal sentence (the founder's story, or any
// sentence about one particular child). 'I' is compared in upper case
// so the Italian article 'i' is not caught.
const FIRST_PERSON = {
  en: ['my', 'me', 'mine', 'our', 'ours', 'we', 'us', 'son', 'daughter', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'i']
};

export function isFirstPerson(sentence, locale = 'en') {
  const words = FIRST_PERSON[locale] ?? FIRST_PERSON.en;
  const tokens = sentence.match(/[\p{L}]+(?:[’'][\p{L}]+)?/gu) ?? [];
  return tokens.some((token) => {
    const base = token.split(/[’']/)[0];
    return words.includes(base.toLowerCase()) && (base.toLowerCase() !== 'i' || base === 'I');
  });
}

export function sentences(text) {
  return text.match(/[^.!?…]+[.!?…]+["”’)]*(?=\s|$)|[^.!?…]+$/gu)?.map((s) => s.trim()).filter(Boolean) ?? [];
}

export function stripNumber(title) {
  return title.replace(/^\d+\.\s*/, '');
}

export function slideBody(section, locale = 'en') {
  const first = sentences(section.paragraphs[0] ?? '')[0] ?? '';
  return first && first.length <= MAX_BODY_LENGTH && !isFirstPerson(first, locale) ? first : '';
}

/** All slides of an article, in order. */
export function tipSlides(tip) {
  const total = tip.sections.length + 2;
  return [
    {kind: 'cover', n: 1, total, title: tip.title, body: tip.cardSummary},
    ...tip.sections.map((section, index) => ({
      kind: 'tip',
      n: index + 2,
      total,
      number: index + 1,
      title: stripNumber(section.title),
      body: slideBody(section, tip.locale)
    })),
    {kind: 'closing', n: total, total, title: '', body: ''}
  ];
}

export function slideCount(tip) {
  return tip.sections.length + 2;
}
