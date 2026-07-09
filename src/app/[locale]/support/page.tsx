import Footer from '@/components/Footer';
import {Link, routing} from '@/i18n/routing';

const SUPPORT_EMAIL = 'hello@skill-quest.app';
const WEBSITE_URL = 'https://www.skill-quest.app';

const locales = routing.locales;

type SupportCopy = {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subtitle: string;
  updatedLabel: string;
  updated: string;
  emailTitle: string;
  emailBody: string;
  emailButton: string;
  responseTitle: string;
  responseItems: string[];
  helpTitle: string;
  helpItems: Array<{title: string; body: string}>;
  includeTitle: string;
  includeItems: string[];
  linksTitle: string;
  privacyLink: string;
  deleteAccountLink: string;
};

const copyByLocale: Record<string, SupportCopy> = {
  nl: {
    metaTitle: 'Support - SkillQuest',
    metaDescription: 'Neem contact op met SkillQuest support voor hulp met je account, abonnement, timers of gegevens.',
    heading: 'Support',
    subtitle: 'Hulp nodig met SkillQuest? Stuur ons een bericht en we helpen je verder.',
    updatedLabel: 'Laatst bijgewerkt',
    updated: '20 mei 2026',
    emailTitle: 'Neem contact op',
    emailBody: 'Voor vragen over de app, je account, abonnementen, betalingen of privacy kun je ons mailen via {email}.',
    emailButton: 'E-mail support',
    responseTitle: 'Responstijden',
    responseItems: [
      'Algemene supportvragen: meestal binnen 5 werkdagen.',
      'Privacy- en gegevensverzoeken: binnen 30 dagen.',
      'Betalings- en abonnementsvragen: zo snel mogelijk, afhankelijk van App Store informatie.'
    ],
    helpTitle: 'Waarmee kunnen we helpen?',
    helpItems: [
      {
        title: 'Account en login',
        body: 'Hulp met inloggen, accounttoegang, gebruikersnaam, profielgegevens en accountverwijdering.'
      },
      {
        title: 'Timers en voortgang',
        body: 'Vragen over focus timers, XP, streaks, statistieken, synchronisatie of meldingen.'
      },
      {
        title: 'Abonnementen',
        body: 'Hulp met Premium, Familie-abonnementen, herstel van aankopen en App Store abonnementen.'
      },
      {
        title: 'Privacy en gegevens',
        body: 'Vragen over gegevens, export, correctie of verwijdering van je SkillQuest-account.'
      }
    ],
    includeTitle: 'Vermeld dit in je bericht',
    includeItems: [
      'Het e-mailadres van je SkillQuest-account.',
      'Je platform: iOS, Android of web.',
      'Je app-versie als je die weet.',
      'Een korte beschrijving van het probleem en eventuele foutmelding.'
    ],
    linksTitle: 'Nuttige links',
    privacyLink: 'Privacybeleid',
    deleteAccountLink: 'Account verwijderen'
  },
  en: {
    metaTitle: 'Support - SkillQuest',
    metaDescription: 'Contact SkillQuest support for help with your account, subscription, timers, or data.',
    heading: 'Support',
    subtitle: 'Need help with SkillQuest? Send us a message and we will help you move forward.',
    updatedLabel: 'Last updated',
    updated: 'May 20, 2026',
    emailTitle: 'Contact us',
    emailBody: 'For questions about the app, your account, subscriptions, payments, or privacy, email us at {email}.',
    emailButton: 'Email support',
    responseTitle: 'Response times',
    responseItems: [
      'General support questions: usually within 5 business days.',
      'Privacy and data requests: within 30 days.',
      'Payment and subscription questions: as soon as possible, depending on App Store information.'
    ],
    helpTitle: 'What can we help with?',
    helpItems: [
      {
        title: 'Account and login',
        body: 'Help with sign-in, account access, username, profile details, and account deletion.'
      },
      {
        title: 'Timers and progress',
        body: 'Questions about focus timers, XP, streaks, statistics, synchronization, or notifications.'
      },
      {
        title: 'Subscriptions',
        body: 'Help with Premium, Family plans, purchase restore, and App Store subscriptions.'
      },
      {
        title: 'Privacy and data',
        body: 'Questions about data access, export, correction, or deletion of your SkillQuest account.'
      }
    ],
    includeTitle: 'Include this in your message',
    includeItems: [
      'The email address linked to your SkillQuest account.',
      'Your platform: iOS, Android, or web.',
      'Your app version if you know it.',
      'A short description of the issue and any error message.'
    ],
    linksTitle: 'Useful links',
    privacyLink: 'Privacy Policy',
    deleteAccountLink: 'Account deletion'
  },
  de: {
    metaTitle: 'Support - SkillQuest',
    metaDescription: 'Kontaktiere den SkillQuest Support fur Hilfe mit Konto, Abonnement, Timern oder Daten.',
    heading: 'Support',
    subtitle: 'Brauchst du Hilfe mit SkillQuest? Schreib uns eine Nachricht und wir helfen dir weiter.',
    updatedLabel: 'Zuletzt aktualisiert',
    updated: '20. Mai 2026',
    emailTitle: 'Kontakt',
    emailBody: 'Bei Fragen zur App, zu deinem Konto, Abonnements, Zahlungen oder Datenschutz erreichst du uns unter {email}.',
    emailButton: 'Support mailen',
    responseTitle: 'Antwortzeiten',
    responseItems: [
      'Allgemeine Supportfragen: meist innerhalb von 5 Werktagen.',
      'Datenschutz- und Datenanfragen: innerhalb von 30 Tagen.',
      'Zahlungs- und Abonnementfragen: so schnell wie moglich, abhangig von App Store Informationen.'
    ],
    helpTitle: 'Wobei konnen wir helfen?',
    helpItems: [
      {
        title: 'Konto und Login',
        body: 'Hilfe bei Anmeldung, Kontozugriff, Benutzername, Profildaten und Kontoloschung.'
      },
      {
        title: 'Timer und Fortschritt',
        body: 'Fragen zu Fokus-Timern, XP, Streaks, Statistiken, Synchronisierung oder Benachrichtigungen.'
      },
      {
        title: 'Abonnements',
        body: 'Hilfe mit Premium, Familienplanen, Kaufwiederherstellung und App Store Abonnements.'
      },
      {
        title: 'Datenschutz und Daten',
        body: 'Fragen zu Datenzugriff, Export, Korrektur oder Loschung deines SkillQuest-Kontos.'
      }
    ],
    includeTitle: 'Bitte in deiner Nachricht angeben',
    includeItems: [
      'Die E-Mail-Adresse deines SkillQuest-Kontos.',
      'Deine Plattform: iOS, Android oder Web.',
      'Deine App-Version, falls bekannt.',
      'Eine kurze Beschreibung des Problems und eventuelle Fehlermeldungen.'
    ],
    linksTitle: 'Nutzliche Links',
    privacyLink: 'Datenschutzrichtlinie',
    deleteAccountLink: 'Konto loschen'
  },
  fr: {
    metaTitle: 'Support - SkillQuest',
    metaDescription: 'Contactez le support SkillQuest pour votre compte, abonnement, minuteurs ou donnees.',
    heading: 'Support',
    subtitle: 'Besoin d aide avec SkillQuest ? Envoyez-nous un message et nous vous aiderons.',
    updatedLabel: 'Derniere mise a jour',
    updated: '20 mai 2026',
    emailTitle: 'Nous contacter',
    emailBody: 'Pour toute question sur l app, votre compte, les abonnements, les paiements ou la confidentialite, ecrivez a {email}.',
    emailButton: 'Envoyer un e-mail',
    responseTitle: 'Delais de reponse',
    responseItems: [
      'Questions generales : generalement sous 5 jours ouvrables.',
      'Demandes de confidentialite et de donnees : sous 30 jours.',
      'Paiements et abonnements : des que possible, selon les informations de l App Store.'
    ],
    helpTitle: 'Comment pouvons-nous aider ?',
    helpItems: [
      {
        title: 'Compte et connexion',
        body: 'Aide pour la connexion, l acces au compte, le nom d utilisateur, le profil et la suppression du compte.'
      },
      {
        title: 'Minuteurs et progres',
        body: 'Questions sur les minuteurs, XP, series, statistiques, synchronisation ou notifications.'
      },
      {
        title: 'Abonnements',
        body: 'Aide avec Premium, Famille, restauration des achats et abonnements App Store.'
      },
      {
        title: 'Confidentialite et donnees',
        body: 'Questions sur l acces, l export, la correction ou la suppression des donnees SkillQuest.'
      }
    ],
    includeTitle: 'A inclure dans votre message',
    includeItems: [
      'L adresse e-mail liee a votre compte SkillQuest.',
      'Votre plateforme : iOS, Android ou web.',
      'Votre version de l app si vous la connaissez.',
      'Une breve description du probleme et le message d erreur eventuel.'
    ],
    linksTitle: 'Liens utiles',
    privacyLink: 'Politique de confidentialite',
    deleteAccountLink: 'Suppression de compte'
  },
  es: {
    metaTitle: 'Soporte - SkillQuest',
    metaDescription: 'Contacta con soporte de SkillQuest para ayuda con tu cuenta, suscripcion, temporizadores o datos.',
    heading: 'Soporte',
    subtitle: 'Necesitas ayuda con SkillQuest? Envia un mensaje y te ayudaremos.',
    updatedLabel: 'Ultima actualizacion',
    updated: '20 de mayo de 2026',
    emailTitle: 'Contacta con nosotros',
    emailBody: 'Para preguntas sobre la app, tu cuenta, suscripciones, pagos o privacidad, escribenos a {email}.',
    emailButton: 'Enviar correo',
    responseTitle: 'Tiempos de respuesta',
    responseItems: [
      'Preguntas generales: normalmente en 5 dias laborables.',
      'Solicitudes de privacidad y datos: en un plazo de 30 dias.',
      'Pagos y suscripciones: lo antes posible, segun la informacion de App Store.'
    ],
    helpTitle: 'En que podemos ayudar?',
    helpItems: [
      {
        title: 'Cuenta e inicio de sesion',
        body: 'Ayuda con acceso, nombre de usuario, perfil y eliminacion de cuenta.'
      },
      {
        title: 'Temporizadores y progreso',
        body: 'Preguntas sobre timers, XP, rachas, estadisticas, sincronizacion o notificaciones.'
      },
      {
        title: 'Suscripciones',
        body: 'Ayuda con Premium, Familia, restaurar compras y suscripciones de App Store.'
      },
      {
        title: 'Privacidad y datos',
        body: 'Preguntas sobre acceso, exportacion, correccion o eliminacion de datos SkillQuest.'
      }
    ],
    includeTitle: 'Incluye esto en tu mensaje',
    includeItems: [
      'El correo asociado a tu cuenta SkillQuest.',
      'Tu plataforma: iOS, Android o web.',
      'Tu version de la app si la sabes.',
      'Una breve descripcion del problema y cualquier mensaje de error.'
    ],
    linksTitle: 'Enlaces utiles',
    privacyLink: 'Politica de privacidad',
    deleteAccountLink: 'Eliminar cuenta'
  },
  it: {
    metaTitle: 'Supporto - SkillQuest',
    metaDescription: 'Contatta il supporto SkillQuest per aiuto con account, abbonamento, timer o dati.',
    heading: 'Supporto',
    subtitle: 'Hai bisogno di aiuto con SkillQuest? Inviaci un messaggio e ti aiuteremo.',
    updatedLabel: 'Ultimo aggiornamento',
    updated: '20 maggio 2026',
    emailTitle: 'Contattaci',
    emailBody: 'Per domande sull app, account, abbonamenti, pagamenti o privacy, scrivici a {email}.',
    emailButton: 'Invia email',
    responseTitle: 'Tempi di risposta',
    responseItems: [
      'Domande generali: di solito entro 5 giorni lavorativi.',
      'Richieste privacy e dati: entro 30 giorni.',
      'Pagamenti e abbonamenti: il prima possibile, in base alle informazioni App Store.'
    ],
    helpTitle: 'Come possiamo aiutare?',
    helpItems: [
      {
        title: 'Account e accesso',
        body: 'Aiuto con login, accesso account, nome utente, profilo ed eliminazione account.'
      },
      {
        title: 'Timer e progressi',
        body: 'Domande su timer, XP, serie, statistiche, sincronizzazione o notifiche.'
      },
      {
        title: 'Abbonamenti',
        body: 'Aiuto con Premium, Famiglia, ripristino acquisti e abbonamenti App Store.'
      },
      {
        title: 'Privacy e dati',
        body: 'Domande su accesso, export, correzione o eliminazione dei dati SkillQuest.'
      }
    ],
    includeTitle: 'Includi questo nel messaggio',
    includeItems: [
      'L email collegata al tuo account SkillQuest.',
      'La piattaforma: iOS, Android o web.',
      'La versione dell app se la conosci.',
      'Una breve descrizione del problema e eventuali messaggi di errore.'
    ],
    linksTitle: 'Link utili',
    privacyLink: 'Informativa privacy',
    deleteAccountLink: 'Eliminazione account'
  }
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const copy = copyByLocale[locale] ?? copyByLocale.nl;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription
  };
}

