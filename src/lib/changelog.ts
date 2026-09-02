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
      title: 'Android Early Access, the easy way',
      description:
        'The Android download route now explains the three steps clearly: join the Google Group, opt in to the Play test with the same account, and install SkillQuest from Google Play.'
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
      title: 'Android Early Access, zonder gedoe',
      description:
        'De Android-downloadroute legt de drie stappen nu duidelijk uit: word lid van de Google Group, meld je met hetzelfde account aan voor de Play-test en installeer SkillQuest via Google Play.'
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
      title: 'Android Early Access – ganz einfach',
      description:
        'Die Android-Downloadseite erklärt jetzt drei klare Schritte: Google-Gruppe beitreten, mit demselben Konto am Play-Test teilnehmen und SkillQuest über Google Play installieren.'
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
      title: 'Accès anticipé Android, en toute simplicité',
      description:
        'La page de téléchargement Android explique maintenant trois étapes simples : rejoindre le groupe Google, accepter le test Play avec le même compte et installer SkillQuest depuis Google Play.'
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
      title: 'Acceso anticipado de Android, de forma sencilla',
      description:
        'La página de descarga de Android explica ahora tres pasos sencillos: unirse al grupo de Google, aceptar la prueba de Play con la misma cuenta e instalar SkillQuest desde Google Play.'
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
      title: 'Accesso anticipato Android, in modo semplicissimo',
      description:
        'La pagina di download Android ora spiega tre semplici passaggi: unirsi al gruppo Google, accettare il test Play con lo stesso account e installare SkillQuest da Google Play.'
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
