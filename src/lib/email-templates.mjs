// Shared transactional email copy + HTML rendering, used by the Next.js API
// routes (imported from .ts) AND by the standalone scripts/*.mjs admin
// scripts (plain Node ESM import) — kept as .mjs so both can import it
// without a build step.

export const EMAIL_LOCALES = ['nl', 'en', 'de', 'fr', 'es', 'it'];

export function normalizeEmailLocale(locale) {
  return EMAIL_LOCALES.includes(locale) ? locale : 'nl';
}

const LOGO_URL = 'https://www.skill-quest.app/skillquest-logo.png';
const SITE_URL = 'https://www.skill-quest.app';
const SUPPORT_EMAIL = 'hello@skill-quest.app';

const PLATFORM_TEXT = {
  nl: { ios: 'voor iOS', android: 'voor Android', both: 'voor iOS en Android' },
  en: { ios: 'for iOS', android: 'for Android', both: 'for iOS and Android' },
  de: { ios: 'für iOS', android: 'für Android', both: 'für iOS und Android' },
  fr: { ios: 'pour iOS', android: 'pour Android', both: 'pour iOS et Android' },
  es: { ios: 'para iOS', android: 'para Android', both: 'para iOS y Android' },
  it: { ios: 'per iOS', android: 'per Android', both: 'per iOS e Android' },
};

function platformText(locale, platform) {
  const table = PLATFORM_TEXT[locale] ?? PLATFORM_TEXT.nl;
  return table[platform] ?? table.both;
}

