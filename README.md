# SkillQuest Website

Marketing website voor SkillQuest - De ultieme skill-tracking app voor gezinnen.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Font**: Inter + Nunito (Google Fonts)
- **Deployment**: Vercel

## 🎨 Design System

### Branding Kleuren

**Primary (Ocean Blue):**
- `primary-500`: `#007AFF` - Main brand color

**Phoenix Fire Gradient (Zenith Reborn inspired):**
- `phoenix-fire`: `#D2381C` - Deep orange/red
- `phoenix-flame`: `#FF6B35` - Warm orange
- `phoenix-gold`: `#FFB627` - Gold/yellow
- `phoenix-ember`: `#8B2635` - Bordeaux accent
- `phoenix-shadow`: `#3D1F2E` - Deep purple

### CTA Buttons - Phoenix Fire Gradient

Alle primaire call-to-action buttons gebruiken de phoenix fire gradient voor maximum visual impact:

```css
.btn-primary {
  background: linear-gradient(135deg, #FF6B35 0%, #D2381C 100%);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #FF7E4A 0%, #E64A2E 100%);
  box-shadow: 0 8px 25px rgba(210, 56, 28, 0.4);
}
```

**Rationale**: De phoenix symboliseert groei en transformatie - perfect voor skill development. De vurige kleuren roepen actie op zonder de blauwe SkillQuest branding te overschaduwen.

### Utility Classes

```css
/* Phoenix gradients */
.bg-gradient-phoenix  /* Orange → Red gradient */
.bg-gradient-gold     /* Gold → Orange gradient */
.text-gradient-phoenix /* Phoenix gradient text */

/* Phoenix effects */
.phoenix-glow         /* Orange glow shadow */
.phoenix-glow-hover   /* Hover glow effect */
```

## 📂 Project Structure

```
skillquest-website/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── download/     # Download page
│   │   ├── pricing/      # Pricing page
│   │   └── features/     # Features page
│   ├── components/       # Reusable components
│   │   ├── Navbar.tsx    # Sticky navbar met glassmorphism
│   │   └── ...
│   └── styles/
│       └── globals.css   # Global styles + utilities
├── public/
│   └── skillquest-logo.png  # Official app logo
└── tailwind.config.js    # Tailwind configuration
```

## 🏃 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## ✨ Features

- **Duolingo-style sticky navbar** met scroll-triggered CTA button
- **Apple glassmorphism** navbar achtergrond
- **Phoenix fire gradients** op alle CTA buttons
- **Framer Motion** animations
- **Responsive design** - Mobile-first approach
- **SEO optimized** - Metadata, OpenGraph, Twitter cards

## 🎯 Key Components

### Navbar
- Sticky top navbar met glassmorphism effect
- Official SkillQuest logo (stopwatch met growth arrow)
- Scroll-triggered "Begin Gratis" button (verschijnt na 100px)
- Smooth animations met Framer Motion

### Hero Section
- Full-width gradient background (Ocean Blue)
- Phoenix fire CTA buttons
- App screenshot mockup
- Key features highlight

### Pricing Cards
- 4 tiers: Guest, Gratis, Premium, Family
- Phoenix fire "Bekijk" buttons
- Feature comparison lists

## 📱 Logo

Het officiële SkillQuest logo toont:
- 🕐 Stopwatch (time tracking)
- ⬆️ Upward arrow (skill growth)
- ✨ Sparkles (achievements)
- 🎨 Green-blue gradient (brand colors)

## 🔥 Phoenix Fire Integration

De phoenix kleuren komen van **Zenith Reborn** en symboliseren:
- 🔥 **Transformatie** - Van chaos naar controle
- ⚡ **Groei** - Skills ontwikkelen en levelen
- 🎯 **Urgentie** - Call-to-action energie

**Implementatie**:
- CTA buttons: Phoenix fire gradient
- Hover states: Intensified gradient + glow
- Future: Level badges, XP bars, achievement accents

## 📄 License

Copyright © 2025 SkillQuest. All rights reserved.
