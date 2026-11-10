#!/usr/bin/env python3
"""Translate the English Terms of Service (src/content/terms/en.json) with DeepL.

The Dutch text (nl.json) is written by hand and is not touched. English is the
source for German, French, Spanish and Italian. Links are written as
<a href="...">text</a>, which DeepL keeps with tag_handling=xml.

Usage:
    python scripts/translate-terms.py --env-file ../skillquest/.env.tools.local
    python scripts/translate-terms.py --targets de fr --force

A target file that already exists is overwritten only with --force, so a human
fix in a translation is never lost by accident. After a run, check the output
against the app's translation glossary
(docs/TRANSLATION_DECISIONS_GLOSSARY.md in the app repository); the check at
the end of this script covers the skill noun, formal address, the menu path
and the links.
"""

import argparse
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "src" / "content" / "terms"

TARGETS = {"de": "DE", "fr": "FR", "es": "ES", "it": "IT"}

CONTEXT = (
    "Terms of Service of SkillQuest, a skill-tracking app with a practice timer, "
    "XP, Premium subscriptions and a family feature. Plain, friendly legal text "
    "that addresses the reader as 'you'. Keep SkillQuest, XP, Premium, "
    "RevenueCat, Apple and Google unchanged."
)

SUFFIX = " | SkillQuest"
BATCH = 40

# Words the glossary forbids for the skill noun, and formal address.
FORBIDDEN = {
    "de": r"\b(Fertigkeit\w*|Geschicklichkeit|Kompetenz\w*|Sie|Ihr\w*|Ihnen)\b",
    "fr": r"\b(habilet\w*|aptitude\w*|vous|votre|vos|minuterie)\b",
    "es": r"\b(competencias?|usted\w*|desafíos?)\b",
    "it": r"\b(competenz\w*|capacità|Lei|Suo|Sua)\b",
}

# The menu path in the app (settings / profile_deleteAccount in the ARB files).
MENU_PATH = {
    "de": "Einstellungen > Konto löschen",
    "fr": "Paramètres > Supprimer le compte",
    "es": "Ajustes > Eliminar cuenta",
    "it": "Impostazioni > Elimina account",
}

# The family plan is "Familie / Famille / Familia / Famiglia" in the app.
FAMILY_WORD = {"de": "Familie", "fr": "Famille", "es": "Familia", "it": "Famiglia"}


def load_key(env_file):
    key = os.environ.get("DEEPL_API_KEY")
    if not key and env_file:
        for line in Path(env_file).read_text(encoding="utf-8").splitlines():
            if line.startswith("DEEPL_API_KEY="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not key:
        sys.exit("DEEPL_API_KEY is not set (use the environment or --env-file).")
    return key


def escape(text):
    return text.replace("&", "&amp;").replace(" > ", " &gt; ")


def unescape(text):
    return (
        text.replace("&gt;", ">")
        .replace("&quot;", '"')
        .replace("&#39;", "'")
        .replace("&amp;", "&")
    )


def translate(key, texts, target):
    host = "api-free.deepl.com" if key.endswith(":fx") else "api.deepl.com"
    out = []
    for start in range(0, len(texts), BATCH):
        body = {
            "text": [escape(t) for t in texts[start:start + BATCH]],
            "source_lang": "EN",
            "target_lang": TARGETS[target],
            "context": CONTEXT,
            "formality": "prefer_less",
            "tag_handling": "xml",
            "non_splitting_tags": ["a"],
            "model_type": "prefer_quality_optimized",
        }
        request = urllib.request.Request(
            f"https://{host}/v2/translate",
            data=json.dumps(body).encode("utf-8"),
            headers={
                "Authorization": f"DeepL-Auth-Key {key}",
                "Content-Type": "application/json",
            },
        )
        with urllib.request.urlopen(request, timeout=120) as response:
            result = json.load(response)
        out.extend(unescape(item["text"]) for item in result["translations"])
    return out


def strings_of(source):
    texts = [
        source["heading"],
        source["metaTitle"].removesuffix(SUFFIX),
        source["metaDescription"],
        source["lastUpdatedLabel"],
    ]
    for section in source["sections"]:
        texts.append(section["title"])
        for block in section["blocks"]:
            if block["type"] == "p":
                texts.append(block["text"])
            else:
                for item in block["items"]:
                    if "lead" in item:
                        texts.append(item["lead"])
                    texts.append(item["text"])
    return texts


def rebuild(source, texts, target):
    it = iter(texts)
    data = {"locale": target, "updated": source["updated"]}
    data["heading"] = next(it)
    data["metaTitle"] = next(it) + SUFFIX
    data["metaDescription"] = next(it)
    data["lastUpdatedLabel"] = next(it)
    data["sections"] = []
    for section in source["sections"]:
        out = {"title": next(it), "blocks": []}
        for block in section["blocks"]:
            if block["type"] == "p":
                out["blocks"].append({"type": "p", "text": next(it)})
            else:
                items = []
                for item in block["items"]:
                    new = {}
                    if "lead" in item:
                        new["lead"] = next(it)
                    new["text"] = next(it)
                    items.append(new)
                out["blocks"].append({"type": "ul", "items": items})
        data["sections"].append(out)
    return data


def check(source, data, target):
    problems = []
    pattern = re.compile(FORBIDDEN[target])
    new_texts = strings_of(data)
    src_texts = strings_of(source)
    for text in new_texts:
        for match in pattern.finditer(text):
            problems.append(f"{target}: '{match.group(0)}' in: {text[:90]}")
    if len(data["metaDescription"]) > 160:
        problems.append(
            f"{target}: metaDescription is {len(data['metaDescription'])} characters"
        )

    link = re.compile(r'<a href="([^"]+)">')
    for src, new in zip(src_texts, new_texts):
        if sorted(link.findall(src)) != sorted(link.findall(new)):
            problems.append(f"{target}: links differ: {src[:70]} -> {new[:90]}")
        if src.count("</a>") != new.count("</a>"):
            problems.append(f"{target}: closing tags differ: {new[:90]}")
        if "hello@skill-quest.app" in src and "hello@skill-quest.app" not in new:
            problems.append(f"{target}: email missing: {new[:90]}")
        if "42188670" in src and "42188670" not in new:
            problems.append(f"{target}: KvK number missing")
    joined = "\n".join(new_texts)
    if MENU_PATH[target] not in joined:
        problems.append(f"{target}: menu path '{MENU_PATH[target]}' not found")
    if FAMILY_WORD[target] not in joined:
        problems.append(f"{target}: expected the word '{FAMILY_WORD[target]}'")
    return problems


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--targets", nargs="+", default=list(TARGETS))
    parser.add_argument("--env-file")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    key = load_key(args.env_file)
    source = json.loads((CONTENT / "en.json").read_text(encoding="utf-8"))
    problems = []

    for target in args.targets:
        path = CONTENT / f"{target}.json"
        if path.exists() and not args.force:
            print(f"{target}: exists, skipped (use --force to retranslate)")
            data = json.loads(path.read_text(encoding="utf-8"))
        else:
            texts = translate(key, strings_of(source), target)
            data = rebuild(source, texts, target)
            path.write_text(
                json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
            )
            print(f"{target}: translated")
        problems.extend(check(source, data, target))

    if problems:
        print("\nCheck these before publishing:")
        for problem in problems:
            print(f"  {problem}")


if __name__ == "__main__":
    main()
