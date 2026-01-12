#!/usr/bin/env python3
"""
Convert privacy policy markdown files to JSON format for next-intl
"""

import json
import re
from pathlib import Path

def parse_markdown_to_sections(md_content):
    """Parse markdown content into structured sections"""

    # Extract last updated date
    date_match = re.search(r'\*\*([^:]+):\*\* (.+)', md_content)
    last_updated_label = date_match.group(1) if date_match else "Last updated"
    last_updated_date = date_match.group(2) if date_match else "January 12, 2026"

    # Split by ## headers (main sections)
    sections = {}
    current_section = None
    current_content = []

    lines = md_content.split('\n')

    for line in lines:
        # Skip the H1 title and date line
        if line.startswith('# ') or line.startswith('**'):
            continue

        # Main section header (##)
        if line.startswith('## '):
            # Save previous section
            if current_section:
                sections[current_section] = '\n'.join(current_content).strip()

            # Start new section
            header_match = re.match(r'## \d+\.\s*(.+)', line)
            if header_match:
                current_section = header_match.group(1)
                current_content = []
        else:
            # Add content to current section
            if current_section:
                current_content.append(line)

    # Save last section
    if current_section:
        sections[current_section] = '\n'.join(current_content).strip()

    return last_updated_label, last_updated_date, sections

def section_title_to_key(title):
    """Convert section title to camelCase key"""
    # Remove special characters and split
    clean = re.sub(r'[^a-zA-Z\s]', '', title)
    words = clean.split()

    if not words:
        return "section"

    # First word lowercase, rest capitalized
    return words[0].lower() + ''.join(w.capitalize() for w in words[1:])

def convert_markdown_file(md_file_path, locale):
    """Convert a markdown privacy policy file to JSON format"""

    with open(md_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    last_updated_label, last_updated_date, sections = parse_markdown_to_sections(content)

    # Build JSON structure
    privacy_json = {
        "meta": {
            "title": f"Privacy Policy - SkillQuest",
            "description": "How SkillQuest protects your data and respects your privacy. GDPR compliant privacy policy."
        },
        "heading": "Privacy Policy",
        "lastUpdatedLabel": last_updated_label,
        "lastUpdated": last_updated_date,
        "sections": {}
    }

    # Locale-specific titles
    if locale == 'nl':
        privacy_json["meta"]["title"] = "Privacybeleid - SkillQuest"
        privacy_json["meta"]["description"] = "Hoe SkillQuest jouw data beschermt en jouw privacy respecteert. AVG-compliant privacybeleid."
        privacy_json["heading"] = "Privacybeleid"
    elif locale == 'de':
        privacy_json["meta"]["title"] = "Datenschutzrichtlinie - SkillQuest"
        privacy_json["meta"]["description"] = "Wie SkillQuest Ihre Daten schützt und Ihre Privatsphäre respektiert. DSGVO-konforme Datenschutzrichtlinie."
        privacy_json["heading"] = "Datenschutzrichtlinie"
    elif locale == 'fr':
        privacy_json["meta"]["title"] = "Politique de Confidentialité - SkillQuest"
        privacy_json["meta"]["description"] = "Comment SkillQuest protège vos données et respecte votre vie privée. Politique de confidentialité conforme au RGPD."
        privacy_json["heading"] = "Politique de Confidentialité"
    elif locale == 'es':
        privacy_json["meta"]["title"] = "Política de Privacidad - SkillQuest"
        privacy_json["meta"]["description"] = "Cómo SkillQuest protege tus datos y respeta tu privacidad. Política de privacidad conforme al RGPD."
        privacy_json["heading"] = "Política de Privacidad"
    elif locale == 'it':
        privacy_json["meta"]["title"] = "Informativa sulla Privacy - SkillQuest"
        privacy_json["meta"]["description"] = "Come SkillQuest protegge i tuoi dati e rispetta la tua privacy. Informativa sulla privacy conforme al GDPR."
        privacy_json["heading"] = "Informativa sulla Privacy"

    # Convert sections to JSON
    for title, content in sections.items():
        key = section_title_to_key(title)

        # Convert markdown to HTML for proper rendering
        # Simple conversions - could use markdown library for more complex cases
        html_content = content

        # Bold (**text**)
        html_content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', html_content)

        # Italic (*text* or _text_)
        html_content = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', html_content)
        html_content = re.sub(r'_([^_]+)_', r'<em>\1</em>', html_content)

        # Convert lists
        lines = html_content.split('\n')
        processed_lines = []
        in_list = False

        for line in lines:
            if line.strip().startswith('- ') or line.strip().startswith('* '):
                if not in_list:
                    processed_lines.append('<ul>')
                    in_list = True
                item = line.strip()[2:]  # Remove '- ' or '* '
                processed_lines.append(f'<li>{item}</li>')
            else:
                if in_list:
                    processed_lines.append('</ul>')
                    in_list = False
                if line.strip():
                    processed_lines.append(f'<p>{line.strip()}</p>')

        if in_list:
            processed_lines.append('</ul>')

        html_content = '\n'.join(processed_lines)

        # Remove empty paragraphs
        html_content = re.sub(r'<p>\s*</p>', '', html_content)

        privacy_json["sections"][key] = {
            "title": title,
            "content": html_content
        }

    return privacy_json

def main():
    """Main conversion function"""
    tools_dir = Path(__file__).parent

    locales = {
        'nl': 'privacy-master-nl.md',
        'en': 'privacy-en.md',
        'de': 'privacy-de.md',
        'fr': 'privacy-fr.md',
        'es': 'privacy-es.md',
        'it': 'privacy-it.md'
    }

    for locale, filename in locales.items():
        md_file = tools_dir / filename

        if not md_file.exists():
            print(f"Warning: {filename} not found, skipping...")
            continue

        print(f"Converting {filename} for locale '{locale}'...")

        try:
            privacy_json = convert_markdown_file(md_file, locale)

            # Save to output file
            output_file = tools_dir / f'privacy-{locale}.json'
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump({"privacy": privacy_json}, f, ensure_ascii=False, indent=2)

            print(f"  [OK] Created {output_file.name}")

        except Exception as e:
            print(f"  [ERROR] Error processing {filename}: {e}")

    print("\nConversion complete!")

if __name__ == '__main__':
    main()