function shell(bodyHtml, title) {
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
              <a href="${href}" style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #FF6B35 0%, #D2381C 100%); color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 6px -1px rgba(210, 56, 28, 0.3);">
                ${label}
              </a>
            </td>
          </tr>`;
}

function footer(questionsLabel) {
  return `
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid #DCE5DF;">
              <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
                SkillQuest | <a href="${SITE_URL}" style="color: #0F766E; text-decoration: none;">www.skill-quest.app</a><br>
                ${questionsLabel} <a href="mailto:${SUPPORT_EMAIL}" style="color: #0F766E; text-decoration: none;">${SUPPORT_EMAIL}</a>
              </p>
            </td>
          </tr>`;
}

// ---------------------------------------------------------------------------
// Verification email ("confirm your signup")
// ---------------------------------------------------------------------------

const VERIFY_COPY = {
  nl: {
    subject: 'Bevestig je aanmelding voor SkillQuest',
    title: 'Bevestig je aanmelding',
    heading: 'Bevestig je aanmelding',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    intro: (brand) => `Bijna klaar! Klik op de knop hieronder om je aanmelding voor <strong style="color: #0F766E;">${brand}</strong> updates te bevestigen.`,
    platformInfo: (p) => `Je krijgt relevante SkillQuest updates ${p}, waaronder Android alpha-informatie als je daarvoor kiest.`,
    androidNote: 'Voor Android geldt: na deze bevestiging sta je op de wachtlijst voor de Google Play closed test. Zodra we je e-mailadres hebben toegevoegd aan de tester-lijst, ontvang je een aparte e-mail met de installatielink. Dat kan even duren &mdash; we voegen testers in batches toe.',
    cta: 'Bevestig mijn aanmelding',
    expiry: 'Deze link is 24 uur geldig.<br>Niet aangevraagd? Dan kun je deze e-mail negeren.',
    questions: 'Vragen? Stuur een e-mail naar',
  },
  en: {
    subject: 'Confirm your SkillQuest signup',
    title: 'Confirm your signup',
    heading: 'Confirm your signup',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    intro: (brand) => `Almost there! Click the button below to confirm your signup for <strong style="color: #0F766E;">${brand}</strong> updates.`,
    platformInfo: (p) => `You'll get relevant SkillQuest updates ${p}, including Android alpha information if you opt in.`,
    androidNote: 'For Android: after this confirmation you\'re on the waitlist for the Google Play closed test. Once we add your email to the tester list, you\'ll get a separate email with the install link. That can take a while &mdash; we add testers in batches.',
    cta: 'Confirm my signup',
    expiry: 'This link is valid for 24 hours.<br>Didn\'t request this? You can ignore this email.',
    questions: 'Questions? Email us at',
  },
  de: {
    subject: 'Bestätige deine Anmeldung für SkillQuest',
    title: 'Bestätige deine Anmeldung',
    heading: 'Bestätige deine Anmeldung',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    intro: (brand) => `Fast geschafft! Klicke auf den Button unten, um deine Anmeldung für <strong style="color: #0F766E;">${brand}</strong> Updates zu bestätigen.`,
    platformInfo: (p) => `Du erhältst relevante SkillQuest Updates ${p}, einschließlich Android-Alpha-Informationen, falls du das möchtest.`,
    androidNote: 'Für Android gilt: Nach dieser Bestätigung stehst du auf der Warteliste für den Google Play Closed Test. Sobald wir deine E-Mail zur Tester-Liste hinzugefügt haben, erhältst du eine separate E-Mail mit dem Installationslink. Das kann etwas dauern &mdash; wir fügen Tester in Gruppen hinzu.',
    cta: 'Anmeldung bestätigen',
    expiry: 'Dieser Link ist 24 Stunden gültig.<br>Nicht angefordert? Dann kannst du diese E-Mail ignorieren.',
    questions: 'Fragen? Schreib uns an',
  },
  fr: {
    subject: 'Confirmez votre inscription à SkillQuest',
    title: 'Confirmez votre inscription',
    heading: 'Confirmez votre inscription',
    hey: (name) => `Bonjour${name ? ` ${name}` : ''} !`,
    intro: (brand) => `Presque terminé ! Cliquez sur le bouton ci-dessous pour confirmer votre inscription aux actualités <strong style="color: #0F766E;">${brand}</strong>.`,
    platformInfo: (p) => `Vous recevrez les actualités SkillQuest pertinentes ${p}, y compris les informations sur l'alpha Android si vous le souhaitez.`,
    androidNote: 'Pour Android : après cette confirmation, vous êtes sur la liste d\'attente du test fermé Google Play. Dès que nous ajoutons votre e-mail à la liste des testeurs, vous recevrez un e-mail séparé avec le lien d\'installation. Cela peut prendre un moment &mdash; nous ajoutons les testeurs par lots.',
    cta: 'Confirmer mon inscription',
    expiry: 'Ce lien est valable 24 heures.<br>Vous n\'êtes pas à l\'origine de cette demande ? Vous pouvez ignorer cet e-mail.',
    questions: 'Des questions ? Écrivez-nous à',
  },
  es: {
    subject: 'Confirma tu registro en SkillQuest',
    title: 'Confirma tu registro',
    heading: 'Confirma tu registro',
    hey: (name) => `¡Hola${name ? ` ${name}` : ''}!`,
    intro: (brand) => `¡Ya casi está! Haz clic en el botón de abajo para confirmar tu registro para recibir novedades de <strong style="color: #0F766E;">${brand}</strong>.`,
    platformInfo: (p) => `Recibirás novedades relevantes de SkillQuest ${p}, incluida información sobre la alpha de Android si lo eliges.`,
    androidNote: 'Para Android: tras esta confirmación estarás en la lista de espera del test cerrado de Google Play. En cuanto añadamos tu email a la lista de testers, recibirás un correo aparte con el enlace de instalación. Puede tardar un poco &mdash; añadimos testers por tandas.',
    cta: 'Confirmar mi registro',
    expiry: 'Este enlace es válido durante 24 horas.<br>¿No lo solicitaste? Puedes ignorar este correo.',
    questions: '¿Dudas? Escríbenos a',
  },
  it: {
    subject: 'Conferma la tua iscrizione a SkillQuest',
    title: 'Conferma la tua iscrizione',
    heading: 'Conferma la tua iscrizione',
    hey: (name) => `Ciao${name ? ` ${name}` : ''}!`,
    intro: (brand) => `Ci siamo quasi! Clicca sul pulsante qui sotto per confermare la tua iscrizione agli aggiornamenti di <strong style="color: #0F766E;">${brand}</strong>.`,
    platformInfo: (p) => `Riceverai aggiornamenti rilevanti di SkillQuest ${p}, incluse informazioni sull'alpha Android se lo desideri.`,
    androidNote: 'Per Android: dopo questa conferma sarai nella lista d\'attesa per il closed test di Google Play. Non appena aggiungeremo la tua email alla lista tester, riceverai un\'email separata con il link di installazione. Potrebbe volerci un po\' &mdash; aggiungiamo i tester a gruppi.',
    cta: 'Conferma la mia iscrizione',
    expiry: 'Questo link è valido per 24 ore.<br>Non l\'hai richiesto tu? Puoi ignorare questa email.',
    questions: 'Domande? Scrivici a',
  },
};

