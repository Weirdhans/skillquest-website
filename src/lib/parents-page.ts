// Landing page for parents (/{locale}/parents). Dutch is the source; the other
// languages come from DeepL plus a review. {familyMonthly} and {familyYearly}
// are filled from PRICING at render time. Only true facts about Hans and his son.
import type {Locale} from '@/lib/marketing';

type Step = {title: string; body: string};
type Faq = {q: string; a: string};

export type ParentsPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  iosCta: string;
  androidCta: string;
  freeNote: string;
  storyHeading: string;
  story: string[];
  storySignature: string;
  stepsHeading: string;
  steps: Step[];
  familyHeading: string;
  family: string[];
  safeHeading: string;
  safe: string[];
  faqHeading: string;
  faq: Faq[];
  tipsCta: string;
  finalHeading: string;
};

export const parentsPage: Record<Locale, ParentsPageCopy> = {
  "nl": {
    "metaTitle": "SkillQuest voor ouders: elke dag oefenen, zichtbaar maken",
    "metaDescription": "Een timer met voortgang voor lezen, een instrument of huiswerk. Gemaakt door een vader. Gratis te installeren, zonder reclame.",
    "eyebrow": "Voor ouders",
    "title": "Elke dag even oefenen, en zien dat het optelt",
    "subtitle": "SkillQuest is een timer met voortgang voor lezen, een instrument of iets anders wat je kind oefent. Na elke sessie zie je hoe die vaardigheid groeit.",
    "iosCta": "Download voor iPhone en iPad",
    "androidCta": "Android-testversie",
    "freeNote": "Gratis te installeren, zonder reclame.",
    "storyHeading": "Waarom ik SkillQuest bouwde",
    "story": [
      "Mijn zoon moest voor school elke dag 10 minuten lezen. We zetten daar toch al een timer voor, dus ik ging ook bijhouden hoeveel hij al gelezen had.",
      "Dat werkte beter dan ik had verwacht. Hij pakt nu zelf zijn iPad en start de timer. Soms stopt hij eerder, soms leest hij door. Hij wordt blij als hij weer een dag gelezen heeft, en liet zijn voortgang laatst trots aan zijn meester zien.",
      "Uit dat bijhouden is SkillQuest ontstaan."
    ],
    "storySignature": "Hans Vlasblom, vader en maker van SkillQuest",
    "stepsHeading": "Zo werkt het",
    "steps": [
      {
        "title": "Kies een vaardigheid",
        "body": "Lezen, piano, gitaar, huiswerk of een van de andere vaardigheden in de app."
      },
      {
        "title": "Start een timer",
        "body": "Bijvoorbeeld 10 minuten. De timer loopt door terwijl je kind oefent; niemand hoeft naar het scherm te kijken."
      },
      {
        "title": "Zie de voortgang groeien",
        "body": "Elke geoefende minuut levert 1 XP op. Zo telt de inzet, niet het resultaat, en zie je per week hoe het optelt."
      }
    ],
    "familyHeading": "De familiefunctie",
    "family": [
      "Met de familiefunctie zie je als ouder de voortgang van je kind.",
      "Is je kind nog jong, dan start je de timer op je eigen telefoon en telt de oefentijd mee bij je kind.",
      "De familiefunctie hoort bij het Family-abonnement van {familyMonthly} per maand of {familyYearly} per jaar. De rest van de app is gratis."
    ],
    "safeHeading": "Gemaakt met kinderen in gedachten",
    "safe": [
      "Geen reclame in de app.",
      "Voor kinderaccounts staan vrienden, ranglijsten en aankopen uit.",
      "Je kind kiest zelf wat het oefent; de app beloont oefenen, niet presteren."
    ],
    "faqHeading": "Veelgestelde vragen",
    "faq": [
      {
        "q": "Vanaf welke leeftijd kan mijn kind SkillQuest gebruiken?",
        "a": "SkillQuest is gemaakt voor kinderen en volwassenen. Is je kind nog jong, dan kun je met de familiefunctie de timer op je eigen telefoon starten."
      },
      {
        "q": "Is een app niet gewoon extra schermtijd?",
        "a": "De timer loopt door terwijl je kind leest of speelt; niemand hoeft naar het scherm te kijken. Het scherm is alleen voor het starten en het overzicht achteraf."
      },
      {
        "q": "Wat kost SkillQuest?",
        "a": "Installeren is gratis en er is geen reclame. De familiefunctie hoort bij het Family-abonnement van {familyMonthly} per maand of {familyYearly} per jaar."
      },
      {
        "q": "Werkt het op Android?",
        "a": "Ja, via een testversie van Google Play. Op de downloadpagina staan de drie stappen om mee te doen."
      }
    ],
    "tipsCta": "Tips om elke dag te oefenen",
    "finalHeading": "Probeer het deze week"
  },
  "en": {
    "metaTitle": "SkillQuest for parents: practice every day and see it add up",
    "metaDescription": "A timer that tracks progress for reading, playing an instrument, or doing homework. Created by a dad. Free to install, with no ads.",
    "eyebrow": "For parents",
    "title": "Practice a little every day, and see how it all adds up",
    "subtitle": "SkillQuest is a timer that tracks progress in reading, a musical instrument, or anything else your child is practicing. After each session, you can see how that skill is improving.",
    "iosCta": "Download for iPhone and iPad",
    "androidCta": "Android beta version",
    "freeNote": "Free to install, with no ads.",
    "storyHeading": "Why I built SkillQuest",
    "story": [
      "My son had to read for 10 minutes every day for school. We were already setting a timer for that, so I decided to keep track of how much he had read.",
      "That worked better than I expected. Now he picks up his iPad himself and starts the timer. Sometimes he stops early, sometimes he keeps reading. He gets happy when he’s read for another day, and recently he proudly showed his teacher his progress.",
      "SkillQuest was born out of that tracking."
    ],
    "storySignature": "Hans Vlasblom, father and creator of SkillQuest",
    "stepsHeading": "Here’s how it works",
    "steps": [
      {
        "title": "Choose a skill",
        "body": "Reading, piano, guitar, homework, or any of the other skills in the app."
      },
      {
        "title": "Start a timer",
        "body": "For example, 10 minutes. The timer keeps running while your child practices; no one needs to look at the screen."
      },
      {
        "title": "Watch their progress grow",
        "body": "Every minute of practice earns 1 XP. That way, it’s the effort that counts, not the result, and you can see how it adds up each week."
      }
    ],
    "familyHeading": "The family feature",
    "family": [
      "With the family feature, you as a parent can track your child’s progress.",
      "If your child is still young, you can start the timer on your own phone, and the practice time will count toward your child’s total.",
      "The family feature is included with the Family subscription at {familyMonthly} per month or {familyYearly} per year. The rest of the app is free."
    ],
    "safeHeading": "Created with children in mind",
    "safe": [
      "No ads in the app.",
      "Friends, leaderboards, and in-app purchases are disabled for children’s accounts.",
      "Your child chooses what to practice; the app rewards practice, not performance."
    ],
    "faqHeading": "Frequently asked questions",
    "faq": [
      {
        "q": "At what age can my child start using SkillQuest?",
        "a": "SkillQuest is designed for both children and adults. If your child is still young, you can use the family feature to start the timer on your own phone."
      },
      {
        "q": "Isn’t an app just more screen time?",
        "a": "The timer keeps running while your child reads or plays; no one needs to look at the screen. The screen is only used to start the timer and view the summary afterward."
      },
      {
        "q": "How much does SkillQuest cost?",
        "a": "Installation is free, and there are no ads. The family feature is included with the Family subscription at {familyMonthly} per month or {familyYearly} per year."
      },
      {
        "q": "Does it work on Android?",
        "a": "Yes, through a test version on Google Play. The download page lists the three steps to get started."
      }
    ],
    "tipsCta": "Tips for practicing every day",
    "finalHeading": "Try it this week"
  },
  "de": {
    "metaTitle": "SkillQuest für Eltern: Jeden Tag üben, Fortschritte sichtbar machen",
    "metaDescription": "Ein Timer mit Fortschrittsanzeige fürs Lesen, für ein Instrument oder für Hausaufgaben. Von einem Vater entwickelt. Kostenlos zu installieren, ohne Werbung.",
    "eyebrow": "Für Eltern",
    "title": "Jeden Tag ein bisschen üben und sehen, wie sich das auszahlt",
    "subtitle": "SkillQuest ist ein Timer mit Fortschrittsanzeige fürs Lesen, ein Instrument oder was auch immer dein Kind gerade übt. Nach jeder Sitzung siehst du, wie sich diese Fähigkeit verbessert.",
    "iosCta": "Download für iPhone und iPad",
    "androidCta": "Android-Testversion",
    "freeNote": "Kostenlos zum Installieren, ohne Werbung.",
    "storyHeading": "Warum ich SkillQuest entwickelt habe",
    "story": [
      "Mein Sohn musste für die Schule jeden Tag 10 Minuten lesen. Wir haben dafür sowieso schon einen Timer eingestellt, also habe ich auch mitgezählt, wie viel er schon gelesen hatte.",
      "Das hat besser geklappt, als ich erwartet hatte. Er schnappt sich jetzt selbst sein iPad und startet den Timer. Manchmal hört er früher auf, manchmal liest er weiter. Er freut sich, wenn er wieder einen Tag gelesen hat, und hat seinem Lehrer neulich stolz seine Fortschritte gezeigt.",
      "Aus diesem Nachverfolgen ist SkillQuest entstanden."
    ],
    "storySignature": "Hans Vlasblom, Vater und Entwickler von SkillQuest",
    "stepsHeading": "So funktioniert’s",
    "steps": [
      {
        "title": "Wähle eine Fähigkeit aus",
        "body": "Lesen, Klavier, Gitarre, Hausaufgaben oder eine der anderen Fähigkeiten in der App."
      },
      {
        "title": "Starte einen Timer",
        "body": "Zum Beispiel 10 Minuten. Der Timer läuft weiter, während dein Kind übt; niemand muss auf den Bildschirm schauen."
      },
      {
        "title": "Sieh, wie die Fortschritte wachsen",
        "body": "Jede geübte Minute bringt 1 XP ein. So zählt der Einsatz, nicht das Ergebnis, und du siehst jede Woche, wie sich das summiert."
      }
    ],
    "familyHeading": "Die Familienfunktion",
    "family": [
      "Mit der Familienfunktion kannst du als Elternteil den Fortschritt deines Kindes verfolgen.",
      "Wenn dein Kind noch klein ist, startest du den Timer auf deinem eigenen Handy und die Übungszeit wird bei deinem Kind mitgezählt.",
      "Die Familienfunktion ist im Family-Abo von {familyMonthly} pro Monat oder {familyYearly} pro Jahr enthalten. Der Rest der App ist kostenlos."
    ],
    "safeHeading": "Entwickelt mit Blick auf Kinder",
    "safe": [
      "Keine Werbung in der App.",
      "Für Kinderkonten sind Freunde, Ranglisten und Käufe deaktiviert.",
      "Dein Kind entscheidet selbst, was es übt; die App belohnt das Üben, nicht die Leistung."
    ],
    "faqHeading": "Häufig gestellte Fragen",
    "faq": [
      {
        "q": "Ab welchem Alter kann mein Kind SkillQuest nutzen?",
        "a": "SkillQuest wurde für Kinder und Erwachsene entwickelt. Wenn dein Kind noch klein ist, kannst du mit der Familienfunktion den Timer auf deinem eigenen Handy starten."
      },
      {
        "q": "Ist eine App nicht einfach nur zusätzliche Bildschirmzeit?",
        "a": "Der Timer läuft weiter, während dein Kind liest oder spielt; niemand muss auf den Bildschirm schauen. Der Bildschirm dient nur zum Starten und zur anschließenden Übersicht."
      },
      {
        "q": "Was kostet SkillQuest?",
        "a": "Die Installation ist kostenlos und es gibt keine Werbung. Die Familienfunktion ist im Family-Abonnement enthalten: {familyMonthly} pro Monat oder {familyYearly} pro Jahr."
      },
      {
        "q": "Funktioniert das auf Android?",
        "a": "Ja, über eine Testversion bei Google Play. Auf der Download-Seite findest du die drei Schritte, um mitzumachen."
      }
    ],
    "tipsCta": "Tipps für das tägliche Üben",
    "finalHeading": "Probier es diese Woche aus"
  },
  "fr": {
    "metaTitle": "SkillQuest pour les parents : s'entraîner tous les jours, rendre ses progrès visibles",
    "metaDescription": "Un minuteur avec suivi des progrès pour la lecture, la pratique d'un instrument ou les devoirs. Créé par un papa. À installer gratuitement, sans pub.",
    "eyebrow": "Pour les parents",
    "title": "Un peu d'entraînement chaque jour, et voir que ça s'additionne",
    "subtitle": "SkillQuest, c'est un minuteur qui suit les progrès en lecture, en musique ou dans toute autre activité que ton enfant pratique. Après chaque séance, tu peux voir comment cette compétence s'améliore.",
    "iosCta": "Télécharge-la sur iPhone et iPad",
    "androidCta": "Version d'essai Android",
    "freeNote": "À installer gratuitement, sans pub.",
    "storyHeading": "Pourquoi j'ai créé SkillQuest",
    "story": [
      "Mon fils devait lire 10 minutes par jour pour l'école. On utilisait déjà un minuteur pour ça, alors j'ai décidé de noter aussi tout ce qu'il avait lu.",
      "Ça a mieux marché que je ne l’aurais cru. Maintenant, il prend tout seul son iPad et lance le minuteur. Parfois, il s’arrête avant la fin, parfois il continue à lire. Il est content d'avoir lu un jour de plus, et l’autre jour, il a fièrement montré ses progrès à son maître.",
      "C'est de ce suivi qu'est né SkillQuest."
    ],
    "storySignature": "Hans Vlasblom, papa et créateur de SkillQuest",
    "stepsHeading": "Voici comment ça marche",
    "steps": [
      {
        "title": "Choisis une compétence",
        "body": "La lecture, le piano, la guitare, les devoirs ou l'une des autres compétences proposées dans l'appli."
      },
      {
        "title": "Lance un minuteur",
        "body": "Par exemple, 10 minutes. Le minuteur continue de tourner pendant que ton enfant s'entraîne ; personne n'a besoin de regarder l'écran."
      },
      {
        "title": "Regarde les progrès s'accumuler",
        "body": "Chaque minute d'entraînement rapporte 1 XP. C'est l'effort qui compte, pas le résultat, et tu peux voir chaque semaine comment ça s'accumule."
      }
    ],
    "familyHeading": "La fonctionnalité familiale",
    "family": [
      "Grâce à la fonctionnalité familiale, en tant que parent, tu peux suivre les progrès de ton enfant.",
      "Si ton enfant est encore petit, tu lances le minuteur sur ton propre téléphone et le temps d'entraînement est comptabilisé pour ton enfant.",
      "La fonctionnalité familiale est incluse dans l'abonnement « Family » à {familyMonthly} par mois ou {familyYearly} par an. Le reste de l'appli est gratuit."
    ],
    "safeHeading": "Conçue en pensant aux enfants",
    "safe": [
      "Pas de pub dans l'appli.",
      "Pour les comptes enfants, les amis, les classements et les achats sont désactivés.",
      "C'est ton enfant qui choisit lui-même à quoi il s'entraîne ; l'appli récompense l'entraînement, pas la performance."
    ],
    "faqHeading": "Foire aux questions",
    "faq": [
      {
        "q": "À partir de quel âge mon enfant peut-il utiliser SkillQuest ?",
        "a": "SkillQuest est conçu pour les enfants et les adultes. Si ton enfant est encore petit, la fonctionnalité familiale te permet de lancer le minuteur depuis ton propre téléphone."
      },
      {
        "q": "Une appli, ce n'est pas juste du temps d'écran en plus ?",
        "a": "Le minuteur continue de tourner pendant que ton enfant lit ou joue ; personne n'a besoin de regarder l'écran. L'écran sert uniquement à démarrer la session et à consulter le récapitulatif après coup."
      },
      {
        "q": "Combien coûte SkillQuest ?",
        "a": "L'installation est gratuite et il n'y a pas de pub. La fonctionnalité familiale est incluse dans l'abonnement « Family » à {familyMonthly} par mois ou {familyYearly} par an."
      },
      {
        "q": "Ça marche sur Android ?",
        "a": "Oui, via une version d'essai sur Google Play. Sur la page de téléchargement, tu trouveras les trois étapes à suivre pour participer."
      }
    ],
    "tipsCta": "Des conseils pour s'entraîner tous les jours",
    "finalHeading": "Essaie-la cette semaine"
  },
  "es": {
    "metaTitle": "SkillQuest para padres: practicar cada día, hacer que se note",
    "metaDescription": "Un temporizador con indicador de progreso para la lectura, un instrumento o los deberes. Creado por un padre. Se puede instalar gratis, sin anuncios.",
    "eyebrow": "Para padres",
    "title": "Un rato de práctica cada día, y ver cómo se va sumando",
    "subtitle": "SkillQuest es un temporizador con seguimiento del progreso para la lectura, un instrumento o cualquier otra cosa que practique tu hijo. Después de cada sesión, verás cómo mejora esa habilidad.",
    "iosCta": "Descárgala para iPhone y iPad",
    "androidCta": "Versión de prueba para Android",
    "freeNote": "Se puede instalar gratis y no tiene anuncios.",
    "storyHeading": "Por qué creé SkillQuest",
    "story": [
      "Mi hijo tenía que leer 10 minutos al día para el colegio. Como ya poníamos un temporizador para eso, se me ocurrió llevar la cuenta de cuánto había leído.",
      "Funcionó mejor de lo que esperaba. Ahora coge él mismo su iPad y pone en marcha el temporizador. A veces lo para antes, otras sigue leyendo. Se pone contento cuando ha leído otro día más, y hace poco le enseñó con orgullo su progreso a su maestro.",
      "De ahí surgió SkillQuest."
    ],
    "storySignature": "Hans Vlasblom, padre y creador de SkillQuest",
    "stepsHeading": "Así funciona",
    "steps": [
      {
        "title": "Elige una habilidad",
        "body": "Lectura, piano, guitarra, deberes o cualquiera de las otras habilidades de la app."
      },
      {
        "title": "Pon en marcha un temporizador",
        "body": "Por ejemplo, 10 minutos. El temporizador sigue funcionando mientras tu hijo practica; nadie tiene que estar mirando la pantalla."
      },
      {
        "title": "Mira cómo va progresando",
        "body": "Cada minuto de práctica da 1 XP. Así, lo que cuenta es el esfuerzo, no el resultado, y puedes ver cómo se va sumando cada semana."
      }
    ],
    "familyHeading": "La función familiar",
    "family": [
      "Con la función familiar, como padre o madre, puedes ver el progreso de tu hijo.",
      "Si tu hijo aún es pequeño, pones en marcha el temporizador en tu propio móvil y el tiempo de práctica se suma al de tu hijo.",
      "La función familiar está incluida en la suscripción «Family» de {familyMonthly} al mes o {familyYearly} al año. El resto de la app es gratis."
    ],
    "safeHeading": "Creada pensando en los niños",
    "safe": [
      "No hay publicidad en la app.",
      "En las cuentas infantiles, las funciones de amigos, clasificaciones y compras están desactivadas.",
      "Tu hijo elige por sí mismo qué practicar; la app premia el hecho de practicar, no el resultado."
    ],
    "faqHeading": "Preguntas frecuentes",
    "faq": [
      {
        "q": "¿A partir de qué edad puede usar mi hijo SkillQuest?",
        "a": "SkillQuest está pensada para niños y adultos. Si tu hijo aún es pequeño, puedes usar la función familiar para poner en marcha el temporizador desde tu propio móvil."
      },
      {
        "q": "¿No es una app simplemente más tiempo delante de la pantalla?",
        "a": "El temporizador sigue funcionando mientras tu hijo lee o juega; nadie tiene que mirar la pantalla. La pantalla solo sirve para ponerlo en marcha y ver el resumen después."
      },
      {
        "q": "¿Cuánto cuesta SkillQuest?",
        "a": "La instalación es gratis y no hay anuncios. La función familiar está incluida en la suscripción «Family» de {familyMonthly} al mes o {familyYearly} al año."
      },
      {
        "q": "¿Funciona en Android?",
        "a": "Sí, a través de una versión de prueba de Google Play. En la página de descargas encontrarás los tres pasos para participar."
      }
    ],
    "tipsCta": "Consejos para practicar cada día",
    "finalHeading": "Pruébala esta semana"
  },
  "it": {
    "metaTitle": "SkillQuest per i genitori: esercitarsi ogni giorno, rendere visibili i progressi",
    "metaDescription": "Un timer con indicatore di progressi per la lettura, uno strumento musicale o i compiti. Creato da un papà. Da installare gratis, senza pubblicità.",
    "eyebrow": "Per i genitori",
    "title": "Un po' di pratica ogni giorno, e vedere che si somma",
    "subtitle": "SkillQuest è un timer che tiene traccia dei progressi nella lettura, in uno strumento musicale o in qualsiasi altra cosa che tuo figlio sta esercitando. Dopo ogni sessione, puoi vedere come quella abilità migliora.",
    "iosCta": "Scarica per iPhone e iPad",
    "androidCta": "Versione di prova per Android",
    "freeNote": "Da installare gratis, senza pubblicità.",
    "storyHeading": "Perché ho creato SkillQuest",
    "story": [
      "Mio figlio doveva leggere 10 minuti al giorno per la scuola. Visto che usavamo già un timer per questo, ho deciso di tenere traccia anche di quanto avesse già letto.",
      "Ha funzionato meglio di quanto mi aspettassi. Adesso prende da solo il suo iPad e avvia il timer. A volte si ferma prima, altre volte continua a leggere. È felice quando riesce a leggere per un altro giorno e l’altra volta ha mostrato con orgoglio i suoi progressi al suo maestro.",
      "È proprio da questo monitoraggio che è nata SkillQuest."
    ],
    "storySignature": "Hans Vlasblom, papà e creatore di SkillQuest",
    "stepsHeading": "Ecco come funziona",
    "steps": [
      {
        "title": "Scegli un'abilità",
        "body": "Lettura, pianoforte, chitarra, compiti o una delle altre abilità presenti nell’app."
      },
      {
        "title": "Avvia un timer",
        "body": "Ad esempio, 10 minuti. Il timer continua a funzionare mentre tuo figlio si esercita; nessuno deve guardare lo schermo."
      },
      {
        "title": "Guarda i progressi crescere",
        "body": "Ogni minuto di esercitazione fa guadagnare 1 XP. In questo modo conta l’impegno, non il risultato, e ogni settimana puoi vedere come si sommano i punti."
      }
    ],
    "familyHeading": "La funzione famiglia",
    "family": [
      "Con la funzione famiglia, come genitore puoi seguire i progressi di tuo figlio.",
      "Se tuo figlio è ancora piccolo, puoi avviare il timer sul tuo telefono e il tempo di esercitazione verrà conteggiato per lui.",
      "La funzione famiglia è inclusa nell’abbonamento Family a {familyMonthly} al mese o {familyYearly} all’anno. Il resto dell’app è gratis."
    ],
    "safeHeading": "Realizzata pensando ai bambini",
    "safe": [
      "Nessuna pubblicità nell'app.",
      "Per gli account dei bambini, le funzioni \"amici\", \"classifiche\" e \"acquisti\" sono disattivate.",
      "È tuo figlio a scegliere su cosa esercitarsi; l’app premia l’impegno, non il risultato."
    ],
    "faqHeading": "Domande frequenti",
    "faq": [
      {
        "q": "A partire da che età mio figlio può usare SkillQuest?",
        "a": "SkillQuest è pensata sia per i bambini che per gli adulti. Se tuo figlio è ancora piccolo, con la funzione famiglia puoi avviare il timer direttamente dal tuo telefono."
      },
      {
        "q": "Ma un’app non è solo un modo per passare più tempo davanti allo schermo?",
        "a": "Il timer continua a funzionare mentre tuo figlio legge o gioca; nessuno deve guardare lo schermo. Lo schermo serve solo per avviare il timer e per vedere il riepilogo dopo."
      },
      {
        "q": "Quanto costa SkillQuest?",
        "a": "L'installazione è gratuita e non ci sono pubblicità. La funzione famiglia è inclusa nell'abbonamento Family a {familyMonthly} al mese o {familyYearly} all'anno."
      },
      {
        "q": "Funziona su Android?",
        "a": "Sì, tramite una versione di prova su Google Play. Nella pagina di download trovi i tre passaggi per partecipare."
      }
    ],
    "tipsCta": "Consigli per esercitarsi ogni giorno",
    "finalHeading": "Provala questa settimana"
  }
};
