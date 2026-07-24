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
    intro: (brand) => `Je bent er bijna! Klik op de knop hieronder om je aanmelding voor updates over <strong style="color: #0F766E;">${brand}</strong> te bevestigen.`,
    platformInfo: (p) => `Je krijgt relevante SkillQuest-updates ${p}, inclusief informatie over de Android-alpha als je je daarvoor aanmeldt.`,
    androidNote: 'Voor Android: na deze bevestiging sta je op de wachtlijst voor de besloten test op Google Play. Zodra we je e-mailadres aan de lijst met testers hebben toegevoegd, krijg je een aparte e-mail met de installatielink. Dat kan even duren — we voegen testers namelijk in groepen toe.',
    cta: 'Bevestig mijn aanmelding',
    expiry: 'Deze link is 24 uur geldig.<br>Heb je hier niet om gevraagd? Dan kun je deze e-mail gewoon negeren.',
    questions: 'Vragen? Stuur ons een e-mail naar',
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
    subject: 'Bestätige deine Anmeldung bei SkillQuest',
    title: 'Bestätige deine Anmeldung',
    heading: 'Bestätige deine Anmeldung',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    intro: (brand) => `Fast geschafft! Klick auf die Schaltfläche unten, um deine Anmeldung für Updates zu <strong style="color: #0F766E;">${brand}</strong> zu bestätigen.`,
    platformInfo: (p) => `Du erhältst relevante SkillQuest-Updates ${p}, einschließlich Informationen zur Android-Alpha-Version, wenn du dich dafür anmeldest.`,
    androidNote: 'Für Android: Nach dieser Bestätigung stehst du auf der Warteliste für den geschlossenen Google Play-Test. Sobald wir deine E-Mail-Adresse zur Testerliste hinzugefügt haben, bekommst du eine separate E-Mail mit dem Installationslink. Das kann eine Weile dauern – wir fügen die Tester schrittweise hinzu.',
    cta: 'Meine Anmeldung bestätigen',
    expiry: 'Dieser Link ist 24 Stunden lang gültig.<br>Hast du das nicht angefordert? Dann kannst du diese E-Mail einfach ignorieren.',
    questions: 'Fragen? Schick uns eine E-Mail an',
  },
  fr: {
    subject: 'Confirme ton inscription à SkillQuest',
    title: 'Confirme ton inscription',
    heading: 'Confirme ton inscription',
    hey: (name) => `Bonjour${name ? ` ${name}` : ''} !`,
    intro: (brand) => `C'est presque fini ! Clique sur le bouton ci-dessous pour confirmer ton inscription aux actualités de <strong style="color: #0F766E;">${brand}</strong>.`,
    platformInfo: (p) => `Tu recevras les dernières infos sur SkillQuest ${p}, y compris des infos sur la version alpha pour Android si tu t'inscris.`,
    androidNote: 'Pour Android : une fois cette confirmation effectuée, tu seras inscrit sur la liste d\'attente pour le test fermé sur Google Play. Dès qu\'on aura ajouté ton adresse e-mail à la liste des testeurs, tu recevras un e-mail séparé avec le lien d\'installation. Ça peut prendre un peu de temps : on ajoute les testeurs par lots.',
    cta: 'Valider mon inscription',
    expiry: 'Ce lien est valable pendant 24 heures.<br>Tu n\'as pas demandé ça ? Tu peux ignorer cet e-mail.',
    questions: 'Des questions ? Envoie-nous un e-mail à l\'adresse',
  },
  es: {
    subject: 'Confirma tu inscripción en SkillQuest',
    title: 'Confirma tu registro',
    heading: 'Confirma tu registro',
    hey: (name) => `¡Hola${name ? ` ${name}` : ''}!`,
    intro: (brand) => `¡Ya casi está! Haz clic en el botón de abajo para confirmar tu suscripción a las novedades de <strong style="color: #0F766E;">${brand}</strong>.`,
    platformInfo: (p) => `Recibirás las últimas novedades de SkillQuest ${p}, incluida información sobre la versión alfa para Android si te suscribes.`,
    androidNote: 'Para Android: tras esta confirmación, estarás en la lista de espera para la prueba cerrada de Google Play. En cuanto añadamos tu correo a la lista de probadores, recibirás otro correo con el enlace de instalación. Esto puede tardar un poco, ya que añadimos a los probadores por lotes.',
    cta: 'Confirmar mi registro',
    expiry: 'Este enlace es válido durante 24 horas.<br>¿No lo has pedido? Puedes ignorar este correo.',
    questions: '¿Tienes alguna pregunta? Envíanos un correo a',
  },
  it: {
    subject: 'Conferma la tua iscrizione a SkillQuest',
    title: 'Conferma la tua iscrizione',
    heading: 'Conferma la tua iscrizione',
    hey: (name) => `Ciao${name ? ` ${name}` : ''}!`,
    intro: (brand) => `Ci siamo quasi! Clicca sul pulsante qui sotto per confermare la tua iscrizione agli aggiornamenti di <strong style="color: #0F766E;">${brand}</strong>.`,
    platformInfo: (p) => `Riceverai gli aggiornamenti su SkillQuest ${p}, comprese le informazioni sulla versione alpha per Android se decidi di iscriverti.`,
    androidNote: 'Per Android: dopo questa conferma, sarai inserito nella lista d\'attesa per il test a porte chiuse su Google Play. Una volta che avremo aggiunto la tua email alla lista dei tester, riceverai un\'altra email con il link per l\'installazione. Potrebbe volerci un po\' di tempo: aggiungiamo i tester a gruppi.',
    cta: 'Conferma la tua registrazione',
    expiry: 'Questo link è valido per 24 ore.<br>Non l\'hai richiesto? Puoi ignorare questa email.',
    questions: 'Hai domande? Scrivici all\'indirizzo',
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
    subject: 'Welkom bij de updates van SkillQuest!',
    title: 'Welkom bij SkillQuest',
    heading: 'Je aanmelding is bevestigd',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Bedankt voor het bevestigen van je aanmelding voor updates van <strong style="color: #0F766E;">SkillQuest</strong> ${p}.`,
    appIntro: 'SkillQuest helpt mensen en gezinnen vaardigheden op te bouwen met concentratietimers, XP, levels, statistieken, vrienden, uitdagingen en gezinsfuncties.',
    featuresHeading: 'Waarom is SkillQuest zo handig?',
    features: ['Focus-timers voor je vaardigheden', 'XP, levels en streaks', 'Statistieken per vaardigheid', 'Vrienden, uitdagingen en ranglijsten', 'Hulpmiddelen voor ouders en kinderen'],
    nextHeading: 'Wat kun je verwachten?',
    next: ['Nieuws over nieuwe functies', 'Info over de Android-alpha en de gesloten testfase op Google Play', 'Tips om je vaardigheden en die van je gezin te ontwikkelen'],
    androidNote: '<strong>Over de Android-alpha:</strong> je staat nu op de wachtlijst voor de besloten test via Google Play. Zodra we je aan de lijst met testers hebben toegevoegd, sturen we je een aparte e-mail met de installatielink. Gebruik op je Android-apparaat hetzelfde Google-account als waarmee je je hebt aangemeld.',
    cta: 'Ga naar www.skill-quest.app',
    questions: 'Vragen? Stuur ons een e-mail naar',
    reason: 'Je krijgt deze e-mail omdat je je hebt aangemeld voor updates van SkillQuest.<br>We respecteren je privacy en sturen je alleen relevante updates.',
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
    subject: 'Willkommen bei den SkillQuest-Updates!',
    title: 'Willkommen bei SkillQuest',
    heading: 'Deine Anmeldung wurde bestätigt',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Danke, dass du deine Anmeldung für Updates zu <strong style="color: #0F766E;">SkillQuest</strong> ${p} bestätigt hast.`,
    appIntro: 'SkillQuest hilft Einzelpersonen und Familien dabei, Fähigkeiten aufzubauen – mit Konzentrations-Timern, XP, Levels, Statistiken, Freunden, Herausforderungen und Tools für die ganze Familie.',
    featuresHeading: 'Was macht SkillQuest so nützlich?',
    features: ['Fokus-Timer für deine Fähigkeiten', 'XP, Level und Serien', 'Statistiken pro Fertigkeit', 'Freunde, Herausforderungen und Ranglisten', 'Hilfsmittel für Eltern und Kinder'],
    nextHeading: 'Was kannst du erwarten?',
    next: ['Neues zu den neuen Funktionen', 'Infos zur Android-Alpha-Version und zum geschlossenen Test auf Google Play', 'Tipps zur Kompetenzentwicklung für dich und deine Familie'],
    androidNote: '<strong>Zur Android-Alpha-Version:</strong> Du stehst jetzt auf der Warteliste für den geschlossenen Test auf Google Play. Sobald wir dich in die Testerliste aufgenommen haben, schicken wir dir eine separate E-Mail mit dem Installationslink. Verwende auf deinem Android-Gerät dasselbe Google-Konto wie bei der Anmeldung.',
    cta: 'Besuch www.skill-quest.app',
    questions: 'Fragen? Schick uns eine E-Mail an',
    reason: 'Du erhältst diese E-Mail, weil du deine Anmeldung für SkillQuest-Updates bestätigt hast.<br>Wir respektieren deine Privatsphäre und senden dir nur relevante Updates.',
  },
  fr: {
    subject: 'Bienvenue dans les actualités de SkillQuest !',
    title: 'Bienvenue chez SkillQuest',
    heading: 'Ton inscription est confirmée',
    hey: (name) => `Bonjour${name ? ` ${name}` : ''} !`,
    thanks: (p) => `Merci d\'avoir confirmé ton inscription aux actualités de <strong style="color: #0F766E;">SkillQuest</strong> ${p}.`,
    appIntro: 'SkillQuest aide les gens et les familles à développer leurs compétences grâce à des minuteurs de concentration, des XP, des niveaux, des statistiques, des amis, des défis et des outils pour la famille.',
    featuresHeading: 'En quoi SkillQuest est-il utile ?',
    features: ['Minuteurs de concentration pour tes compétences', 'XP, niveaux et séries', 'Statistiques par compétence', 'Amis, défis et classements', 'Des outils pour toute la famille, destinés aux parents et aux enfants'],
    nextHeading: 'Ce qui t\'attend',
    next: ['Nouveautés concernant les nouvelles fonctionnalités', 'Infos sur la version alpha pour Android et les tests fermés sur Google Play', 'Des conseils pour développer tes compétences et celles de ta famille'],
    androidNote: '<strong>À propos de la version alpha pour Android :</strong> tu es désormais sur la liste d\'attente pour le test fermé sur Google Play. Dès qu\'on t\'aura ajouté à la liste des testeurs, on t\'enverra un e-mail séparé avec le lien d\'installation. Utilise sur ton appareil Android le même compte Google que celui avec lequel tu t\'es inscrit.',
    cta: 'Rends-toi sur www.skill-quest.app',
    questions: 'Des questions ? Envoie-nous un e-mail à l\'adresse',
    reason: 'Tu reçois cet e-mail parce que tu as confirmé ton inscription aux actualités de SkillQuest.<br>Nous respectons ta vie privée et ne t\'envoyons que des informations pertinentes.',
  },
  es: {
    subject: '¡Te damos la bienvenida a las novedades de SkillQuest!',
    title: 'Bienvenido a SkillQuest',
    heading: 'Ya se ha confirmado tu registro',
    hey: (name) => `¡Hola${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Gracias por confirmar tu suscripción a las novedades de <strong style="color: #0F766E;">SkillQuest</strong> ${p}.`,
    appIntro: 'SkillQuest ayuda a las personas y a las familias a desarrollar habilidades mediante temporizadores de concentración, XP, niveles, estadísticas, amigos, retos y herramientas para la familia.',
    featuresHeading: '¿Por qué es útil SkillQuest?',
    features: ['Temporizadores de concentración para tus habilidades', 'XP, niveles y rachas', 'Estadísticas por habilidad', 'Amigos, retos y clasificaciones', 'Herramientas familiares para padres e hijos'],
    nextHeading: '¿Qué puedes esperar?',
    next: ['Novedades sobre las nuevas funciones', 'Información sobre la versión alfa para Android y las pruebas cerradas de Google Play', 'Consejos para que tú y tu familia desarrolléis vuestras habilidades'],
    androidNote: '<strong>Sobre la versión alfa para Android:</strong> ahora estás en la lista de espera para la prueba cerrada de Google Play. En cuanto te añadamos a la lista de probadores, te mandaremos un correo aparte con el enlace de instalación. Usa en tu dispositivo Android la misma cuenta de Google con la que te registraste.',
    cta: 'Visita www.skill-quest.app',
    questions: '¿Tienes alguna pregunta? Envíanos un correo a',
    reason: 'Recibes este correo porque has confirmado que quieres recibir las novedades de SkillQuest.<br>Respetamos tu privacidad y solo te enviamos novedades que te interesen.',
  },
  it: {
    subject: 'Ti diamo il benvenuto agli aggiornamenti di SkillQuest!',
    title: 'Benvenuto in SkillQuest',
    heading: 'La tua registrazione è stata confermata',
    hey: (name) => `Ciao${name ? ` ${name}` : ''}!`,
    thanks: (p) => `Grazie per aver confermato la tua iscrizione agli aggiornamenti di <strong style="color: #0F766E;">SkillQuest</strong> ${p}.`,
    appIntro: 'SkillQuest aiuta le persone e le famiglie a sviluppare le proprie competenze grazie a timer di concentrazione, XP, livelli, statistiche, amici, sfide e strumenti per la famiglia.',
    featuresHeading: 'Cosa rende SkillQuest così utile?',
    features: ['Timer di concentrazione per le tue abilità', 'XP, livelli e serie consecutive', 'Statistiche per abilità', 'Amici, sfide e classifiche', 'Strumenti per la famiglia, per genitori e bambini'],
    nextHeading: 'Cosa ti puoi aspettare?',
    next: ['Novità sulle nuove funzionalità', 'Informazioni sulla versione alpha per Android e sul test a porte chiuse su Google Play', 'Consigli su come sviluppare le tue capacità e quelle della tua famiglia'],
    androidNote: '<strong>A proposito della versione alpha per Android:</strong> ora sei in lista d\'attesa per il test a porte chiuse su Google Play. Appena ti avremo aggiunto alla lista dei tester, ti manderemo un\'altra email con il link per l\'installazione. Sul tuo dispositivo Android, usa lo stesso account Google che hai usato per registrarti.',
    cta: 'Visita il sito www.skill-quest.app',
    questions: 'Hai domande? Scrivici all\'indirizzo',
    reason: 'Hai ricevuto questa email perché hai confermato la tua iscrizione agli aggiornamenti di SkillQuest.<br>Rispettiamo la tua privacy e ti inviamo solo aggiornamenti pertinenti.',
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
    heading: 'Je bent toegevoegd als Android-tester!',
    hey: (name) => `Hey${name ? ` ${name}` : ''}!`,
    body: 'Je e-mailadres staat nu op de Google Play-testerslijst voor SkillQuest. Open de onderstaande link <strong>met hetzelfde Google-account op je Android-apparaat</strong> om mee te doen aan de test en de app te installeren.',
    cta: 'Word tester en installeer',
    note: 'Werkt de link niet meteen? Het kan tot een uur duren voordat Google Play je toevoeging heeft verwerkt.',
    questions: 'Vragen? Stuur ons een e-mail naar',
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
    body: 'Deine E-Mail-Adresse steht jetzt auf der Google Play-Testerliste für SkillQuest. Öffne den unten stehenden Link <strong>mit demselben Google-Konto auf deinem Android-Gerät</strong>, um am Test teilzunehmen und die App zu installieren.',
    cta: 'Tester werden und installieren',
    note: 'Der Link funktioniert nicht sofort? Es kann bis zu einer Stunde dauern, bis Google Play deinen Eintrag verarbeitet hat.',
    questions: 'Fragen? Schick uns eine E-Mail an',
  },
  fr: {
    subject: 'Tu peux désormais installer SkillQuest sur Android !',
    title: 'Tu peux désormais installer SkillQuest',
    heading: 'Tu as été ajouté à la liste des testeurs Android !',
    hey: (name) => `Bonjour${name ? ` ${name}` : ''} !`,
    body: 'Ton adresse e-mail figure désormais sur la liste des testeurs de SkillQuest sur Google Play. Clique sur le lien ci-dessous <strong>en utilisant le même compte Google sur ton appareil Android</strong> pour participer au test et installer l\'appli.',
    cta: 'Devenir testeur et installer',
    note: 'Le lien ne fonctionne pas tout de suite ? Le traitement de ton ajout par Google Play peut prendre jusqu\'à une heure.',
    questions: 'Des questions ? Envoie-nous un e-mail à l\'adresse',
  },
  es: {
    subject: '¡Ya puedes instalar SkillQuest en Android!',
    title: 'Ya puedes instalar SkillQuest',
    heading: '¡Ya te hemos añadido como probador de Android!',
    hey: (name) => `¡Hola${name ? ` ${name}` : ''}!`,
    body: 'Tu correo electrónico ya figura en la lista de probadores de SkillQuest en Google Play. Abre el enlace que aparece a continuación <strong>con la misma cuenta de Google en tu dispositivo Android</strong> para unirte a la prueba e instalar la app.',
    cta: 'Hazte probador e instala',
    note: '¿El enlace no funciona de inmediato? Google Play puede tardar hasta una hora en procesar tu alta.',
    questions: '¿Tienes alguna pregunta? Envíanos un correo a',
  },
  it: {
    subject: 'Ora puoi installare SkillQuest su Android!',
    title: 'Ora puoi installare SkillQuest',
    heading: 'Sei stato aggiunto come tester per Android!',
    hey: (name) => `Ciao${name ? ` ${name}` : ''}!`,
    body: 'Il tuo indirizzo email è ora nella lista dei tester di SkillQuest su Google Play. Apri il link qui sotto <strong>usando lo stesso account Google sul tuo dispositivo Android</strong> per partecipare al test e installare l\'app.',
    cta: 'Diventa un tester e installa',
    note: 'Il link non funziona subito? Google Play potrebbe impiegare fino a un\'ora per elaborare la tua richiesta.',
    questions: 'Hai domande? Scrivici all\'indirizzo',
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
