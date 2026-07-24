import Footer from '@/components/Footer';
import {Link, routing} from '@/i18n/routing';
import {faqJsonLd} from '@/lib/marketing';

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
  faqHeading: string;
  faq: Array<{question: string; answer: string}>;
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
    deleteAccountLink: 'Account verwijderen',
    faqHeading: 'Veelgestelde vragen',
    faq: [
      {question: 'Kan ik SkillQuest gratis uitproberen?', answer: 'Ja. SkillQuest heeft een gratis versie met vaardigheidsregistratie, concentratietimers, XP, levels en een gastmodus, zodat je het kunt uitproberen voordat je een account aanmaakt of je abonneert.'},
      {question: 'Wat is het verschil tussen Free, Premium en Family?', answer: 'Met de gratis versie kun je aan de slag met het bijhouden van vaardigheden, concentratietimers, XP en levels. Premium biedt meer timertechnieken, uitgebreidere statistieken, meer geschiedenis en personalisatiemogelijkheden. Family bevat Premium voor het hele gezin, plus ouderrollen, kinderstatistieken, timers voor kinderen, wekelijkse doelen en complimentjes.'},
      {question: 'Welke focus-timer-technieken ondersteunt SkillQuest?', answer: 'SkillQuest ondersteunt Pomodoro, Deep Work, 52-17, Flowtime, Until Time en EMOM, afhankelijk van je abonnement.'},
      {question: 'Kan ik Pomodoro gebruiken in SkillQuest?', answer: 'Ja, Pomodoro is een van de ingebouwde concentratietimers die je al in de gratis versie kunt gebruiken.'},
      {question: 'Wat zijn XP, levels en streaks?', answer: 'Elke focus-sessie levert XP op voor de vaardigheid die je hebt geoefend. XP telt op tot levels per vaardigheid, en een dagelijkse streak houdt bij hoe regelmatig je meedoet, waarbij de streak wordt bevroren om hem te beschermen tegen een af en toe gemiste dag.'},
      {question: 'Wat kunnen ouders doen met Family?', answer: 'Met Family kunnen ouders timers voor hun kinderen starten, statistieken van hun kinderen bekijken, wekelijkse doelen instellen en complimentjes sturen, allemaal binnen een gedeelde gezinsgroep met duidelijke rollen voor ouders en kinderen.'},
      {question: 'Mogen ouders de timer voor hun kinderen aanzetten?', answer: 'Ja. Met Family kunnen ouders en de eigenaar van het gezin timers starten voor kinderen binnen de gezinsgroep. De sessie is gekoppeld aan het account van het kind, zodat zijn of haar voortgang en oefentijd zichtbaar blijven.'},
      {question: 'Kan ik de vorderingen van mijn kind zien?', answer: 'Met Family kunnen ouders de statistieken van hun kind bekijken, zoals sessies, minuten, XP, een overzicht van vaardigheden en recente activiteiten.'},
      {question: 'Is SkillQuest geschikt voor jonge kinderen?', answer: 'SkillQuest is bedoeld voor gebruikers van 13 jaar en ouder, en verzamelt niet bewust gegevens van kinderen jonger dan 13 jaar. De app is niet ontworpen of op de markt gebracht als app voor jonge kinderen.'},
      {question: 'Hoe werkt het alfa- en gesloten testen bij Android?', answer: 'Android is momenteel beschikbaar via de besloten testfase op Google Play. Meld je aan op onze downloadpagina, bevestig je e-mailadres, en zodra we je aan de lijst met testers hebben toegevoegd, krijg je een e-mail met de installatielink. De iOS-versie is al beschikbaar in de App Store.'},
      {question: 'Hoe worden mijn gegevens beschermd?', answer: 'SkillQuest maakt gebruik van beveiliging op rijniveau, zodat alleen jij toegang hebt tot je gegevens (en, in een gezinsgroep, ook ouders voor statistieken over hun kinderen), beheer van geheimen op basis van de omgeving en versleutelde verbindingen overal.'},
      {question: 'Hoe kan ik mijn account verwijderen?', answer: 'Je kunt je account laten verwijderen via de app of via de pagina voor het verwijderen van accounts op deze website.'},
    ]
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
    deleteAccountLink: 'Account deletion',
    faqHeading: 'Frequently asked questions',
    faq: [
      {question: 'Can I try SkillQuest for free?', answer: 'Yes. SkillQuest has a free tier with skill tracking, focus timers, XP, levels, and Guest Mode, so you can try it before creating an account or subscribing.'},
      {question: 'What is the difference between Free, Premium, and Family?', answer: 'Free gets you started with skill tracking, focus timers, XP, and levels. Premium adds more timer techniques, deeper statistics, more history, and personalization. Family includes Premium for the whole household plus parent roles, child statistics, timers for children, weekly goals, and compliments.'},
      {question: 'Which focus timer techniques does SkillQuest support?', answer: 'SkillQuest supports Pomodoro, Deep Work, 52-17, Flowtime, Until Time, and EMOM, depending on your plan.'},
      {question: 'Can I use Pomodoro in SkillQuest?', answer: 'Yes, Pomodoro is one of the built-in focus timer techniques, available on the free tier.'},
      {question: 'What are XP, levels, and streaks?', answer: 'Every focus session earns XP toward the skill you practiced. XP adds up to levels per skill, and a daily streak tracks how consistently you show up, with streak freezes to protect it from an occasional missed day.'},
      {question: 'What can parents do with Family?', answer: 'With Family, parents can start timers for their children, view child statistics, set weekly goals, and send compliments, all within a shared family group with clear parent and child roles.'},
      {question: 'Can parents start timers for their children?', answer: 'Yes. With Family, parents and the family owner can start timers for children within the family group. The session is linked to the child\'s account, so their progress and practice time stay visible.'},
      {question: 'Can I see my child\'s progress?', answer: 'With Family, parents can view child statistics, including sessions, minutes, XP, a skill breakdown, and recent activity.'},
      {question: 'Is SkillQuest suitable for young children?', answer: 'SkillQuest is intended for users aged 13 and up, and does not knowingly collect data from children under 13. It is not designed or marketed as an app for young children.'},
      {question: 'How does Android alpha / closed testing work?', answer: 'Android is currently available through Google Play closed testing. Sign up on our download page, confirm your email, and once we add you to the tester list, you\'ll get an email with the install link. iOS is already live on the App Store.'},
      {question: 'How is my data protected?', answer: 'SkillQuest uses row-level security so your data is only accessible to you (and, in a Family group, to parents for child statistics), environment-based secrets management, and encrypted connections throughout.'},
      {question: 'How do I delete my account?', answer: 'You can request account deletion from within the app, or via the account deletion page on this website.'},
    ]
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
    deleteAccountLink: 'Konto löschen',
    faqHeading: 'Häufig gestellte Fragen',
    faq: [
      {question: 'Kann ich SkillQuest kostenlos ausprobieren?', answer: 'Ja. SkillQuest bietet eine kostenlose Version mit Funktionsüberwachung, Konzentrations-Timern, XP, Levels und einem Gastmodus, sodass du es ausprobieren kannst, bevor du ein Konto erstellst oder ein Abonnement abschließt.'},
      {question: 'Was ist der Unterschied zwischen „Free“, „Premium“ und „Family“?', answer: 'Mit der kostenlosen Version kannst du loslegen: mit der Erfassung deiner Fähigkeiten, Konzentrations-Timern, XP und Levels. Die Premium-Version bietet zusätzliche Timer-Funktionen, detailliertere Statistiken, einen umfangreicheren Verlauf und individuelle Anpassungsmöglichkeiten. Die Family-Version umfasst die Premium-Funktionen für den ganzen Haushalt sowie Elternrollen, Statistiken für Kinder, Timer für Kinder, wöchentliche Ziele und Lob.'},
      {question: 'Welche Techniken für den Fokus-Timer unterstützt SkillQuest?', answer: 'SkillQuest unterstützt je nach deinem Tarif die Methoden Pomodoro, Deep Work, 52-17, Flowtime, Until Time und EMOM.'},
      {question: 'Kann ich Pomodoro in SkillQuest nutzen?', answer: 'Ja, Pomodoro ist eine der integrierten Techniken zum Konzentrations-Timer, die in der kostenlosen Version verfügbar ist.'},
      {question: 'Was sind XP, Level und Serien?', answer: 'Mit jeder Fokus-Sitzung sammelst du XP für die Fertigkeit, die du geübt hast. Die XP summieren sich zu Stufen pro Fertigkeit, und eine tägliche Serie zeigt an, wie regelmäßig du dabei bist – dabei wird die Serie eingefroren, um sie vor gelegentlichen Ausfällen zu schützen.'},
      {question: 'Was können Eltern mit „Family“ machen?', answer: 'Mit „Family“ können Eltern Timer für ihre Kinder starten, Statistiken zu ihren Kindern einsehen, wöchentliche Ziele festlegen und Lob aussprechen – und das alles innerhalb einer gemeinsamen Familiengruppe mit klar definierten Rollen für Eltern und Kinder.'},
      {question: 'Können Eltern für ihre Kinder einen Timer starten?', answer: 'Ja. Mit „Familie“ können Eltern und der Familieninhaber Timer für Kinder innerhalb der Familiengruppe starten. Die Sitzung ist mit dem Konto des Kindes verknüpft, sodass dessen Fortschritte und Übungszeit weiterhin sichtbar bleiben.'},
      {question: 'Kann ich die Fortschritte meines Kindes einsehen?', answer: 'Mit „Familie“ können Eltern Statistiken zu ihren Kindern einsehen, darunter Spielsitzungen, Spielzeit, XP, eine Aufschlüsselung der Fähigkeiten und die letzten Aktivitäten.'},
      {question: 'Ist SkillQuest für kleine Kinder geeignet?', answer: 'SkillQuest richtet sich an Nutzer ab 13 Jahren und sammelt wissentlich keine Daten von Kindern unter 13 Jahren. Die App ist weder als App für kleine Kinder konzipiert noch wird sie als solche vermarktet.'},
      {question: 'Wie funktioniert das Android-Alpha-/geschlossene Testen?', answer: 'Android ist derzeit im Rahmen eines geschlossenen Tests über Google Play verfügbar. Melde dich auf unserer Download-Seite an, bestätige deine E-Mail-Adresse, und sobald wir dich in die Testerliste aufgenommen haben, erhältst du eine E-Mail mit dem Installationslink. Die iOS-Version ist bereits im App Store erhältlich.'},
      {question: 'Wie werden meine Daten geschützt?', answer: 'SkillQuest nutzt Sicherheit auf Zeilenebene, sodass nur du Zugriff auf deine Daten hast (und in einer Familiengruppe auch die Eltern, um Statistiken zu ihren Kindern einzusehen), sowie eine umgebungsbasierte Verwaltung von Geheimnissen und durchgehend verschlüsselte Verbindungen.'},
      {question: 'Wie lösche ich mein Konto?', answer: 'Du kannst die Löschung deines Kontos direkt in der App oder über die Seite zur Kontolöschung auf dieser Website beantragen.'},
    ]
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
    deleteAccountLink: 'Suppression de compte',
    faqHeading: 'Questions fréquentes',
    faq: [
      {question: 'Est-ce que je peux essayer SkillQuest gratuitement ?', answer: 'Oui. SkillQuest propose une version gratuite avec suivi des compétences, minuteurs de concentration, XP, niveaux et mode Invité, ce qui te permet de l\'essayer avant de créer un compte ou de t\'abonner.'},
      {question: 'Quelle est la différence entre les formules « Free », « Premium » et « Family » ?', answer: 'Avec la version gratuite, tu peux commencer à suivre tes compétences, utiliser des minuteurs de concentration, gagner des XP et passer des niveaux. La version Premium t\'offre davantage de techniques de minuteurs, des statistiques plus détaillées, un historique plus complet et des options de personnalisation. La version Famille inclut la formule Premium pour toute la famille, ainsi que des rôles parentaux, des statistiques pour les enfants, des minuteurs adaptés aux enfants, des objectifs hebdomadaires et des encouragements.'},
      {question: 'Quelles techniques de minuterie de concentration SkillQuest prend-il en charge ?', answer: 'SkillQuest prend en charge les méthodes Pomodoro, Deep Work, 52-17, Flowtime, Until Time et EMOM, selon ta formule d\'abonnement.'},
      {question: 'Est-ce que je peux utiliser Pomodoro dans SkillQuest ?', answer: 'Oui, la méthode Pomodoro fait partie des techniques de chronomètre de concentration intégrées, disponibles dans la version gratuite.'},
      {question: 'C\'est quoi, les XP, les niveaux et les séries ?', answer: 'Chaque séance te rapporte des XP pour la compétence que tu as travaillée. Les XP s\'accumulent pour te faire passer au niveau supérieur pour chaque compétence, et une série quotidienne te permet de suivre ta régularité ; la série est gelée pour te protéger en cas de jour manqué de temps en temps.'},
      {question: 'Que peuvent faire les parents avec Family ?', answer: 'Avec « Family », les parents peuvent lancer des minuteurs pour leurs enfants, consulter leurs statistiques, définir des objectifs hebdomadaires et leur envoyer des compliments, le tout au sein d\'un groupe familial partagé où les rôles des parents et des enfants sont clairement définis.'},
      {question: 'Est-ce que les parents peuvent lancer le chronomètre pour leurs enfants ?', answer: 'Oui. Avec l\'option « Famille », les parents et le titulaire du compte familial peuvent lancer des chronomètres pour les enfants du groupe familial. La session est associée au compte de l\'enfant, ce qui permet de suivre ses progrès et son temps d\'entraînement.'},
      {question: 'Est-ce que je peux suivre les progrès de mon enfant ?', answer: 'Avec « Famille », les parents peuvent consulter les statistiques de leur enfant, notamment les sessions, le temps de jeu, les points d\'expérience, le détail des compétences et l\'activité récente.'},
      {question: 'Est-ce que SkillQuest convient aux jeunes enfants ?', answer: 'SkillQuest s\'adresse aux utilisateurs âgés de 13 ans et plus, et ne collecte pas sciemment de données auprès d\'enfants de moins de 13 ans. Cette appli n\'est ni conçue ni commercialisée pour les jeunes enfants.'},
      {question: 'Comment ça marche, les tests alpha / à huis clos sur Android ?', answer: 'Android est actuellement disponible dans le cadre d\'un test fermé sur Google Play. Inscris-toi sur notre page de téléchargement, confirme ton adresse e-mail, et dès qu\'on t\'aura ajouté à la liste des testeurs, tu recevras un e-mail avec le lien d\'installation. La version iOS est déjà disponible sur l\'App Store.'},
      {question: 'Comment mes données sont-elles protégées ?', answer: 'SkillQuest utilise une sécurité au niveau des lignes pour que tes données ne soient accessibles qu\'à toi (et, dans un groupe « Famille », aux parents pour les statistiques sur les enfants), une gestion des secrets basée sur l\'environnement et des connexions cryptées de bout en bout.'},
      {question: 'Comment je fais pour supprimer mon compte ?', answer: 'Tu peux demander la suppression de ton compte depuis l\'application ou via la page dédiée à la suppression de compte sur ce site web.'},
    ]
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
    deleteAccountLink: 'Eliminar cuenta',
    faqHeading: 'Preguntas frecuentes',
    faq: [
      {question: '¿Puedo probar SkillQuest gratis?', answer: 'Sí. SkillQuest tiene una versión gratuita con seguimiento de habilidades, temporizadores de concentración, XP, niveles y el «Modo Invitado», así que puedes probarlo antes de crear una cuenta o suscribirte.'},
      {question: '¿Cuál es la diferencia entre «Gratis», «Premium» y «Familia»?', answer: 'Con la versión gratuita puedes empezar a llevar un seguimiento de tus habilidades, usar temporizadores de concentración, ganar XP y subir de nivel. La versión Premium te ofrece más técnicas de temporizadores, estadísticas más detalladas, más historial y opciones de personalización. La versión Family incluye la Premium para toda la familia, además de funciones para padres, estadísticas de los niños, temporizadores para los niños, objetivos semanales y felicitaciones.'},
      {question: '¿Qué técnicas de temporizador de concentración admite SkillQuest?', answer: 'SkillQuest es compatible con Pomodoro, Deep Work, 52-17, Flowtime, Until Time y EMOM, dependiendo de tu plan.'},
      {question: '¿Puedo usar Pomodoro en SkillQuest?', answer: 'Sí, Pomodoro es una de las técnicas de temporizador de concentración integradas, disponible en el plan gratuito.'},
      {question: '¿Qué son los XP, los niveles y las rachas?', answer: 'Cada sesión de concentración te da XP para la habilidad que hayas practicado. Los XP se van sumando hasta subir de nivel en cada habilidad, y una racha diaria lleva la cuenta de tu constancia; además, la racha se congela para protegerla si alguna vez te saltas un día.'},
      {question: '¿Qué pueden hacer los padres con «Family»?', answer: 'Con «Familia», los padres pueden poner temporizadores para sus hijos, ver las estadísticas de los niños, fijar objetivos semanales y enviarles mensajes de ánimo, todo ello dentro de un grupo familiar compartido en el que quedan claros los roles de padres e hijos.'},
      {question: '¿Pueden los padres poner el temporizador por sus hijos?', answer: 'Sí. Con la función «Familia», los padres y el titular de la cuenta familiar pueden activar temporizadores para los niños del grupo familiar. La sesión está vinculada a la cuenta del niño, así que su progreso y el tiempo que dedica a practicar siguen siendo visibles.'},
      {question: '¿Puedo ver cómo va mi hijo?', answer: 'Con «Familia», los padres pueden ver las estadísticas de sus hijos, como las sesiones, los minutos, los XP, un desglose de habilidades y la actividad reciente.'},
      {question: '¿SkillQuest es adecuado para niños pequeños?', answer: 'SkillQuest está pensada para usuarios a partir de 13 años y no recopila datos a sabiendas de niños menores de 13 años. No está diseñada ni se comercializa como una app para niños pequeños.'},
      {question: '¿Cómo funcionan las pruebas alfa y cerradas de Android?', answer: 'Android está disponible actualmente a través de la prueba cerrada de Google Play. Regístrate en nuestra página de descargas, confirma tu correo electrónico y, en cuanto te añadamos a la lista de probadores, recibirás un correo con el enlace de instalación. La versión para iOS ya está disponible en la App Store.'},
      {question: '¿Cómo se protegen mis datos?', answer: 'SkillQuest utiliza seguridad a nivel de fila, por lo que solo tú puedes acceder a tus datos (y, en un grupo familiar, los padres pueden ver las estadísticas de sus hijos), gestión de claves secreta basada en el entorno y conexiones cifradas en todo momento.'},
      {question: '¿Cómo borro mi cuenta?', answer: 'Puedes solicitar la eliminación de tu cuenta desde la propia aplicación o a través de la página de eliminación de cuentas de esta web.'},
    ]
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
    deleteAccountLink: 'Eliminazione account',
    faqHeading: 'Domande frequenti',
    faq: [
      {question: 'Posso provare SkillQuest gratis?', answer: 'Sì. SkillQuest offre un piano gratuito che include il monitoraggio delle abilità, i timer di concentrazione, l\'XP, i livelli e la Modalità Ospite, così puoi provarlo prima di creare un account o di abbonarti.'},
      {question: 'Qual è la differenza tra Free, Premium e Family?', answer: 'Con la versione gratuita puoi iniziare a monitorare le tue abilità, usare i timer di concentrazione, guadagnare XP e salire di livello. La versione Premium aggiunge altre tecniche di timer, statistiche più approfondite, una cronologia più ampia e opzioni di personalizzazione. La versione Family include la Premium per tutta la famiglia, oltre a ruoli genitoriali, statistiche sui bambini, timer per i bambini, obiettivi settimanali e complimenti.'},
      {question: 'Quali tecniche di timer di concentrazione supporta SkillQuest?', answer: 'SkillQuest supporta le tecniche Pomodoro, Deep Work, 52-17, Flowtime, Until Time ed EMOM, a seconda del tuo piano.'},
      {question: 'Posso usare Pomodoro su SkillQuest?', answer: 'Sì, il Pomodoro è una delle tecniche di timer per la concentrazione integrate, disponibile nel piano gratuito.'},
      {question: 'Cosa sono gli XP, i livelli e le serie?', answer: 'Ogni sessione di esercitazione ti fa guadagnare XP per l\'abilità che hai praticato. Gli XP si sommano per raggiungere i livelli per ogni abilità, e una serie giornaliera tiene traccia della tua costanza nel partecipare; la serie si blocca per proteggerti in caso di un giorno saltato ogni tanto.'},
      {question: 'Cosa possono fare i genitori con Family?', answer: 'Con Family, i genitori possono impostare i timer per i propri figli, visualizzare le statistiche dei bambini, fissare obiettivi settimanali e inviare complimenti, il tutto all’interno di un gruppo familiare condiviso con ruoli ben definiti per genitori e figli.'},
      {question: 'I genitori possono impostare i timer per i propri figli?', answer: 'Sì. Con Family, i genitori e il titolare del conto familiare possono avviare i timer per i bambini all’interno del gruppo familiare. La sessione è collegata all’account del bambino, quindi i suoi progressi e il tempo dedicato all’allenamento rimangono visibili.'},
      {question: 'Posso vedere i progressi di mio figlio?', answer: 'Con Family, i genitori possono visualizzare le statistiche dei propri figli, tra cui sessioni, minuti, XP, un riepilogo delle abilità e l\'attività recente.'},
      {question: 'SkillQuest è adatto ai bambini piccoli?', answer: 'SkillQuest è pensata per utenti dai 13 anni in su e non raccoglie consapevolmente dati da minori di 13 anni. Non è stata progettata né commercializzata come app per bambini piccoli.'},
      {question: 'Come funzionano i test alpha e chiusi su Android?', answer: 'La versione per Android è attualmente disponibile tramite il programma di beta testing chiuso su Google Play. Iscriviti sulla nostra pagina di download, conferma la tua email e, una volta che ti avremo aggiunto alla lista dei tester, riceverai un\'email con il link per l\'installazione. La versione per iOS è già disponibile sull\'App Store.'},
      {question: 'Come vengono protetti i miei dati?', answer: 'SkillQuest utilizza la sicurezza a livello di riga, così i tuoi dati sono accessibili solo a te (e, in un gruppo Famiglia, ai genitori per le statistiche sui figli), la gestione delle chiavi segrete basata sull\'ambiente e connessioni crittografate in ogni fase.'},
      {question: 'Come faccio a cancellare il mio account?', answer: 'Puoi richiedere la cancellazione dell\'account direttamente dall\'app oppure tramite la pagina dedicata alla cancellazione dell\'account su questo sito web.'},
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd(copy.faq))}}
      />
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

        <section className="pb-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {copy.faqHeading}
              </h2>
              <div className="space-y-4">
                {copy.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-primary-100 bg-white p-5"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-gray-900 marker:content-none">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
