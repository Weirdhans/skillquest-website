# 🚀 Quick Start Guide - SkillQuest Family First Landing Page

**Je volledige landingpagina is klaar!** Hier is hoe je het lokaal test en deploy naar Vercel.

---

## ⚡ Stap 1: Lokaal Testen (2 minuten)

```bash
# Navigeer naar project
cd c:/Users/Hans/StudioProjects/SkillQuest/skillquest-website

# Start development server
npm run dev
```

Open browser: [http://localhost:3000](http://localhost:3000)

✅ Je zou nu de complete "Family First" landingpagina moeten zien!

---

## 📧 Stap 2: ConvertKit Setup (5 minuten)

### Waarom ConvertKit?
Voor email signups en het versturen van je gratis e-book.

### Setup:

1. **Account aanmaken**: Ga naar [convertkit.com](https://convertkit.com)
   - Free plan: Tot 1,000 subscribers gratis

2. **API Key ophalen**:
   - Settings → Advanced → API & Webhooks
   - Copy "API Secret"

3. **Form aanmaken**:
   - Forms → Create Form
   - Naam: "SkillQuest E-book Download"
   - Copy Form ID uit URL (bijv. `1234567`)

4. **Environment Variables**:
```bash
# Maak .env.local bestand in project root
CONVERTKIT_API_KEY=jouw_api_key_hier
CONVERTKIT_FORM_ID=jouw_form_id_hier
```

5. **Test Email Signup**:
   - Herstart dev server: `npm run dev`
   - Vul email in op landingpagina
   - Check ConvertKit dashboard → Subscribers

---

## 🚀 Stap 3: Deploy naar Vercel (10 minuten)

### Optie A: Via Vercel Dashboard (Makkelijkst!)

1. **Push naar GitHub**:
```bash
cd c:/Users/Hans/StudioProjects/SkillQuest/skillquest-website
git init
git add .
git commit -m "feat: SkillQuest Family First landing page"

# Maak nieuwe GitHub repo: skillquest-website
git remote add origin https://github.com/jouw-username/skillquest-website.git
git branch -M main
git push -u origin main
```

2. **Vercel Deployment**:
   - Ga naar [vercel.com/new](https://vercel.com/new)
   - Login met GitHub
   - Klik "Import Project"
   - Selecteer `skillquest-website` repository
   - Framework Preset: **Next.js** (auto-detected)
   - Klik "Deploy"

3. **Environment Variables in Vercel**:
   - In Vercel project dashboard
   - Settings → Environment Variables
   - Voeg toe:
     ```
     CONVERTKIT_API_KEY = jouw_api_key
     CONVERTKIT_FORM_ID = jouw_form_id
     ```
   - Klik "Save"
   - Redeploy: Deployments tab → ⋯ menu → "Redeploy"

4. **Custom Domain**:
   - Project Settings → Domains
   - Add Domain: `skill-quest.app`
   - Volg DNS instructies (update nameservers bij domain registrar)

✅ **Je landingpagina is nu live!**

---

## 📸 Stap 4: Screenshots Toevoegen (30 minuten)

De landingpagina heeft placeholder images. Vervang ze met echte screenshots:

### Screenshots Nodig:

1. **Hero Section**:
   - Maak screenshot van: Ouder-kind scenario (parent start timer voor child)
   - Plaats in: `public/images/hero-family.jpg`
   - Update: `HeroSection.tsx` → verwijder placeholder, voeg `<img>` toe

2. **How It Works** (4 screenshots):
   - `step-1-parent-start.jpg`
   - `step-2-child-focus.jpg`
   - `step-3-xp-level.jpg`
   - `step-4-parent-stats.jpg`
   - Plaats in: `public/images/`
   - Update: `HowItWorksSection.tsx`

3. **Features**:
   - `feature-family-mode.jpg`
   - `feature-gamification.jpg`
   - Plaats in: `public/images/`

### Screenshot Tips:
- Gebruik Android emulator of physical device
- Capture key screens van SkillQuest Flutter app
- Clean screenshots (geen personal data zichtbaar)
- Resize tot 1200x800 voor web optimalisatie

---

## 📝 Stap 5: E-book Maken (1-2 uur)

Maak een PDF e-book: **"10 Vaardigheden Die Elk Kind Zou Moeten Leren"**

### Inhoud Suggesties:
1. Introduction (waarom skills belangrijk zijn)
2. Skill 1: Critical Thinking
3. Skill 2: Digital Literacy (Coding)
4. Skill 3: Emotional Intelligence
5. Skill 4: Time Management
6. Skill 5: Creative Problem Solving
7. Skill 6: Financial Literacy
8. Skill 7: Communication Skills
9. Skill 8: Physical Fitness
10. Skill 9: Foreign Language
11. Skill 10: Mindfulness
12. Conclusion + SkillQuest CTA

### Tools:
- **Canva** (makkelijkst) - [canva.com/create/ebooks](https://canva.com/create/ebooks)
- **Google Docs** → Export as PDF
- **Figma** (voor designers)

### Upload:
```bash
# Plaats PDF in public directory
skillquest-website/public/downloads/10-skills-ebook.pdf
```

### ConvertKit Autoresponder:
1. ConvertKit → Automations → Create Automation
2. Trigger: "Subscribes to a form" → Select your form
3. Action: "Send email"
4. Email content:
```
Subject: Je gratis e-book is klaar! 📚

Hoi [first_name],

Bedankt voor je interesse in SkillQuest!

Hier is je gratis e-book: "10 Vaardigheden Die Elk Kind Zou Moeten Leren"

👉 Download: https://skill-quest.app/downloads/10-skills-ebook.pdf

Veel leesplezier!

- Het SkillQuest Team

P.S. Klaar om te beginnen? Start gratis: https://skill-quest.app
```

---

## 🎨 Stap 6: Kleuren Aanpassen (Optioneel)

Als je andere kleuren wilt dan Ocean Blue:

1. Edit `tailwind.config.js`:
```javascript
primary: {
  500: '#007AFF', // Verander naar jouw kleur
}
```

2. Herstart dev server: `npm run dev`

---

## 📊 Stap 7: Analytics Setup (Optioneel)

### Plausible Analytics (Privacy-friendly, GDPR compliant)

1. Account: [plausible.io](https://plausible.io)
2. Add website: `skill-quest.app`
3. Environment variable:
```bash
PLAUSIBLE_DOMAIN=skill-quest.app
```
4. Tracking script (already in `layout.tsx`)

### Google Analytics 4 (Optioneel)

Edit `src/app/layout.tsx` en voeg toe:
```typescript
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

---

## ✅ Pre-Launch Checklist

Voordat je live gaat:

- [ ] Lokaal getest (`npm run dev` werkt)
- [ ] Screenshots toegevoegd
- [ ] E-book PDF gemaakt en geüpload
- [ ] ConvertKit credentials geconfigureerd
- [ ] Email autoresponder werkt (test met je eigen email)
- [ ] Deployed naar Vercel
- [ ] Custom domain (skill-quest.app) gekoppeld
- [ ] Mobile responsive getest
- [ ] Email signup flow getest (eind-tot-eind)
- [ ] Privacy policy & Terms toegevoegd
- [ ] Analytics tracking werkt

---

## 🆘 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Email subscriptions niet werkend
1. Check `.env.local` heeft correcte credentials
2. Test API: `curl -X POST http://localhost:3000/api/subscribe -d '{"email":"test@test.com","variant":"family-first"}' -H "Content-Type: application/json"`
3. Check ConvertKit dashboard

### Build fails on Vercel
1. Check environment variables in Vercel dashboard
2. Check build logs voor specifieke errors
3. Test lokaal: `npm run build`

---

## 🎉 Volgende Stappen

Na launch:

1. **A/B Testing**: Test verschillende headlines/CTA's
2. **SEO**: Voeg blog toe met content marketing
3. **Paid Ads**: Facebook/Instagram ads naar landingpagina
4. **More Variants**: Implementeer "Student Success" of "Gamified Growth" concept
5. **Testimonials**: Voeg echte user testimonials toe

---

**Support**: Voor vragen, check de volledige [README.md](./README.md) of stuur email naar hans@zenithreborn.com

**Concept Docs**: Zie [LANDING_PAGE_CONCEPTS.md](../skillquest/docs/LANDING_PAGE_CONCEPTS.md) voor alle 10 varianten

---

**Succes met de launch! 🚀**
