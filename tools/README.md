# Translation Tools

Scripts voor het vertalen van message files met DeepL API.

## 📋 Overzicht

Dit project gebruikt **Engels als master language** met professionele, marketing-geoptimaliseerde content. Alle andere talen worden automatisch vertaald via DeepL API.

**Supported languages:**
- 🇳🇱 Dutch (nl)
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇮🇹 Italian (it)

## 🚀 Quick Start

### 1. DeepL API Key krijgen

1. Ga naar [https://www.deepl.com/pro-api](https://www.deepl.com/pro-api)
2. Maak een gratis account (500.000 characters/maand gratis)
3. Kopieer je API key

### 2. API Key instellen

**Windows:**
```cmd
set DEEPL_API_KEY=your_api_key_here
```

**Unix/Linux/macOS:**
```bash
export DEEPL_API_KEY=your_api_key_here
```

**Permanent (Windows):**
```cmd
setx DEEPL_API_KEY "your_api_key_here"
```

### 3. Alle talen vertalen

```bash
node tools/translate-all.js
```

Dit vertaalt `en.json` naar alle andere talen (nl, de, fr, es, it) in één keer.

## 📝 Scripts

### `translate-all.js`

Vertaalt Engels naar ALLE andere talen tegelijk.

**Gebruik:**
```bash
node tools/translate-all.js
```

**Output:**
```
╔════════════════════════════════════════════╗
║  SkillQuest Website Translation Tool      ║
║  EN → NL/DE/FR/ES/IT via DeepL API        ║
╚════════════════════════════════════════════╝

📖 Reading source file: en.json

🌍 Translating EN → NL...
   [152/152] waitlist.privacy
   ✅ Translated 152 strings
   💾 Writing to nl.json...
   ✅ Done!

🌍 Translating EN → DE...
   [152/152] waitlist.privacy
   ✅ Translated 152 strings
   💾 Writing to de.json...
   ✅ Done!

...

╔════════════════════════════════════════════╗
║  ✅ All translations complete!             ║
║  ⏱️  Duration: 245s                        ║
╚════════════════════════════════════════════╝
```

### `translate-deepl.js`

Vertaalt één specifieke taal.

**Gebruik:**
```bash
node tools/translate-deepl.js <source-lang> <target-lang>
```

**Voorbeelden:**
```bash
# Engels naar Nederlands
node tools/translate-deepl.js en nl

# Engels naar Duits
node tools/translate-deepl.js en de

# Frans naar Spaans (als je Frans als bron wilt)
node tools/translate-deepl.js fr es
```

## 🎯 Workflow

### Bij nieuwe features of content updates:

1. **Update Engels eerst:**
   ```bash
   # Edit messages/en.json
   code messages/en.json
   ```

2. **Run batch translation:**
   ```bash
   node tools/translate-all.js
   ```

3. **Verify translations:**
   ```bash
   # Check output files
   git diff messages/
   ```

4. **Commit alle wijzigingen:**
   ```bash
   git add messages/*.json
   git commit -m "feat: update translations for [feature name]"
   ```

### Bij hotfixes in specifieke taal:

```bash
# Fix alleen Nederlands
node tools/translate-deepl.js en nl

# Fix alleen Duits
node tools/translate-deepl.js en de
```

## 🔧 Technische Details

### Rate Limiting

Scripts gebruiken 150ms delay tussen requests om binnen DeepL free tier limits te blijven:
- **Free tier:** 500.000 characters/maand
- **Rate:** ~6-7 requests per seconde
- **Typical run:** ~3-5 minuten voor alle 5 talen

### Error Handling

- Bij API errors wordt de originele tekst behouden
- Errors worden gelogd maar stoppen het proces niet
- Partial translations worden correct opgeslagen

### Preserveren van Formatting

DeepL API krijgt instructie om formatting te behouden:
- ✅ Emojis blijven intact (✨ 🔥 📊)
- ✅ Placeholders blijven intact ({count}, {days}, {year})
- ✅ HTML/markdown wordt gerespecteerd
- ✅ Line breaks worden behouden

## 📊 Translation Stats

**Current coverage:**
- English (en): 280 lines - **Master language** ✅
- Dutch (nl): Auto-translated via DeepL
- German (de): Auto-translated via DeepL
- French (fr): Auto-translated via DeepL
- Spanish (es): Auto-translated via DeepL
- Italian (it): Auto-translated via DeepL

**Total strings:** ~152 per language (kan variëren per nested keys)

## 🐛 Troubleshooting

### "DEEPL_API_KEY not set"

**Problem:** Environment variable niet gevonden

**Solution:**
```bash
# Check if set
echo %DEEPL_API_KEY%  # Windows
echo $DEEPL_API_KEY   # Unix

# Set it
set DEEPL_API_KEY=your_key  # Windows
export DEEPL_API_KEY=your_key  # Unix
```

### "DeepL API error: 403"

**Problem:** Invalid API key

**Solution:** Verifieer je API key op [DeepL website](https://www.deepl.com/account/summary)

### "DeepL API error: 456"

**Problem:** Quota exceeded (>500k chars/month)

**Solution:**
- Wacht tot volgende maand
- Of upgrade naar DeepL Pro
- Of gebruik `translate-deepl.js` voor specifieke talen

### Translation output looks weird

**Problem:** Mogelijk DeepL formality/context issues

**Solution:**
1. Check originele EN tekst - is die duidelijk?
2. Manual fix in target language file
3. Voor future runs: update EN source voor betere context

## 💡 Best Practices

1. **Engels is de master** - Wijzig ALTIJD eerst `en.json`
2. **Batch translations** - Gebruik `translate-all.js` voor consistency
3. **Manual review** - Check vooral marketing copy voor nuance
4. **Placeholders** - Verifieer dat `{variables}` intact blijven
5. **Emojis** - Check of emojis cultural-appropriate zijn per regio

## 🔗 Resources

- [DeepL API Docs](https://www.deepl.com/docs-api)
- [DeepL Supported Languages](https://www.deepl.com/docs-api/translating-text/)
- [Next-intl Documentation](https://next-intl-docs.vercel.app/)
- [SkillQuest i18n Guide](../src/i18n/README.md)

---

## 📄 Privacy Policy Tools

### Overview

Scripts and content for managing GDPR-compliant privacy policy in 6 languages.

### Files

**Source Content:**

- `privacy-master-nl.md` - Dutch master privacy policy
- `privacy-{locale}.md` - Translated versions (en, de, fr, es, it)

**Generated JSON:**

- `privacy-{locale}.json` - Structured JSON for next-intl (6 files)

**Scripts:**

- `convert-privacy-to-json.py` - Markdown to JSON converter

### Usage

#### Update Privacy Policy

1. Edit Dutch master:

   ```bash
   vim privacy-master-nl.md
   ```

2. Translate via Gemini CLI:

   ```bash
   gemini -y "Translate to English. Maintain GDPR terminology..." > privacy-en.md
   ```

3. Convert to JSON:

   ```bash
   python convert-privacy-to-json.py
   ```

4. Merge into messages:

   ```bash
   # See conversion script for merge command
   ```

5. Test:

   ```bash
   npm run build
   npm run dev
   # Visit /nl/privacy, /en/privacy, etc.
   ```

### Documentation

Full privacy policy implementation docs: `../docs/PRIVACY_POLICY_IMPLEMENTATION.md`

---

**Last updated:** 2026-01-12
**Maintained by:** SkillQuest Team