export function renderVerificationEmail({ locale, name, verifyUrl, platform }) {
  const loc = normalizeEmailLocale(locale);
  const t = VERIFY_COPY[loc];
  const p = platformText(loc, platform);

  const body = `
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #115E59;">${t.heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">${t.hey(name)}</p>
              <p style="margin: 0 0 16px 0;">${t.intro('SkillQuest')}</p>
              <p style="margin: 0 0 16px 0;">${t.platformInfo(p)}</p>
              ${platform !== 'ios' ? `<p style="margin: 0 0 16px 0;">${t.androidNote}</p>` : ''}
            </td>
          </tr>
${ctaButton(verifyUrl, t.cta)}
          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; color: #94A3B8; text-align: center;">
              <p style="margin: 0;">${t.expiry}</p>
            </td>
          </tr>
${footer(t.questions)}`;

  return { subject: t.subject, html: shell(body, t.title) };
}

// ---------------------------------------------------------------------------
// Welcome email ("your signup is confirmed")
// ---------------------------------------------------------------------------

const WELCOME_COPY = {
  nl: {
    subject: 'Welkom bij SkillQuest updates!',
    title: 'Welkom bij SkillQuest',
    heading: 'Je aanmelding is bevestigd',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Bedankt voor het bevestigen van je aanmelding voor <strong style="color: #0F766E;">SkillQuest</strong> updates ${p}.`,
    appIntro: 'SkillQuest helpt mensen en gezinnen vaardigheden op te bouwen met focus timers, XP, levels, statistieken, vrienden, challenges en familie-tools.',
    featuresHeading: 'Wat maakt SkillQuest nuttig?',
    features: ['Focus timers voor je vaardigheden', 'XP, levels en streaks', 'Statistieken per skill', 'Vrienden, challenges en rankings', 'Familie-tools voor ouders en kinderen'],
    nextHeading: 'Wat kun je verwachten?',
    next: ['Updates over nieuwe functies', 'Informatie over Android alpha en Google Play closed testing', 'Tips over skill development voor jezelf en je gezin'],
    androidNote: '<strong>Over de Android alpha:</strong> je staat nu op de wachtlijst voor de Google Play closed test. Zodra we je hebt toegevoegd aan de tester-lijst, sturen we je een aparte e-mail met de installatielink. Gebruik dan hetzelfde Google-account op je Android-toestel als het e-mailadres waarmee je je hebt aangemeld.',
    cta: 'Bezoek www.skill-quest.app',
    questions: 'Vragen? Stuur een e-mail naar',
    reason: 'Je ontvangt deze e-mail omdat je je aanmelding hebt bevestigd voor SkillQuest updates.<br>We respecteren je privacy en sturen alleen relevante updates.',
  },
  en: {
    subject: 'Welcome to SkillQuest updates!',
    title: 'Welcome to SkillQuest',
    heading: 'Your signup is confirmed',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Thanks for confirming your signup for <strong style="color: #0F766E;">SkillQuest</strong> updates ${p}.`,
    appIntro: 'SkillQuest helps people and families build skills with focus timers, XP, levels, stats, friends, challenges, and family tools.',
    featuresHeading: 'What makes SkillQuest useful?',
    features: ['Focus timers for your skills', 'XP, levels, and streaks', 'Stats per skill', 'Friends, challenges, and rankings', 'Family tools for parents and kids'],
    nextHeading: 'What can you expect?',
    next: ['Updates on new features', 'Information about the Android alpha and Google Play closed testing', 'Tips on skill development for you and your family'],
    androidNote: '<strong>About the Android alpha:</strong> you\'re now on the waitlist for the Google Play closed test. Once we add you to the tester list, we\'ll send a separate email with the install link. Use the same Google account on your Android device as the email you signed up with.',
    cta: 'Visit www.skill-quest.app',
    questions: 'Questions? Email us at',
    reason: 'You\'re receiving this email because you confirmed your signup for SkillQuest updates.<br>We respect your privacy and only send relevant updates.',
  },
  de: {
    subject: 'Willkommen bei den SkillQuest Updates!',
    title: 'Willkommen bei SkillQuest',
    heading: 'Deine Anmeldung ist bestätigt',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Danke, dass du deine Anmeldung für <strong style="color: #0F766E;">SkillQuest</strong> Updates ${p} bestätigt hast.`,
    appIntro: 'SkillQuest hilft Menschen und Familien, mit Fokus-Timern, XP, Levels, Statistiken, Freunden, Challenges und Familienfunktionen Fähigkeiten aufzubauen.',
    featuresHeading: 'Was macht SkillQuest nützlich?',
    features: ['Fokus-Timer für deine Fähigkeiten', 'XP, Levels und Streaks', 'Statistiken pro Skill', 'Freunde, Challenges und Ranglisten', 'Familienfunktionen für Eltern und Kinder'],
    nextHeading: 'Was kannst du erwarten?',
    next: ['Updates zu neuen Funktionen', 'Informationen zur Android-Alpha und zum Google Play Closed Testing', 'Tipps zur Skill-Entwicklung für dich und deine Familie'],
    androidNote: '<strong>Zur Android-Alpha:</strong> Du stehst jetzt auf der Warteliste für den Google Play Closed Test. Sobald wir dich zur Tester-Liste hinzugefügt haben, senden wir dir eine separate E-Mail mit dem Installationslink. Nutze dann auf deinem Android-Gerät dasselbe Google-Konto wie die E-Mail-Adresse, mit der du dich angemeldet hast.',
    cta: 'Besuche www.skill-quest.app',
    questions: 'Fragen? Schreib uns an',
    reason: 'Du erhältst diese E-Mail, weil du deine Anmeldung für SkillQuest Updates bestätigt hast.<br>Wir respektieren deine Privatsphäre und senden nur relevante Updates.',
  },
  fr: {
    subject: 'Bienvenue dans les actualités SkillQuest !',
    title: 'Bienvenue chez SkillQuest',
    heading: 'Votre inscription est confirmée',
    hey: (name) => `Bonjour${name ? ` ${name}` : ''} !`,
    thanks: (p) => `Merci d\'avoir confirmé votre inscription aux actualités <strong style="color: #0F766E;">SkillQuest</strong> ${p}.`,
    appIntro: 'SkillQuest aide les personnes et les familles à développer des compétences grâce aux minuteurs de concentration, à l\'XP, aux niveaux, aux statistiques, aux amis, aux défis et aux outils familiaux.',
    featuresHeading: 'En quoi SkillQuest est-il utile ?',
    features: ['Minuteurs de concentration pour vos compétences', 'XP, niveaux et séries', 'Statistiques par compétence', 'Amis, défis et classements', 'Outils familiaux pour parents et enfants'],
    nextHeading: 'À quoi vous attendre ?',
    next: ['Actualités sur les nouvelles fonctionnalités', 'Informations sur l\'alpha Android et le closed testing Google Play', 'Conseils sur le développement de compétences pour vous et votre famille'],
    androidNote: '<strong>À propos de l\'alpha Android :</strong> vous êtes désormais sur la liste d\'attente du test fermé Google Play. Dès que nous vous ajoutons à la liste des testeurs, nous vous enverrons un e-mail séparé avec le lien d\'installation. Utilisez alors sur votre appareil Android le même compte Google que l\'adresse e-mail avec laquelle vous vous êtes inscrit.',
    cta: 'Visitez www.skill-quest.app',
    questions: 'Des questions ? Écrivez-nous à',
    reason: 'Vous recevez cet e-mail car vous avez confirmé votre inscription aux actualités SkillQuest.<br>Nous respectons votre vie privée et n\'envoyons que des actualités pertinentes.',
  },
  es: {
    subject: '¡Bienvenido a las novedades de SkillQuest!',
    title: 'Bienvenido a SkillQuest',
    heading: 'Tu registro está confirmado',
    hey: (name) => `¡Hola${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Gracias por confirmar tu registro para recibir novedades de <strong style="color: #0F766E;">SkillQuest</strong> ${p}.`,
    appIntro: 'SkillQuest ayuda a personas y familias a desarrollar habilidades con temporizadores de concentración, XP, niveles, estadísticas, amigos, retos y herramientas familiares.',
    featuresHeading: '¿Qué hace útil a SkillQuest?',
    features: ['Temporizadores de concentración para tus habilidades', 'XP, niveles y rachas', 'Estadísticas por habilidad', 'Amigos, retos y clasificaciones', 'Herramientas familiares para padres e hijos'],
    nextHeading: '¿Qué puedes esperar?',
    next: ['Novedades sobre nuevas funciones', 'Información sobre la alpha de Android y el closed testing de Google Play', 'Consejos sobre el desarrollo de habilidades para ti y tu familia'],
    androidNote: '<strong>Sobre la alpha de Android:</strong> ahora estás en la lista de espera del test cerrado de Google Play. En cuanto te añadamos a la lista de testers, te enviaremos un correo aparte con el enlace de instalación. Usa entonces en tu dispositivo Android la misma cuenta de Google que el email con el que te registraste.',
    cta: 'Visita www.skill-quest.app',
    questions: '¿Dudas? Escríbenos a',
    reason: 'Recibes este correo porque confirmaste tu registro para las novedades de SkillQuest.<br>Respetamos tu privacidad y solo enviamos novedades relevantes.',
  },
  it: {
    subject: 'Benvenuto negli aggiornamenti SkillQuest!',
    title: 'Benvenuto in SkillQuest',
    heading: 'La tua iscrizione è confermata',
    hey: (name) => `Ciao${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Grazie per aver confermato la tua iscrizione agli aggiornamenti di <strong style="color: #0F766E;">SkillQuest</strong> ${p}.`,
    appIntro: 'SkillQuest aiuta persone e famiglie a sviluppare competenze con timer di concentrazione, XP, livelli, statistiche, amici, sfide e strumenti per la famiglia.',
    featuresHeading: 'Cosa rende utile SkillQuest?',
    features: ['Timer di concentrazione per le tue competenze', 'XP, livelli e serie', 'Statistiche per competenza', 'Amici, sfide e classifiche', 'Strumenti per la famiglia per genitori e figli'],
    nextHeading: 'Cosa puoi aspettarti?',
    next: ['Aggiornamenti sulle nuove funzioni', 'Informazioni sull\'alpha Android e sul closed testing di Google Play', 'Consigli sullo sviluppo delle competenze per te e la tua famiglia'],
    androidNote: '<strong>Sull\'alpha Android:</strong> ora sei nella lista d\'attesa per il closed test di Google Play. Non appena ti aggiungeremo alla lista tester, ti invieremo un\'email separata con il link di installazione. Usa quindi sul tuo dispositivo Android lo stesso account Google dell\'email con cui ti sei iscritto.',
    cta: 'Visita www.skill-quest.app',
    questions: 'Domande? Scrivici a',
    reason: 'Ricevi questa email perché hai confermato la tua iscrizione agli aggiornamenti di SkillQuest.<br>Rispettiamo la tua privacy e inviamo solo aggiornamenti pertinenti.',
  },
};

