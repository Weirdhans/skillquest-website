// Newsletter email copy + HTML rendering, used by the Next.js API routes
// (src/app/api/subscribe and src/app/api/newsletter/confirm) and by the
// monthly issue (src/lib/newsletter-issue.mjs). Kept as .mjs so tests and
// scripts can import it with plain `node`.

export const EMAIL_LOCALES = ['nl', 'en', 'de', 'fr', 'es', 'it'];

export function normalizeEmailLocale(locale) {
  return EMAIL_LOCALES.includes(locale) ? locale : 'nl';
}

const LOGO_URL = 'https://www.skill-quest.app/skillquest-logo.png';
const SITE_URL = 'https://www.skill-quest.app';
const SUPPORT_EMAIL = 'hello@skill-quest.app';

/** Escapes text for an HTML attribute in double quotes or a text node. */
export function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function shell(bodyHtml, title) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F9FAFB; color: #14201B;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background: #FFFFFF; border-radius: 16px; border: 1px solid #DCE5DF; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.06);">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <img src="${LOGO_URL}" width="120" height="120" alt="SkillQuest" style="display: block; border-radius: 24px;">
            </td>
          </tr>
          ${bodyHtml}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function ctaButton(href, label) {
  return `
          <tr>
            <td align="center" style="padding: 0 0 32px 0;">
              <a href="${escapeAttribute(href)}" style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #FF6B35 0%, #D2381C 100%); color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 6px -1px rgba(210, 56, 28, 0.3);">
                ${label}
              </a>
            </td>
          </tr>`;
}

const QUESTIONS = {
  nl: 'Vragen? Stuur ons een e-mail naar',
  en: 'Questions? Email us at',
  de: 'Fragen? Schick uns eine E-Mail an',
  fr: 'Des questions ? Envoie-nous un e-mail à l\'adresse',
  es: '¿Tienes alguna pregunta? Envíanos un correo a',
  it: 'Hai domande? Scrivici all\'indirizzo',
};

export function footer(locale, extraHtml = '') {
  return `
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid #DCE5DF;">
              <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
                SkillQuest | <a href="${SITE_URL}" style="color: #0F766E; text-decoration: none;">www.skill-quest.app</a><br>
                ${QUESTIONS[locale]} <a href="mailto:${SUPPORT_EMAIL}" style="color: #0F766E; text-decoration: none;">${SUPPORT_EMAIL}</a>
              </p>${extraHtml}
            </td>
          </tr>`;
}

// ---------------------------------------------------------------------------
// Confirmation email (step 1 of the double opt-in)
// ---------------------------------------------------------------------------

