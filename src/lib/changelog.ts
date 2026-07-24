import type {Locale} from '@/lib/marketing';

export type ChangelogEntry = {
  date: string;
  title: string;
  description: string;
};

const changelogEntries: Record<Locale, ChangelogEntry[]> = {
  en: [
    {
      date: '2026-07-24',
      title: 'Android alpha signup, the easy way',
      description:
        "The Android download button now leads to a simple email signup instead of a broken direct link. Confirm your email, and you'll get an install link as soon as you're added to the closed testing group."
    },
    {
      date: '2026-07-24',
      title: 'Account emails now speak your language',
      description:
        "Confirmation, welcome, and install emails are fully localized in English, Dutch, German, French, Spanish, and Italian, matching SkillQuest's teal and orange branding."
    },
    {
      date: '2026-07-24',
      title: 'Stronger spam protection',
      description:
        'Signups are now rate-limited by IP address and protected by a hidden honeypot field, keeping the waitlist clean without adding friction for real users.'
    },
    {
      date: '2026-07-24',
      title: 'Tighter website security',
      description:
        'Added a strict Content-Security-Policy and other security headers, and closed a database policy that let signups bypass spam protection.'
    },
    {
      date: '2026-07-24',
      title: 'New FAQ page',
      description:
        'Added a searchable FAQ covering pricing, Family, focus timers, and privacy, with structured data so answers can show up directly in Google search results.'
    }
  ],
  nl: [
    {
      date: '2026-07-24',
      title: 'Android alpha-aanmelding, zonder gedoe',
      description:
        'De Android-downloadknop leidt nu naar een eenvoudige e-mailaanmelding in plaats van een kapotte directe link. Bevestig je e-mail en je krijgt een installatielink zodra je aan de closed testing-groep bent toegevoegd.'
    },
    {
      date: '2026-07-24',
      title: 'Accountmails spreken nu jouw taal',
      description:
        'Bevestigings-, welkoms- en installatiemails zijn volledig vertaald in het Engels, Nederlands, Duits, Frans, Spaans en Italiaans, passend bij de teal- en oranje huisstijl van SkillQuest.'
    },
    {
      date: '2026-07-24',
      title: 'Sterkere spambescherming',
      description:
        'Aanmeldingen worden nu per IP-adres beperkt in aantal en beschermd door een verborgen honeypot-veld, zodat de wachtlijst schoon blijft zonder extra drempels voor echte gebruikers.'
    },
    {
      date: '2026-07-24',
      title: 'Strengere websitebeveiliging',
      description:
        'Een strikt Content-Security-Policy en andere beveiligingsheaders toegevoegd, en een databasebeleid gesloten waarmee aanmeldingen de spambescherming konden omzeilen.'
    },
    {
      date: '2026-07-24',
      title: "Nieuwe FAQ-pagina",
      description:
        'Een doorzoekbare FAQ toegevoegd over prijzen, Family, focus timers en privacy, met gestructureerde data zodat antwoorden direct in Google-zoekresultaten kunnen verschijnen.'
    }
  ],
  de: [
    {
      date: '2026-07-24',
      title: 'Android-Alpha-Anmeldung – ganz einfach',
      description:
        'Der Android-Download-Button führt jetzt zu einer einfachen E-Mail-Anmeldung statt zu einem defekten Direktlink. Bestätige deine E-Mail-Adresse, und du erhältst einen Installationslink, sobald du zur geschlossenen Testgruppe hinzugefügt wurdest.'
    },
    {
      date: '2026-07-24',
      title: 'Die E-Mails zu deinem Konto sind jetzt in deiner Sprache',
      description:
        'Bestätigungs-, Begrüßungs- und Installations-E-Mails sind vollständig ins Englische, Niederländische, Deutsche, Französische, Spanische und Italienische übersetzt und passen zum blaugrünen und orangefarbenen Branding von SkillQuest.'
    },
    {
      date: '2026-07-24',
      title: 'Besserer Spam-Schutz',
      description:
        'Anmeldungen werden jetzt pro IP-Adresse begrenzt und durch ein verstecktes Honeypot-Feld geschützt, wodurch die Warteliste sauber bleibt, ohne echte Nutzer zu behindern.'
    },
    {
      date: '2026-07-24',
      title: 'Mehr Sicherheit auf der Website',
      description:
        'Es wurde eine strenge Content-Security-Policy sowie weitere Sicherheits-Header hinzugefügt und eine Datenbankrichtlinie geschlossen, durch die sich Neuanmeldungen den Spam-Schutz umgehen konnten.'
    },
    {
      date: '2026-07-24',
      title: 'Neue FAQ-Seite',
      description:
        'Wir haben eine durchsuchbare FAQ hinzugefügt, die Themen wie Preise, Family, Fokus-Timer und Datenschutz abdeckt. Sie enthält strukturierte Daten, sodass die Antworten direkt in den Google-Suchergebnissen angezeigt werden können.'
    }
  ],
  fr: [
    {
      date: '2026-07-24',
      title: "S'inscrire à la version alpha d'Android, en toute simplicité",
      description:
        "Le bouton de téléchargement Android te redirige désormais vers une simple inscription par e-mail, au lieu d'un lien direct qui ne fonctionne pas. Confirme ton adresse e-mail, et tu recevras un lien d'installation dès que tu auras été ajouté au groupe de test fermé."
    },
    {
      date: '2026-07-24',
      title: 'Les e-mails liés à ton compte sont désormais dans ta langue',
      description:
        "Les e-mails de confirmation, de bienvenue et d'installation sont entièrement localisés en anglais, néerlandais, allemand, français, espagnol et italien, et reprennent les couleurs bleu sarcelle et orange de la marque SkillQuest."
    },
    {
      date: '2026-07-24',
      title: 'Une protection anti-spam plus efficace',
      description:
        "Les inscriptions sont désormais limitées par adresse IP et protégées par un champ honeypot caché, ce qui permet de garder la liste d'attente propre sans compliquer la vie des vrais utilisateurs."
    },
    {
      date: '2026-07-24',
      title: 'Une sécurité renforcée pour le site',
      description:
        "On a ajouté une politique de sécurité de contenu (Content-Security-Policy) stricte ainsi que d'autres en-têtes de sécurité, et on a supprimé une règle de la base de données qui permettait aux inscriptions de contourner la protection anti-spam."
    },
    {
      date: '2026-07-24',
      title: 'Nouvelle page FAQ',
      description:
        'On a ajouté une FAQ avec fonction de recherche qui couvre les tarifs, le forfait Family, les minuteries de concentration et la confidentialité, avec des données structurées pour que les réponses apparaissent directement dans les résultats de recherche Google.'
    }
  ],
  es: [
    {
      date: '2026-07-24',
      title: 'Cómo apuntarte a la alpha de Android de forma sencilla',
      description:
        'El botón de descarga para Android ahora te lleva a un sencillo proceso de registro por correo electrónico, en lugar de a un enlace directo que no funciona. Confirma tu correo electrónico y recibirás un enlace de instalación en cuanto te añadan al grupo de pruebas cerrado.'
    },
    {
      date: '2026-07-24',
      title: 'Los correos de tu cuenta ahora están en tu idioma',
      description:
        'Los correos electrónicos de confirmación, bienvenida e instalación están totalmente traducidos al inglés, neerlandés, alemán, francés, español e italiano, y siguen la imagen de marca de SkillQuest, con los colores verde azulado y naranja.'
    },
    {
      date: '2026-07-24',
      title: 'Mayor protección contra el spam',
      description:
        'Ahora los registros tienen un límite de velocidad por dirección IP y están protegidos por un campo honeypot oculto, lo que mantiene la lista de espera limpia sin crear dificultades a los usuarios reales.'
    },
    {
      date: '2026-07-24',
      title: 'Mayor seguridad en la web',
      description:
        'Hemos añadido una política de seguridad de contenido (Content-Security-Policy) estricta y otros encabezados de seguridad, y hemos desactivado una política de la base de datos que permitía que los registros eludieran la protección contra el spam.'
    },
    {
      date: '2026-07-24',
      title: 'Nueva página de preguntas frecuentes',
      description:
        'Hemos añadido una sección de preguntas frecuentes con función de búsqueda que abarca precios, el plan Family, los temporizadores de concentración y la privacidad, con datos estructurados para que las respuestas aparezcan directamente en los resultados de búsqueda de Google.'
    }
  ],
  it: [
    {
      date: '2026-07-24',
      title: "Iscriviti all'alpha di Android, in modo semplicissimo",
      description:
        "Il pulsante di download per Android ora rimanda a una semplice procedura di registrazione via email, invece che a un link diretto non funzionante. Conferma la tua email e riceverai un link per l'installazione non appena sarai aggiunto al gruppo di test a porte chiuse."
    },
    {
      date: '2026-07-24',
      title: 'Le email relative al tuo account ora sono nella tua lingua',
      description:
        'Le email di conferma, benvenuto e installazione sono completamente localizzate in inglese, olandese, tedesco, francese, spagnolo e italiano, in linea con i colori del marchio SkillQuest (verde acqua e arancione).'
    },
    {
      date: '2026-07-24',
      title: 'Protezione anti-spam più efficace',
      description:
        "Le registrazioni sono ora soggette a un limite di frequenza per indirizzo IP e protette da un campo honeypot nascosto, il che permette di mantenere pulita la lista d'attesa senza creare difficoltà agli utenti reali."
    },
    {
      date: '2026-07-24',
      title: 'Maggiore sicurezza del sito',
      description:
        'Abbiamo aggiunto una Content-Security-Policy rigorosa e altre intestazioni di sicurezza, e abbiamo disattivato una politica del database che permetteva alle registrazioni di aggirare la protezione antispam.'
    },
    {
      date: '2026-07-24',
      title: 'Nuova pagina delle domande frequenti',
      description:
        'Abbiamo aggiunto una sezione FAQ con funzione di ricerca che tratta prezzi, il piano Family, i timer di concentrazione e la privacy, con dati strutturati in modo che le risposte possano apparire direttamente nei risultati di ricerca di Google.'
    }
  ]
};

export function getChangelogEntries(locale: Locale): ChangelogEntry[] {
  return changelogEntries[locale] ?? changelogEntries.en;
}
