#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DeepL JSON Translator for SkillQuest Website
Translates messages/nl.json to EN, DE, FR, ES

Usage:
    python tools/deepl_translate_json.py en
    python tools/deepl_translate_json.py de
    python tools/deepl_translate_json.py fr
    python tools/deepl_translate_json.py es
"""

import os
import json
import sys
from typing import Dict, Any

# Fix Windows console encoding
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

try:
    import deepl
except ImportError:
    print("❌ Error: deepl package not found")
    print("Install it with: pip install deepl")
    sys.exit(1)

# Get DeepL API key from environment
DEEPL_API_KEY = os.getenv('DEEPL_API_KEY')
if not DEEPL_API_KEY:
    print("❌ Error: DEEPL_API_KEY environment variable not set")
    print("\nSet it with:")
    print("  export DEEPL_API_KEY='your-api-key-here'  # Linux/macOS")
    print("  $env:DEEPL_API_KEY='your-api-key-here'    # Windows PowerShell")
    sys.exit(1)

# Initialize DeepL translator
translator = deepl.Translator(DEEPL_API_KEY)


def translate_nested_dict(data: Dict[str, Any], target_lang: str, path: str = "") -> Dict[str, Any]:
    """
    Recursively translate all string values in nested dict.
    Preserves structure and non-string values.
    """
    result = {}

    for key, value in data.items():
        current_path = f"{path}.{key}" if path else key

        if isinstance(value, dict):
            # Recursively translate nested dict
            result[key] = translate_nested_dict(value, target_lang, current_path)
            print(f"  Translated section: {current_path}")

        elif isinstance(value, list):
            # Handle list items
            result[key] = []
            for item in value:
                if isinstance(item, dict):
                    result[key].append(translate_nested_dict(item, target_lang, current_path))
                elif isinstance(item, str):
                    translated = translator.translate_text(
                        item,
                        target_lang=target_lang,
                        preserve_formatting=True,
                        tag_handling='html'
                    )
                    result[key].append(translated.text)
                else:
                    result[key].append(item)

        elif isinstance(value, str):
            # Translate string value
            try:
                translated = translator.translate_text(
                    value,
                    target_lang=target_lang,
                    preserve_formatting=True,
                    tag_handling='html'
                )
                result[key] = translated.text
            except Exception as e:
                print(f"  ⚠️  Warning: Failed to translate '{current_path}': {e}")
                result[key] = value  # Keep original on error

        else:
            # Keep non-string values as-is (numbers, booleans, None)
            result[key] = value

    return result


def translate_json_file(source_path: str, target_path: str, target_lang: str, lang_name: str):
    """Translate JSON file from source to target language"""

    print(f"\n{'='*70}")
    print(f"SkillQuest Website Translation: Dutch → {lang_name}")
    print(f"{'='*70}")
    print(f"Source: {source_path}")
    print(f"Target: {target_path}")
    print(f"Language: {target_lang}")
    print()

    # Check if source file exists
    if not os.path.exists(source_path):
        print(f"❌ Error: Source file not found: {source_path}")
        sys.exit(1)

    # Load source JSON
    print("Loading source JSON...")
    try:
        with open(source_path, 'r', encoding='utf-8') as f:
            source_data = json.load(f)
        print(f"✓ Loaded {len(source_data)} top-level sections")
    except Exception as e:
        print(f"❌ Error loading source file: {e}")
        sys.exit(1)

    # Translate
    print(f"\nTranslating to {lang_name}...")
    try:
        translated_data = translate_nested_dict(source_data, target_lang)
        print("✓ Translation complete")
    except Exception as e:
        print(f"❌ Error during translation: {e}")
        sys.exit(1)

    # Save target JSON
    print(f"\nSaving to {target_path}...")
    try:
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)
        print("✓ File saved successfully")
    except Exception as e:
        print(f"❌ Error saving target file: {e}")
        sys.exit(1)

    # Validation
    print("\n" + "="*70)
    print("VALIDATION")
    print("="*70)

    try:
        # Count strings
        def count_strings(obj):
            count = 0
            if isinstance(obj, dict):
                for v in obj.values():
                    count += count_strings(v)
            elif isinstance(obj, list):
                for item in obj:
                    count += count_strings(item)
            elif isinstance(obj, str):
                count += 1
            return count

        source_count = count_strings(source_data)
        target_count = count_strings(translated_data)

        print(f"✓ Source strings: {source_count}")
        print(f"✓ Target strings: {target_count}")

        if source_count == target_count:
            print("✓ String counts match!")
        else:
            print(f"⚠️  Warning: String count mismatch ({source_count} vs {target_count})")

        # Check file size
        source_size = os.path.getsize(source_path)
        target_size = os.path.getsize(target_path)
        print(f"✓ Source size: {source_size:,} bytes")
        print(f"✓ Target size: {target_size:,} bytes")

    except Exception as e:
        print(f"⚠️  Warning: Validation check failed: {e}")

    print("\n" + "="*70)
    print(f"✅ TRANSLATION COMPLETE: {lang_name}")
    print("="*70)
    print()


def main():
    if len(sys.argv) < 2:
        print("Usage: python tools/deepl_translate_json.py <target_lang>")
        print("\nSupported languages:")
        print("  en  - English")
        print("  de  - German (Deutsch)")
        print("  fr  - French (Français)")
        print("  es  - Spanish (Español)")
        print("\nExample:")
        print("  python tools/deepl_translate_json.py en")
        sys.exit(1)

    target_input = sys.argv[1].lower()

    # Language mapping (DeepL codes and display names)
    lang_map = {
        'en': {'code': 'EN-US', 'name': 'English'},
        'de': {'code': 'DE', 'name': 'German'},
        'fr': {'code': 'FR', 'name': 'French'},
        'es': {'code': 'ES', 'name': 'Spanish'}
    }

    if target_input not in lang_map:
        print(f"❌ Error: Unsupported language '{target_input}'")
        print(f"\nSupported: {', '.join(lang_map.keys())}")
        sys.exit(1)

    target_lang = lang_map[target_input]['code']
    lang_name = lang_map[target_input]['name']

    source_file = 'messages/nl.json'
    target_file = f'messages/{target_input}.json'

    translate_json_file(source_file, target_file, target_lang, lang_name)


if __name__ == '__main__':
    main()
