// Copies chosen tips articles (by id) from a source branch into the tips JSON
// files of the current working tree, in all six languages. Used to put the
// stock on branch tips/stock-2026-12 live a few articles per week without
// merging the whole branch (the site does not filter on publishedAt).
//
// Usage (from the repository root, on a branch cut from origin/master):
//   node scripts/tips-release.mjs --list
//   node scripts/tips-release.mjs --ids child-practice-during-holidays
//   node scripts/tips-release.mjs --from tips/stock-2026-12 --ids a,b
//   node scripts/tips-release.mjs --check          (compare the result to the source)
//
// An id that is already in a file is replaced in place; a new id is appended
// after the existing articles, in the order of --ids. Only articles are
// touched: the "ui" block comes from the commit that changes it (see
// docs/TIPS.md).

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LOCALES = ["en", "nl", "de", "fr", "es", "it"];
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fileFor = (locale) => join(root, "src", "content", "tips", `${locale}.json`);

function parseArgs(argv) {
  const args = { from: "tips/stock-2026-12", ids: [], list: false, check: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--from") args.from = argv[++i];
    else if (arg === "--ids") args.ids = String(argv[++i] ?? "").split(",").map((id) => id.trim()).filter(Boolean);
    else if (arg === "--list") args.list = true;
    else if (arg === "--check") args.check = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function readSource(ref, locale) {
  const text = execFileSync("git", ["show", `${ref}:src/content/tips/${locale}.json`], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return JSON.parse(text);
}

function readLocal(locale) {
  const text = readFileSync(fileFor(locale), "utf8");
  return { data: JSON.parse(text), eol: text.includes("\r\n") ? "\r\n" : "\n" };
}

function write(locale, data, eol) {
  const text = `${JSON.stringify(data, null, 2)}\n`;
  writeFileSync(fileFor(locale), eol === "\r\n" ? text.replace(/\n/g, "\r\n") : text, "utf8");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const source = Object.fromEntries(LOCALES.map((locale) => [locale, readSource(args.from, locale)]));
  const sourceIds = source.en.articles.map((article) => article.id);

  if (args.list) {
    const local = new Set(readLocal("en").data.articles.map((article) => article.id));
    for (const article of source.en.articles) {
      console.log(`${article.publishedAt}  ${local.has(article.id) ? "live in this tree" : "not in this tree"}  ${article.id}`);
    }
    return;
  }

  if (args.check) {
    // The tree must hold the same articles as the source, ignoring the ui block.
    let problems = 0;
    for (const locale of LOCALES) {
      const local = readLocal(locale).data;
      const left = JSON.stringify(local.articles);
      const right = JSON.stringify(source[locale].articles);
      if (left !== right) {
        problems += 1;
        const localIds = new Set(local.articles.map((article) => article.id));
        const missing = source[locale].articles.filter((article) => !localIds.has(article.id)).map((article) => article.id);
        console.log(`${locale}: articles differ from ${args.from}${missing.length ? `; missing: ${missing.join(", ")}` : ""}`);
      }
    }
    console.log(problems ? `${problems} language(s) differ.` : `All articles match ${args.from}.`);
    process.exitCode = problems ? 1 : 0;
    return;
  }

  if (!args.ids.length) throw new Error("Give --ids <id,id> (or --list / --check).");
  const unknown = args.ids.filter((id) => !sourceIds.includes(id));
  if (unknown.length) throw new Error(`Not in ${args.from}: ${unknown.join(", ")}`);

  for (const locale of LOCALES) {
    const { data, eol } = readLocal(locale);
    const byId = new Map(source[locale].articles.map((article) => [article.id, article]));
    for (const id of args.ids) {
      const article = byId.get(id);
      if (!article) throw new Error(`${locale}: ${id} is missing in ${args.from}`);
      const index = data.articles.findIndex((existing) => existing.id === id);
      if (index === -1) data.articles.push(article);
      else data.articles[index] = article;
    }
    write(locale, data, eol);
    console.log(`${locale}: ${args.ids.length} article(s) written, ${data.articles.length} in total.`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