export default async function SupportPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const copy = copyByLocale[locale] ?? copyByLocale.nl;
  const mailSubject = `SkillQuest support (${locale})`;
  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(mailSubject)}`;

  return (
    <>
      <main className="min-h-screen bg-background-50">
        <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16 pt-32 md:pt-36">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {copy.heading}
              </h1>
              <p className="text-lg text-white/90 mb-4">{copy.subtitle}</p>
              <p className="text-sm text-white/80">
                {copy.updatedLabel}: {copy.updated}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-12 md:h-16 fill-background-50"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {copy.emailTitle}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {copy.emailBody.replace('{email}', SUPPORT_EMAIL)}
                </p>
                <a href={mailtoHref} className="btn btn-primary inline-flex">
                  {copy.emailButton}
                </a>

                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    {copy.helpTitle}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {copy.helpItems.map((item) => (
                      <section
                        key={item.title}
                        className="rounded-xl border border-primary-100 bg-primary-50/60 p-5"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.body}</p>
                      </section>
                    ))}
                  </div>
                </div>
              </article>

              <aside className="space-y-8">
                <section className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    {copy.responseTitle}
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    {copy.responseItems.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    {copy.includeTitle}
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    {copy.includeItems.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-primary-600 font-bold">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    {copy.linksTitle}
                  </h2>
                  <div className="flex flex-col gap-3">
                    <Link href="/privacy" className="text-primary-700 hover:text-primary-900 underline">
                      {copy.privacyLink}
                    </Link>
                    <Link href="/delete-account" className="text-primary-700 hover:text-primary-900 underline">
                      {copy.deleteAccountLink}
                    </Link>
                    <a href={WEBSITE_URL} className="text-primary-700 hover:text-primary-900 underline">
                      www.skill-quest.app
                    </a>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
