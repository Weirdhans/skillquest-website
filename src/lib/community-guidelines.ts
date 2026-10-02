// Community guidelines for the social features (friends, challenges).
// Dutch is the source; the other languages come from DeepL plus a review.
// Keep this in line with what the app really does: blocking is in the app,
// reports go by email (there is no in-app report button yet).
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
    "metaDescription": "De regels voor vrienden en uitdagingen in SkillQuest, en hoe je iemand blokkeert of meldt.",
    "intro": "SkillQuest is een plek om te oefenen en elkaar aan te moedigen. Deze regels gelden voor alles wat je met anderen deelt: je weergavenaam, het bericht bij een vriendschapsverzoek en de titel en omschrijving van een uitdaging.",
    "rulesHeading": "De regels",
    "rules": [
      "Behandel anderen met respect.",
      "Deel geen seksuele, gewelddadige, bedreigende of discriminerende inhoud.",
      "Deel geen privégegevens van jezelf of iemand anders, zoals een adres of telefoonnummer.",
      "Gebruik vrienden en uitdagingen voor echt contact, niet voor reclame of spam."
    ],
    "childrenHeading": "Kinderen",
    "children": "Voor kinderaccounts en accounts waarvan de leeftijd onbekend is, staan vrienden en uitdagingen uit.",
    "blockHeading": "Iemand blokkeren",
    "block": "Open in de app het profiel van de ander en kies Blokkeren.",
    "reportHeading": "Iets melden",
    "report": "Stuur een e-mail naar hello@skill-quest.app met de weergavenaam van de ander en wat er gebeurde. We bekijken elke melding zo snel mogelijk.",
    "consequences": "Wie zich niet aan deze regels houdt, kan de toegang tot vrienden en uitdagingen of het account verliezen.",
    "footerLabel": "Communityrichtlijnen"
  },
  "en": {
    "title": "Community guidelines",
    "metaDescription": "The rules for friends and challenges in SkillQuest, and how to block or report someone.",
    "intro": "SkillQuest is a place to practice and encourage one another. These rules apply to everything you share with others: your display name, the message accompanying a friend request, and the title and description of a challenge.",
    "rulesHeading": "The rules",
    "childrenHeading": "Children",
    "children": "For children's accounts and accounts where the user's age is unknown, friends and challenges are disabled.",
    "blockHeading": "Block someone",
    "block": "In the app, open the other person's profile and select \"Block.\"",
    "reportHeading": "Report an issue",
    "report": "Send an email to hello@skill-quest.app with the other person’s display name and a description of what happened. We’ll review every report as soon as possible.",
    "consequences": "Anyone who does not follow these rules may lose access to friends and challenges or lose their account.",
    "footerLabel": "Community guidelines",
    "rules": [
      "Treat others with respect.",
      "Do not share sexual, violent, threatening, or discriminatory content.",
      "Do not share any personal information about yourself or anyone else, such as an address or phone number.",
      "Use friends and challenges to connect with others, not for advertising or spam."
    ]
  },
  "de": {
    "title": "Community-Richtlinien",
    "metaDescription": "Die Regeln für Freunde und Herausforderungen bei SkillQuest und wie du jemanden blockieren oder melden kannst.",
    "intro": "SkillQuest ist ein Ort, an dem man üben und sich gegenseitig anfeuern kann. Diese Regeln gelten für alles, was du mit anderen teilst: deinen Anzeigenamen, die Nachricht bei einer Freundschaftsanfrage sowie den Titel und die Beschreibung einer Herausforderung.",
    "rulesHeading": "Die Regeln",
    "childrenHeading": "Kinder",
    "children": "Bei Kinderkonten und Konten, bei denen das Alter unbekannt ist, sind Freunde und Herausforderungen deaktiviert.",
    "blockHeading": "Jemanden blockieren",
    "block": "Öffne in der App das Profil der anderen Person und wähle „Blockieren“.",
    "reportHeading": "Etwas melden",
    "report": "Schick eine E-Mail an hello@skill-quest.app mit dem Anzeigenamen der anderen Person und einer Beschreibung des Vorfalls. Wir prüfen jede Meldung so schnell wie möglich.",
    "consequences": "Wer sich nicht an diese Regeln hält, kann den Zugang zu Freunden und Herausforderungen oder sein Konto verlieren.",
    "footerLabel": "Community-Richtlinien",
    "rules": [
      "Behandle andere mit Respekt.",
      "Teile keine sexuellen, gewalttätigen, bedrohlichen oder diskriminierenden Inhalte.",
      "Teile keine privaten Daten von dir oder anderen, wie zum Beispiel eine Adresse oder Telefonnummer.",
      "Nutze Freunde und Herausforderungen für echte Kontakte, nicht für Werbung oder Spam."
    ]
  },
  "fr": {
    "title": "Règles de la communauté",
    "metaDescription": "Les règles concernant les amis et les défis sur SkillQuest, et comment bloquer ou signaler quelqu'un.",
    "intro": "SkillQuest, c'est un endroit où on s'entraîne et où on s'encourage mutuellement. Ces règles s'appliquent à tout ce que tu partages avec les autres : ton nom d'affichage, le message qui accompagne une demande d'amitié, ainsi que le titre et la description d'un défi.",
    "rulesHeading": "Les règles",
    "childrenHeading": "Les enfants",
    "children": "Pour les comptes d'enfants et ceux dont l'âge n'est pas connu, les amis et les défis sont désactivés.",
    "blockHeading": "Bloquer quelqu'un",
    "block": "Dans l'appli, ouvre le profil de la personne et sélectionne « Bloquer ».",
    "reportHeading": "Signaler un problème",
    "report": "Envoie un e-mail à hello@skill-quest.app en indiquant le nom d'affichage de la personne concernée et ce qui s'est passé. On examine chaque signalement dès que possible.",
    "consequences": "Si tu ne respectes pas ces règles, tu risques de perdre l'accès à tes amis et aux défis, voire de perdre ton compte.",
    "footerLabel": "Règles de la communauté",
    "rules": [
      "Traite les autres avec respect.",
      "Ne partage pas de contenu à caractère sexuel, violent, menaçant ou discriminatoire.",
      "Ne partage pas d'informations personnelles te concernant ou concernant quelqu'un d'autre, comme une adresse ou un numéro de téléphone.",
      "Utilise tes amis et les défis pour créer de vrais liens, pas pour faire de la pub ou envoyer du spam."
    ]
  },
  "es": {
    "title": "Normas de la comunidad",
    "metaDescription": "Las normas sobre amigos y retos en SkillQuest, y cómo bloquear o denunciar a alguien.",
    "intro": "SkillQuest es un lugar para practicar y animarnos unos a otros. Estas normas se aplican a todo lo que compartas con los demás: tu nombre de usuario, el mensaje que acompaña una solicitud de amistad y el título y la descripción de un reto.",
    "rulesHeading": "Las normas",
    "childrenHeading": "Niños",
    "children": "En las cuentas de niños y en aquellas en las que no se conoce la edad, las funciones de amigos y retos están desactivadas.",
    "blockHeading": "Bloquear a alguien",
    "block": "Abre el perfil de la otra persona en la app y selecciona «Bloquear».",
    "reportHeading": "Denunciar algo",
    "report": "Envía un correo a hello@skill-quest.app indicando el nombre de usuario de la otra persona y lo que ha pasado. Revisamos cada denuncia lo antes posible.",
    "consequences": "Si no sigues estas normas, podrías perder el acceso a tus amigos y a los retos, o incluso a tu cuenta.",
    "footerLabel": "Normas de la comunidad",
    "rules": [
      "Trata a los demás con respeto.",
      "No compartas contenido sexual, violento, amenazante o discriminatorio.",
      "No compartas datos personales tuyos ni de nadie más, como una dirección o un número de teléfono.",
      "Usa las funciones de amigos y retos para relacionarte de verdad, no para publicidad ni spam."
    ]
  },
  "it": {
    "title": "Linee guida della community",
    "metaDescription": "Le regole per gli amici e le sfide su SkillQuest, e come bloccare o segnalare qualcuno.",
    "intro": "SkillQuest è un posto dove esercitarsi e incoraggiarsi a vicenda. Queste regole valgono per tutto ciò che condividi con gli altri: il tuo nome utente, il messaggio che accompagna una richiesta di amicizia e il titolo e la descrizione di una sfida.",
    "rulesHeading": "Le regole",
    "childrenHeading": "Bambini",
    "children": "Per gli account dei bambini e quelli di cui non si conosce l'età, le funzioni \"amici\" e \"sfide\" sono disattivate.",
    "blockHeading": "Blocca qualcuno",
    "block": "Apri il profilo dell'altra persona nell'app e seleziona \"Blocca\".",
    "reportHeading": "Segnala qualcosa",
    "report": "Manda un'e-mail a hello@skill-quest.app indicando il nome utente dell'altra persona e cosa è successo. Esamineremo ogni segnalazione il prima possibile.",
    "consequences": "Chi non rispetta queste regole potrebbe perdere l'accesso agli amici e alle sfide o addirittura l'account.",
    "footerLabel": "Linee guida della community",
    "rules": [
      "Tratta gli altri con rispetto.",
      "Non condividere contenuti a sfondo sessuale, violenti, minacciosi o discriminatori.",
      "Non condividere dati personali tuoi o di altri, come l'indirizzo o il numero di telefono.",
      "Usa gli amici e le sfide per interagire davvero, non per fare pubblicità o inviare spam."
    ]
  }
};