const VERIFY_COPY = {
  nl: {
    subject: 'Bevestig je inschrijving voor de SkillQuest-nieuwsbrief',
    heading: 'Bevestig je inschrijving',
    hey: 'Hoi!',
    intro: 'Je hebt je ingeschreven voor de nieuwsbrief van <strong style="color: #0F766E;">SkillQuest</strong>. Klik op de knop hieronder om dat te bevestigen. Pas daarna sturen we je de nieuwsbrief.',
    expect: 'Je krijgt af en toe een e-mail over nieuwe functies in SkillQuest en tips om vaardigheden op te bouwen, voor jezelf of samen met je kinderen. In elke nieuwsbrief kun je je met één klik afmelden.',
    cta: 'Inschrijving bevestigen',
    expiry: 'Deze link is 24 uur geldig.<br>Heb je je niet ingeschreven? Dan kun je deze e-mail negeren: zonder bevestiging sturen we je niets.',
  },
  en: {
    subject: 'Confirm your subscription to the SkillQuest newsletter',
    heading: 'Confirm your subscription',
    hey: 'Hi!',
    intro: 'You signed up for the <strong style="color: #0F766E;">SkillQuest</strong> newsletter. Click the button below to confirm. We only start sending the newsletter after that.',
    expect: "Now and then you'll get an email about new features in SkillQuest and tips for building skills, for yourself or with your kids. Every newsletter has a link to unsubscribe in one click.",
    cta: 'Confirm subscription',
    expiry: "This link is valid for 24 hours.<br>Didn't sign up? Then you can ignore this email: without confirmation, we won't send you anything.",
  },
  de: {
    subject: 'Bestätige dein Abonnement für den SkillQuest-Newsletter',
    heading: 'Bestätige dein Abonnement',
    hey: 'Hallo!',
    intro: 'Du hast dich für den Newsletter von <strong style="color: #0F766E;">SkillQuest</strong> angemeldet. Klicke auf die Schaltfläche unten, um die Anmeldung zu bestätigen. Erst danach beginnen wir mit dem Versand des Newsletters.',
    expect: 'Ab und zu bekommst du eine E-Mail über neue Funktionen bei SkillQuest und Tipps zum Aufbau von Fähigkeiten – für dich selbst oder gemeinsam mit deinen Kindern. Jeder Newsletter enthält einen Link, über den du dich mit einem Klick abmelden kannst.',
    cta: 'Abonnement bestätigen',
    expiry: 'Dieser Link ist 24 Stunden lang gültig.<br>Hast du dich nicht angemeldet? Dann kannst du diese E-Mail ignorieren: Ohne Bestätigung schicken wir dir nichts.',
  },
  fr: {
    subject: 'Confirme ton inscription à la newsletter de SkillQuest',
    heading: 'Confirme ton inscription',
    hey: 'Salut !',
    intro: "Tu t'es inscrit à la newsletter de <strong style=\"color: #0F766E;\">SkillQuest</strong>. Clique sur le bouton ci-dessous pour confirmer. Nous ne t'enverrons la newsletter qu'ensuite.",
    expect: 'De temps en temps, tu recevras un e-mail sur les nouvelles fonctionnalités de SkillQuest et des conseils pour développer tes compétences, pour toi ou avec tes enfants. Chaque newsletter comporte un lien pour te désabonner en un clic.',
    cta: "Confirmer l'inscription",
    expiry: "Ce lien est valable pendant 24 heures.<br>Tu ne t'es pas inscrit ? Tu peux ignorer cet e-mail : sans confirmation, nous ne t'enverrons rien.",
  },
  es: {
    subject: 'Confirma tu suscripción al boletín de SkillQuest',
    heading: 'Confirma tu suscripción',
    hey: '¡Hola!',
    intro: 'Te has suscrito al boletín de <strong style="color: #0F766E;">SkillQuest</strong>. Haz clic en el botón de abajo para confirmarlo. Solo a partir de ese momento te enviaremos el boletín.',
    expect: 'De vez en cuando recibirás un correo sobre las novedades de SkillQuest y consejos para desarrollar habilidades, ya sea para ti o con tus hijos. Cada boletín incluye un enlace para darte de baja con un solo clic.',
    cta: 'Confirmar suscripción',
    expiry: 'Este enlace es válido durante 24 horas.<br>¿No te has suscrito? Entonces puedes ignorar este correo: sin confirmación, no te enviaremos nada.',
  },
  it: {
    subject: 'Conferma la tua iscrizione alla newsletter di SkillQuest',
    heading: 'Conferma la tua iscrizione',
    hey: 'Ciao!',
    intro: 'Ti sei iscritto alla newsletter di <strong style="color: #0F766E;">SkillQuest</strong>. Clicca sul pulsante qui sotto per confermare. Solo dopo inizieremo a inviarti la newsletter.',
    expect: "Di tanto in tanto riceverai un'email con le novità di SkillQuest e consigli per sviluppare le tue abilità, da solo o insieme ai tuoi figli. Ogni newsletter ha un link per annullare l'iscrizione con un solo clic.",
    cta: "Conferma l'iscrizione",
    expiry: 'Questo link è valido per 24 ore.<br>Non ti sei iscritto? Allora puoi ignorare questa email: senza conferma, non ti manderemo nulla.',
  },
};

export function renderVerificationEmail({ locale, confirmUrl }) {
  const loc = normalizeEmailLocale(locale);
  const t = VERIFY_COPY[loc];

  const body = `
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #115E59;">${t.heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">${t.hey}</p>
              <p style="margin: 0 0 16px 0;">${t.intro}</p>
              <p style="margin: 0 0 16px 0;">${t.expect}</p>
            </td>
          </tr>
${ctaButton(confirmUrl, t.cta)}
          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; color: #94A3B8; text-align: center;">
              <p style="margin: 0;">${t.expiry}</p>
            </td>
          </tr>
${footer(loc)}`;

  return { subject: t.subject, html: shell(body, t.heading) };
}

// ---------------------------------------------------------------------------
// Welcome email (after the subscription is confirmed)
// ---------------------------------------------------------------------------

