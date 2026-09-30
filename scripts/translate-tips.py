#!/usr/bin/env python3
"""Translate the Dutch tips (src/content/tips/nl.json) with DeepL.

Writing is done by a person or an AI writing tool, in Dutch; translating is
done by DeepL only. Articles that already exist in a target file (same id) are
kept, so a human fix in a translation is never overwritten. Use --force to
retranslate everything.

Usage:
    DEEPL_API_KEY=... python scripts/translate-tips.py
    python scripts/translate-tips.py --env-file ../skillquest/.env.tools.local
    python scripts/translate-tips.py --targets en de --force

After a run, check the output against the app's translation glossary
(docs/TRANSLATION_DECISIONS_GLOSSARY.md in the app repository); the check at
the end of this script covers the skill noun and formal address.
"""

import argparse
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "src" / "content" / "tips"

TARGETS = {
    "en": "EN-US",
    "de": "DE",
    "fr": "FR",
    "es": "ES",
    "it": "IT",
}

# DeepL has no formality setting for English.
INFORMAL = {"de", "fr", "es", "it"}

CONTEXT = (
    "An article on the website of SkillQuest, a skill-tracking app with a "
    "practice timer, XP and a family mode. Written by a father for other "
    "parents, in a warm, informal tone that addresses the reader as 'you'."
)

# Words the glossary forbids for the skill noun, and formal address.
FORBIDDEN = {
    "de": r"\b(Fertigkeit\w*|Geschicklichkeit|Kompetenz\w*|Sie|Ihr\w*|Ihnen)\b",
    "fr": r"\b(habilet\w*|aptitude\w*|vous|votre|vos|minuterie)\b",
    "es": r"\b(competencias?|usted\w*|desafíos?)\b",
    "it": r"\b(competenz\w*|capacità|Lei|Suo|Sua)\b",
    "en": r"$^",
}

SUFFIX = " | SkillQuest"


def load_key(env_file):
    key = os.environ.get("DEEPL_API_KEY")
    if not key and env_file:
        for line in Path(env_file).read_text(encoding="utf-8").splitlines():
            if line.startswith("DEEPL_API_KEY="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not key:
        sys.exit("DEEPL_API_KEY is not set (use the environment or --env-file).")
    return key


def translate(key, texts, target):
    host = "api-free.deepl.com" if key.endswith(":fx") else "api.deepl.com"
    body = {
        "text": texts,
        "source_lang": "NL",
        "target_lang": TARGETS[target],
        "context": CONTEXT,
        "preserve_formatting": True,
    }
    if target in INFORMAL:
        body["formality"] = "prefer_less"
    request = urllib.request.Request(
        f"https://{host}/v2/translate",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"DeepL-Auth-Key {key}",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        result = json.load(response)
    return [item["text"] for item in result["translations"]]


def strings_of_article(article):
    """Flatten the translatable fields in a fixed order."""
    texts = [
        article["eyebrow"],
        article["title"],
        article["metaTitle"].removesuffix(SUFFIX),
        article["metaDescription"],
        article["intro"],
        article["cardSummary"],
        article["app"]["title"],
        article["app"]["body"],
    ]
    for section in article["sections"]:
        texts.append(section["title"])
        texts.extend(section["paragraphs"])
    for item in article["faq"]:
        texts.extend([item["question"], item["answer"]])
    return texts


def rebuild_article(source, texts, target):
    it = iter(texts)
    article = {
        "id": source["id"],
        "slug": source["slugs"][target],
        "eyebrow": next(it),
        "title": next(it),
        "metaTitle": next(it) + SUFFIX,
        "metaDescription": next(it),
        "intro": next(it),
        "cardSummary": next(it),
        "publishedAt": source["publishedAt"],
        "readingMinutes": source["readingMinutes"],
    }
    article["app"] = {"title": next(it), "body": next(it)}
    article["sections"] = []
    for section in source["sections"]:
        title = next(it)
        paragraphs = [next(it) for _ in section["paragraphs"]]
        article["sections"].append({"title": title, "paragraphs": paragraphs})
    article["faq"] = [
        {"question": next(it), "answer": next(it)} for _ in source["faq"]
    ]
    return article


def translate_ui(key, ui, target):
    keys = [k for k in ui if k != "readingTime"]
    texts = [ui[k] for k in keys]
    # Translate a concrete example and put the placeholder back.
    texts.append(ui["readingTime"].replace("{minutes}", "4"))
    result = translate(key, texts, target)
    translated = dict(zip(keys, result[:-1]))
    translated["readingTime"] = result[-1].replace("4", "{minutes}", 1)
    return translated


def check(target, data):
    pattern = re.compile(FORBIDDEN[target])
    problems = []

    def walk(value, path):
        if isinstance(value, str):
            for match in pattern.finditer(value):
                problems.append(f"{target}: {path}: '{match.group(0)}' in: {value[:90]}")
        elif isinstance(value, dict):
            for k, v in value.items():
                walk(v, f"{path}.{k}")
        elif isinstance(value, list):
            for i, v in enumerate(value):
                walk(v, f"{path}[{i}]")

    walk(data, target)
    for article in data["articles"]:
        if len(article["metaDescription"]) > 160:
            problems.append(
                f"{target}: {article['id']}: metaDescription is "
                f"{len(article['metaDescription'])} characters"
            )
    return problems


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--targets", nargs="+", default=list(TARGETS))
    parser.add_argument("--env-file")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    key = load_key(args.env_file)
    source = json.loads((CONTENT / "nl.json").read_text(encoding="utf-8"))
    problems = []

    for target in args.targets:
        path = CONTENT / f"{target}.json"
        existing = (
            json.loads(path.read_text(encoding="utf-8"))
            if path.exists() and not args.force
            else {"articles": []}
        )
        done = {article["id"] for article in existing["articles"]}

        ui = existing.get("ui") or translate_ui(key, source["ui"], target)
        articles = list(existing["articles"])
        for article in source["articles"]:
            if article["id"] in done:
                continue
            texts = translate(key, strings_of_article(article), target)
            articles.append(rebuild_article(article, texts, target))
            print(f"{target}: translated {article['id']}")

        data = {"ui": ui, "articles": articles}
        path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        problems.extend(check(target, data))

    if problems:
        print("\nCheck these against the glossary before publishing:")
        for problem in problems:
            print(f"  {problem}")


if __name__ == "__main__":
    main()