export function renderWelcomeEmail({ locale, name, platform }) {
  const loc = normalizeEmailLocale(locale);
  const t = WELCOME_COPY[loc];
  const p = platformText(loc, platform);

  const body = `
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #115E59;">${t.heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">${t.hey(name)}</p>
              <p style="margin: 0 0 16px 0;">${t.thanks(p)}</p>
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
          ${platform !== 'ios' ? `<tr>
            <td style="padding-bottom: 24px; font-size: 15px; line-height: 1.6; color: #475569;">
              <p style="margin: 0;">${t.androidNote}</p>
            </td>
          </tr>` : ''}
${ctaButton(SITE_URL, t.cta)}
          <tr>
            <td align="center" style="padding-top: 8px; border-top: 1px solid #DCE5DF;">
              <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
                SkillQuest | <a href="${SITE_URL}" style="color: #0F766E; text-decoration: none;">www.skill-quest.app</a><br>
                ${t.questions} <a href="mailto:${SUPPORT_EMAIL}" style="color: #0F766E; text-decoration: none;">${SUPPORT_EMAIL}</a>
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #CBD5E1;">${t.reason}</p>
            </td>
          </tr>`;

  return { subject: t.subject, html: shell(body, t.title) };
}

// ---------------------------------------------------------------------------
// Android install-notify email ("you can install now")
// ---------------------------------------------------------------------------