const WELCOME_COPY = {
  nl: {
    subject: 'Je bent ingeschreven voor de SkillQuest-nieuwsbrief',
    title: 'Welkom bij de SkillQuest-nieuwsbrief',
    heading: 'Je inschrijving is bevestigd',
    hey: 'Hoi!',
    thanks: 'Bedankt voor het bevestigen. Vanaf nu krijg je de nieuwsbrief van <strong style="color: #0F766E;">SkillQuest</strong>.',
    appIntro: 'SkillQuest helpt mensen en gezinnen vaardigheden op te bouwen met concentratietimers, XP, levels, statistieken, vrienden, uitdagingen en gezinsfuncties.',
    featuresHeading: 'Waarom is SkillQuest zo handig?',
    features: ['Focus-timers voor je vaardigheden', 'XP, levels en actieve dagen', 'Statistieken per vaardigheid', 'Vrienden, uitdagingen en ranglijsten', 'Hulpmiddelen voor ouders en kinderen'],
    nextHeading: 'Wat kun je verwachten?',
    next: ['Nieuws over nieuwe functies', 'Tips om je vaardigheden en die van je gezin te ontwikkelen'],
    cta: 'Ga naar www.skill-quest.app',
    reason: 'Je krijgt deze e-mail omdat je je hebt ingeschreven voor de SkillQuest-nieuwsbrief.',
    unsubscribeLead: 'Wil je de nieuwsbrief niet meer ontvangen?',
    unsubscribeLink: 'Afmelden',
  },
  en: {
    subject: "You're subscribed to the SkillQuest newsletter",
    title: 'Welcome to the SkillQuest newsletter',
    heading: 'Your subscription is confirmed',
    hey: 'Hi!',
    thanks: 'Thanks for confirming. From now on you\'ll get the <strong style="color: #0F766E;">SkillQuest</strong> newsletter.',
    appIntro: 'SkillQuest helps people and families build skills with focus timers, XP, levels, stats, friends, challenges, and family tools.',
    featuresHeading: 'What makes SkillQuest useful?',
    features: ['Focus timers for your skills', 'XP, levels, and active days', 'Stats per skill', 'Friends, challenges, and rankings', 'Family tools for parents and kids'],
    nextHeading: 'What can you expect?',
    next: ['Updates on new features', 'Tips on skill development for you and your family'],
    cta: 'Visit www.skill-quest.app',
    reason: "You're getting this email because you subscribed to the SkillQuest newsletter.",
    unsubscribeLead: "Don't want the newsletter anymore?",
    unsubscribeLink: 'Unsubscribe',
  },
  de: {
    subject: 'Du hast den SkillQuest-Newsletter abonniert',
    title: 'Willkommen beim SkillQuest-Newsletter',
    heading: 'Dein Abonnement ist bestätigt',
    hey: 'Hallo!',
    thanks: 'Danke für deine Bestätigung. Ab sofort erhältst du den Newsletter von <strong style="color: #0F766E;">SkillQuest</strong>.',
    appIntro: 'SkillQuest hilft Einzelpersonen und Familien dabei, Fähigkeiten aufzubauen – mit Konzentrations-Timern, XP, Levels, Statistiken, Freunden, Herausforderungen und Tools für die ganze Familie.',
    featuresHeading: 'Was macht SkillQuest so nützlich?',
    features: ['Fokus-Timer für deine Fähigkeiten', 'XP, Level und aktive Tage', 'Statistiken pro Fähigkeit', 'Freunde, Herausforderungen und Ranglisten', 'Hilfsmittel für Eltern und Kinder'],
    nextHeading: 'Was kannst du erwarten?',
    next: ['Neuigkeiten zu neuen Funktionen', 'Tipps zum Aufbau von Fähigkeiten für dich und deine Familie'],
    cta: 'www.skill-quest.app besuchen',
    reason: 'Du erhältst diese E-Mail, weil du den SkillQuest-Newsletter abonniert hast.',
    unsubscribeLead: 'Willst du den Newsletter nicht mehr erhalten?',
    unsubscribeLink: 'Abmelden',
  },
  fr: {
    subject: 'Tu es inscrit à la newsletter de SkillQuest',
    title: 'Bienvenue dans la newsletter de SkillQuest',
    heading: 'Ton inscription est confirmée',
    hey: 'Salut !',
    thanks: 'Merci d\'avoir confirmé. Désormais, tu recevras la newsletter de <strong style="color: #0F766E;">SkillQuest</strong>.',
    appIntro: 'SkillQuest aide les gens et les familles à développer leurs compétences grâce à des minuteurs de concentration, des XP, des niveaux, des statistiques, des amis, des défis et des outils pour la famille.',
    featuresHeading: 'En quoi SkillQuest est-il utile ?',
    features: ['Minuteurs de concentration pour tes compétences', 'XP, niveaux et jours actifs', 'Statistiques par compétence', 'Amis, défis et classements', 'Des outils pour toute la famille, destinés aux parents et aux enfants'],
    nextHeading: 'Ce qui t\'attend',
    next: ['Des infos sur les nouvelles fonctionnalités', 'Des conseils pour développer tes compétences et celles de ta famille'],
    cta: 'Aller sur www.skill-quest.app',
    reason: "Tu reçois cet e-mail parce que tu t'es abonné à la newsletter de SkillQuest.",
    unsubscribeLead: 'Tu ne veux plus recevoir la newsletter ?',
    unsubscribeLink: 'Se désabonner',
  },
  es: {
    subject: 'Ya estás suscrito al boletín de SkillQuest',
    title: 'Te damos la bienvenida al boletín de SkillQuest',
    heading: 'Tu suscripción está confirmada',
    hey: '¡Hola!',
    thanks: 'Gracias por confirmar. A partir de ahora recibirás el boletín de <strong style="color: #0F766E;">SkillQuest</strong>.',
    appIntro: 'SkillQuest ayuda a las personas y a las familias a desarrollar habilidades mediante temporizadores de concentración, XP, niveles, estadísticas, amigos, retos y herramientas para la familia.',
    featuresHeading: '¿Por qué es útil SkillQuest?',
    features: ['Temporizadores de concentración para tus habilidades', 'XP, niveles y días activos', 'Estadísticas por habilidad', 'Amigos, retos y clasificaciones', 'Herramientas familiares para padres e hijos'],
    nextHeading: '¿Qué puedes esperar?',
    next: ['Novedades sobre las nuevas funciones', 'Consejos para que tú y tu familia desarrolléis vuestras habilidades'],
    cta: 'Visitar www.skill-quest.app',
    reason: 'Recibes este correo porque te has suscrito al boletín de SkillQuest.',
    unsubscribeLead: '¿Ya no quieres recibir el boletín?',
    unsubscribeLink: 'Darse de baja',
  },
  it: {
    subject: 'Ti sei iscritto alla newsletter di SkillQuest',
    title: 'Ti diamo il benvenuto nella newsletter di SkillQuest',
    heading: 'La tua iscrizione è confermata',
    hey: 'Ciao!',
    thanks: 'Grazie per la conferma. D\'ora in poi riceverai la newsletter di <strong style="color: #0F766E;">SkillQuest</strong>.',
    appIntro: 'SkillQuest aiuta le persone e le famiglie a sviluppare le proprie abilità grazie a timer di concentrazione, XP, livelli, statistiche, amici, sfide e strumenti per la famiglia.',
    featuresHeading: 'Cosa rende SkillQuest così utile?',
    features: ['Timer di concentrazione per le tue abilità', 'XP, livelli e giorni attivi', 'Statistiche per abilità', 'Amici, sfide e classifiche', 'Strumenti per la famiglia, per genitori e bambini'],
    nextHeading: 'Cosa ti puoi aspettare?',
    next: ['Novità sulle nuove funzionalità', 'Consigli su come sviluppare le tue abilità e quelle della tua famiglia'],
    cta: 'Visita il sito www.skill-quest.app',
    reason: 'Hai ricevuto questa email perché ti sei iscritto alla newsletter di SkillQuest.',
    unsubscribeLead: 'Non vuoi più ricevere la newsletter?',
    unsubscribeLink: 'Annulla iscrizione',
  },
};

