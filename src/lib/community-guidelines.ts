// Community guidelines for the social features (friends, challenges).
// Dutch is the source; the other languages come from DeepL plus a review.
// Keep this in line with what the app really does: reporting and blocking are
// in the app (docs/MODERATION_POLICY.md in the app repo); safety@ is the contact.
import type {Locale} from '@/lib/marketing';

export type CommunityGuidelinesCopy = {
  title: string;
  metaDescription: string;
  intro: string;
  rulesHeading: string;
  rules: string[];
  childrenHeading: string;
  children: string;
  blockHeading: string;
  block: string;
  reportHeading: string;
  report: string;
  consequences: string;
  footerLabel: string;
};

export const communityGuidelines: Record<Locale, CommunityGuidelinesCopy> = {
  "nl": {
    "title": "Communityrichtlijnen",
    "metaDescription": "De regels voor vrienden en uitdagingen in SkillQuest, en hoe je iemand meldt of blokkeert.",
    "intro": "SkillQuest is een plek om te oefenen en elkaar aan te moedigen. Deze regels gelden voor alles wat anderen van je zien: je weergavenaam, je gebruikersnaam en hoe je met vrienden en uitdagingen omgaat. In SkillQuest kun je geen vrije berichten naar elkaar sturen.",
    "rulesHeading": "De regels",
    "rules": [
      "Behandel anderen met respect.",
      "Kies geen weergavenaam of gebruikersnaam die seksueel, gewelddadig, bedreigend of discriminerend is, of waarmee je iemand anders nabootst.",
      "Zet geen privégegevens in je naam, zoals een adres of telefoonnummer.",
      "Gebruik vrienden en uitdagingen voor echt contact, niet voor reclame of spam."
    ],
    "childrenHeading": "Kinderen",
    "children": "Voor kinderaccounts en accounts waarvan de leeftijd onbekend is, staan vrienden en uitdagingen uit. Kinderen kunnen een gebruiker wel melden en blokkeren, ook zonder toestemming van een ouder.",
    "blockHeading": "Iemand blokkeren",
    "block": "Open in de app het profiel van de ander en kies Gebruiker blokkeren. Een geblokkeerde gebruiker kan je niet meer uitnodigen of vinden. Je ziet je geblokkeerde gebruikers, en kunt ze deblokkeren, onder Profiel > Instellingen > Privacy.",
    "reportHeading": "Iets melden",
    "report": "Open in de app het profiel van de ander en kies Gebruiker melden. Kies een van de zeven redenen. Meldingen over intimidatie, bedreiging, seksuele inhoud of kinderveiligheid krijgen we direct door en bekijken we zo snel mogelijk; alle andere meldingen beoordelen we binnen 7 dagen. De ander ziet nooit wie heeft gemeld. Je kunt ons ook mailen op safety@skill-quest.app.",
    "consequences": "Wie zich niet aan deze regels houdt, kan de toegang tot vrienden en uitdagingen of het account verliezen.",
    "footerLabel": "Communityrichtlijnen"
  },
  "en": {
    "title": "Community guidelines",
    "metaDescription": "The rules for friends and challenges in SkillQuest, and how to report or block someone.",
    "intro": "SkillQuest is a place to practice and encourage one another. These rules apply to everything others see of you: your display name, your username, and how you use friends and challenges. You cannot send free-form messages to each other in SkillQuest.",
    "rulesHeading": "The rules",
    "childrenHeading": "Children",
    "children": "For children's accounts and accounts where the user's age is unknown, friends and challenges are disabled. Children can still report and block a user, even without a parent's permission.",
    "blockHeading": "Block someone",
    "block": "In the app, open the other person's profile and choose Block user. A blocked user can no longer invite you or find you. You can see your blocked users, and unblock them, under Profile > Settings > Privacy.",
    "reportHeading": "Report an issue",
    "report": "In the app, open the other person's profile and choose Report user. Pick one of the seven reasons. We are notified immediately of reports about harassment, threats, sexual content or child safety and review them as soon as we can; we review all other reports within 7 days. The other person never sees who reported them. You can also email us at safety@skill-quest.app.",
    "consequences": "Anyone who does not follow these rules may lose access to friends and challenges or lose their account.",
    "footerLabel": "Community guidelines",
    "rules": [
      "Treat others with respect.",
      "Do not choose a display name or username that is sexual, violent, threatening or discriminatory, or that imitates someone else.",
      "Do not put personal information in your name, such as an address or phone number.",
      "Use friends and challenges to connect with others, not for advertising or spam."
    ]
  },
  "de": {
    "title": "Community-Richtlinien",
    "metaDescription": "Die Regeln für Freunde und Herausforderungen bei SkillQuest und wie du jemanden melden oder blockieren kannst.",
    "intro": "SkillQuest ist ein Ort, an dem man üben und sich gegenseitig anfeuern kann. Diese Regeln gelten für alles, was andere von dir sehen: deinen Anzeigenamen, deinen Benutzernamen und wie du Freunde und Herausforderungen nutzt. In SkillQuest kann man sich keine frei formulierten Nachrichten schicken.",
    "rulesHeading": "Die Regeln",
    "childrenHeading": "Kinder",
    "children": "Bei Kinderkonten und Konten, bei denen das Alter unbekannt ist, sind Freunde und Herausforderungen deaktiviert. Kinder können trotzdem einen Benutzer melden und blockieren, auch ohne Erlaubnis der Eltern.",
    "blockHeading": "Jemanden blockieren",
    "block": "Öffne in der App das Profil der anderen Person und wähle „Benutzer blockieren“. Ein blockierter Benutzer kann dich nicht mehr einladen oder finden. Unter Profil > Einstellungen > Datenschutz siehst du deine blockierten Benutzer und kannst die Blockierung aufheben.",
    "reportHeading": "Etwas melden",
    "report": "Öffne in der App das Profil der anderen Person und wähle „Benutzer melden“. Wähle einen der sieben Gründe. Bei Meldungen zu Belästigung, Bedrohungen, sexuellen Inhalten oder Kinderschutz werden wir sofort benachrichtigt und prüfen sie so schnell wie möglich; alle anderen Meldungen prüfen wir innerhalb von 7 Tagen. Die gemeldete Person erfährt nie, wer sie gemeldet hat. Du kannst uns auch eine E-Mail an safety@skill-quest.app schreiben.",
    "consequences": "Wer sich nicht an diese Regeln hält, kann den Zugang zu Freunden und Herausforderungen oder sein Konto verlieren.",
    "footerLabel": "Community-Richtlinien",
    "rules": [
      "Behandle andere mit Respekt.",
      "Wähle keinen Anzeigenamen oder Benutzernamen, der sexuell anzüglich, gewalttätig, bedrohlich oder diskriminierend ist oder eine andere Person nachahmt.",
      "Schreib keine privaten Daten wie eine Adresse oder Telefonnummer in deinen Namen.",
      "Nutze Freunde und Herausforderungen für echte Kontakte, nicht für Werbung oder Spam."
    ]
  },
  "fr": {
    "title": "Règles de la communauté",
    "metaDescription": "Les règles concernant les amis et les défis sur SkillQuest, et comment signaler ou bloquer quelqu'un.",
    "intro": "SkillQuest, c'est un endroit où on s'entraîne et où on s'encourage mutuellement. Ces règles s'appliquent à tout ce que les autres voient de toi : ton nom d'affichage, ton nom d'utilisateur et la façon dont tu utilises les fonctionnalités d'amis et de défis. Il n'est pas possible de s'envoyer des messages libres dans SkillQuest.",
    "rulesHeading": "Les règles",
    "childrenHeading": "Les enfants",
    "children": "Pour les comptes d'enfants et ceux dont l'âge n'est pas connu, les amis et les défis sont désactivés. Les enfants peuvent quand même signaler et bloquer un utilisateur, même sans l'autorisation d'un parent.",
    "blockHeading": "Bloquer quelqu'un",
    "block": "Dans l'appli, ouvre le profil de la personne et sélectionne « Bloquer l'utilisateur ». Un utilisateur bloqué ne peut plus t'inviter ni te trouver. Tu peux voir les utilisateurs que tu as bloqués, et les débloquer, dans Profil > Paramètres > Vie privée.",
    "reportHeading": "Signaler un problème",
    "report": "Dans l'appli, ouvre le profil de la personne et sélectionne « Signaler un utilisateur ». Choisis l'un des sept motifs. Les signalements concernant le harcèlement, les menaces, les contenus à caractère sexuel ou la protection des enfants nous sont transmis tout de suite et nous les examinons dès que possible ; tous les autres signalements sont examinés dans un délai de 7 jours. La personne signalée ne sait jamais qui l'a signalée. Tu peux aussi nous écrire à safety@skill-quest.app.",
    "consequences": "Si tu ne respectes pas ces règles, tu risques de perdre l'accès à tes amis et aux défis, voire de perdre ton compte.",
    "footerLabel": "Règles de la communauté",
    "rules": [
      "Traite les autres avec respect.",
      "Ne choisis pas de nom d'affichage ni de nom d'utilisateur à caractère sexuel, violent, menaçant ou discriminatoire, ni qui imite quelqu'un d'autre.",
      "Ne mets pas d'informations personnelles dans ton nom, comme une adresse ou un numéro de téléphone.",
      "Utilise les amis et les défis pour créer de vrais liens, pas pour faire de la pub ou envoyer du spam."
    ]
  },
  "es": {
    "title": "Normas de la comunidad",
    "metaDescription": "Las normas sobre amigos y retos en SkillQuest, y cómo denunciar o bloquear a alguien.",
    "intro": "SkillQuest es un lugar para practicar y animarnos unos a otros. Estas normas se aplican a todo lo que los demás ven de ti: tu nombre para mostrar, tu nombre de usuario y cómo usas las funciones de amigos y retos. En SkillQuest no se pueden enviar mensajes libres entre usuarios.",
    "rulesHeading": "Las normas",
    "childrenHeading": "Niños",
    "children": "En las cuentas de niños y en aquellas en las que no se conoce la edad, las funciones de amigos y retos están desactivadas. Los niños sí pueden denunciar y bloquear a un usuario, incluso sin permiso de un progenitor.",
    "blockHeading": "Bloquear a alguien",
    "block": "En la app, abre el perfil de la otra persona y selecciona «Bloquear usuario». Un usuario bloqueado ya no puede invitarte ni encontrarte. Puedes ver a los usuarios que has bloqueado, y desbloquearlos, en Perfil > Ajustes > Privacidad.",
    "reportHeading": "Denunciar algo",
    "report": "En la app, abre el perfil de la otra persona y selecciona «Denunciar usuario». Elige uno de los siete motivos. Las denuncias por acoso, amenazas, contenido sexual o relativas a la protección infantil nos llegan de inmediato y las revisamos lo antes posible; el resto las revisamos en un plazo de 7 días. La otra persona nunca ve quién la ha denunciado. También puedes escribirnos a safety@skill-quest.app.",
    "consequences": "Si no sigues estas normas, podrías perder el acceso a tus amigos y a los retos, o incluso a tu cuenta.",
    "footerLabel": "Normas de la comunidad",
    "rules": [
      "Trata a los demás con respeto.",
      "No elijas un nombre para mostrar ni un nombre de usuario sexual, violento, amenazante o discriminatorio, ni que suplante a otra persona.",
      "No pongas datos personales en tu nombre, como una dirección o un número de teléfono.",
      "Usa las funciones de amigos y retos para relacionarte de verdad, no para publicidad ni spam."
    ]
  },
  "it": {
    "title": "Linee guida della community",
    "metaDescription": "Le regole per gli amici e le sfide su SkillQuest, e come segnalare o bloccare qualcuno.",
    "intro": "SkillQuest è un posto dove esercitarsi e incoraggiarsi a vicenda. Queste regole valgono per tutto ciò che gli altri vedono di te: il tuo nome visualizzato, il tuo nome utente e il modo in cui usi amici e sfide. In SkillQuest non si possono scambiare messaggi liberi.",
    "rulesHeading": "Le regole",
    "childrenHeading": "Bambini",
    "children": "Per gli account dei bambini e quelli di cui non si conosce l'età, le funzioni amici e sfide sono disattivate. I bambini possono comunque segnalare e bloccare un utente, anche senza il permesso di un genitore.",
    "blockHeading": "Blocca qualcuno",
    "block": "Nell'app, apri il profilo dell'altra persona e seleziona \"Blocca utente\". Un utente bloccato non può più invitarti né trovarti. Puoi vedere gli utenti che hai bloccato, e sbloccarli, in Profilo > Impostazioni > Privacy.",
    "reportHeading": "Segnala qualcosa",
    "report": "Nell'app, apri il profilo dell'altra persona e seleziona \"Segnala utente\". Scegli uno dei sette motivi. Le segnalazioni per molestie, minacce, contenuti sessuali o tutela dei minori ci arrivano subito e le esaminiamo il prima possibile; tutte le altre segnalazioni le esaminiamo entro 7 giorni. L'altra persona non vede mai chi l'ha segnalata. Puoi anche scriverci a safety@skill-quest.app.",
    "consequences": "Chi non rispetta queste regole potrebbe perdere l'accesso agli amici e alle sfide o addirittura l'account.",
    "footerLabel": "Linee guida della community",
    "rules": [
      "Tratta gli altri con rispetto.",
      "Non scegliere un nome visualizzato o un nome utente a sfondo sessuale, violento, minaccioso o discriminatorio, né che imiti qualcun altro.",
      "Non inserire nel tuo nome dati personali, come l'indirizzo o il numero di telefono.",
      "Usa gli amici e le sfide per interagire davvero, non per fare pubblicità o inviare spam."
    ]
  }
};