const INSTALL_COPY = {
  nl: {
    subject: 'Je kunt SkillQuest nu installeren op Android!',
    title: 'Je kunt SkillQuest nu installeren',
    heading: 'Je bent toegevoegd als Android tester!',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    body: 'Je e-mailadres staat nu op de Google Play tester-lijst voor SkillQuest. Open onderstaande link <strong>met hetzelfde Google-account op je Android-toestel</strong> om deel te nemen aan de test en de app te installeren.',
    cta: 'Word tester en installeer',
    note: 'Werkt de link niet meteen? Het kan tot een uur duren voordat Google Play je toevoeging verwerkt.',
    questions: 'Vragen? Stuur een e-mail naar',
  },
  en: {
    subject: 'You can now install SkillQuest on Android!',
    title: 'You can now install SkillQuest',
    heading: "You've been added as an Android tester!",
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    body: 'Your email is now on the Google Play tester list for SkillQuest. Open the link below <strong>using the same Google account on your Android device</strong> to join the test and install the app.',
    cta: 'Become a tester and install',
    note: "Link not working right away? It can take up to an hour for Google Play to process your addition.",
    questions: 'Questions? Email us at',
  },
  de: {
    subject: 'Du kannst SkillQuest jetzt auf Android installieren!',
    title: 'Du kannst SkillQuest jetzt installieren',
    heading: 'Du wurdest als Android-Tester hinzugefügt!',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    body: 'Deine E-Mail-Adresse steht jetzt auf der Google Play Tester-Liste für SkillQuest. Öffne den Link unten <strong>mit demselben Google-Konto auf deinem Android-Gerät</strong>, um dem Test beizutreten und die App zu installieren.',
    cta: 'Tester werden und installieren',
    note: 'Funktioniert der Link nicht sofort? Es kann bis zu einer Stunde dauern, bis Google Play deine Aufnahme verarbeitet hat.',
    questions: 'Fragen? Schreib uns an',
  },
  fr: {
    subject: 'Vous pouvez maintenant installer SkillQuest sur Android !',
    title: 'Vous pouvez maintenant installer SkillQuest',
    heading: 'Vous avez été ajouté comme testeur Android !',
    hey: (name) => `Bonjour${name ? ` ${name}` : ''} !`,
    body: 'Votre adresse e-mail figure désormais sur la liste des testeurs Google Play pour SkillQuest. Ouvrez le lien ci-dessous <strong>avec le même compte Google sur votre appareil Android</strong> pour rejoindre le test et installer l\'application.',
    cta: 'Devenir testeur et installer',
    note: 'Le lien ne fonctionne pas tout de suite ? Google Play peut mettre jusqu\'à une heure pour traiter votre ajout.',
    questions: 'Des questions ? Écrivez-nous à',
  },
  es: {
    subject: '¡Ya puedes instalar SkillQuest en Android!',
    title: 'Ya puedes instalar SkillQuest',
    heading: '¡Te hemos añadido como tester de Android!',
    hey: (name) => `¡Hola${name ? ` ${name}` : ''}!`,
    body: 'Tu email ya está en la lista de testers de Google Play para SkillQuest. Abre el siguiente enlace <strong>con la misma cuenta de Google en tu dispositivo Android</strong> para unirte al test e instalar la app.',
    cta: 'Hazte tester e instala',
    note: '¿El enlace no funciona de inmediato? Google Play puede tardar hasta una hora en procesar tu incorporación.',
    questions: '¿Dudas? Escríbenos a',
  },
  it: {
    subject: 'Ora puoi installare SkillQuest su Android!',
    title: 'Ora puoi installare SkillQuest',
    heading: 'Sei stato aggiunto come tester Android!',
    hey: (name) => `Ciao${name ? ` ${name}` : ''}!`,
    body: 'La tua email è ora nella lista tester di Google Play per SkillQuest. Apri il link qui sotto <strong>usando lo stesso account Google sul tuo dispositivo Android</strong> per partecipare al test e installare l\'app.',
    cta: 'Diventa tester e installa',
    note: 'Il link non funziona subito? Google Play può impiegare fino a un\'ora per elaborare la tua aggiunta.',
    questions: 'Domande? Scrivici a',
  },
};

export function renderInstallEmail({ locale, name, androidJoinUrl }) {
  const loc = normalizeEmailLocale(locale);
  const t = INSTALL_COPY[loc];

  const body = `
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #115E59;">${t.heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">${t.hey(name)}</p>
              <p style="margin: 0 0 16px 0;">${t.body}</p>
            </td>
          </tr>
${ctaButton(androidJoinUrl, t.cta)}
          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; color: #94A3B8; text-align: center;">
              <p style="margin: 0;">${t.note}</p>
            </td>
          </tr>
${footer(t.questions)}`;

  return { subject: t.subject, html: shell(body, t.title) };
}