/**
 * The greeting and the "why you get this / unsubscribe" lines of the welcome
 * email, reused by every monthly newsletter so the wording stays the same.
 */
export function newsletterFooterCopy(locale) {
  const t = WELCOME_COPY[normalizeEmailLocale(locale)];
  return {
    hey: t.hey,
    reason: t.reason,
    unsubscribeLead: t.unsubscribeLead,
    unsubscribeLink: t.unsubscribeLink,
  };
}

export function renderWelcomeEmail({ locale, unsubscribeUrl }) {
  const loc = normalizeEmailLocale(locale);
  const t = WELCOME_COPY[loc];

  const unsubscribe = `
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #94A3B8; line-height: 1.6;">
                ${t.reason}<br>
                ${t.unsubscribeLead} <a href="${escapeAttribute(unsubscribeUrl)}" style="color: #0F766E;">${t.unsubscribeLink}</a>
              </p>`;

  const body = `
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #115E59;">${t.heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">${t.hey}</p>
              <p style="margin: 0 0 16px 0;">${t.thanks}</p>
              <p style="margin: 0 0 16px 0;">${t.appIntro}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #EAF8F5; border-radius: 12px; border: 1px solid #D2F0EA; margin-bottom: 24px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; color: #0F766E;">${t.featuresHeading}</h2>
              <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                ${t.features.map((f) => `<li>${f}</li>`).join('\n                ')}
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: bold; color: #0F766E;">${t.nextHeading}</h2>
              <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                ${t.next.map((f) => `<li>${f}</li>`).join('\n                ')}
              </ul>
            </td>
          </tr>
${ctaButton(SITE_URL, t.cta)}
${footer(loc, unsubscribe)}`;

  return { subject: t.subject, html: shell(body, t.title) };
}
