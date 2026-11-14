// Copy for the newsletter confirm and unsubscribe pages
// (src/app/[locale]/newsletter/*). Six languages, informal address as in
// the app (see the SkillQuest translation glossary).

import type {Locale} from '@/lib/marketing';

type Message = {title: string; message: string};

export type NewsletterConfirmCopy = {
  metaTitle: string;
  loading: string;
  ready: {heading: string; body: string; button: string};
  working: string;
  success: {heading: string; body: string};
  already: {heading: string; body: string};
  errors: Record<'expired' | 'invalid' | 'used' | 'server_error', Message>;
  resubscribe: string;
  backHome: string;
};

export type NewsletterUnsubscribeCopy = {
  metaTitle: string;
  loading: string;
  ready: {heading: string; body: string; button: string};
  working: string;
  success: {heading: string; body: string};
  errors: Record<'invalid' | 'server_error', Message>;
  backHome: string;
};

export const newsletterConfirmCopy: Record<Locale, NewsletterConfirmCopy> = {
  nl: {
    metaTitle: 'Inschrijving bevestigen',
    loading: 'Bezig met laden...',
    ready: {
      heading: 'Bevestig je inschrijving',
      body: 'Druk op de knop om je inschrijving voor de SkillQuest-nieuwsbrief te bevestigen.',
      button: 'Inschrijving bevestigen'
    },
    working: 'Bevestigen...',
    success: {heading: 'Je bent ingeschreven', body: 'Bedankt! Vanaf nu krijg je de SkillQuest-nieuwsbrief. In elke nieuwsbrief kun je je met één klik afmelden.'},
    already: {heading: 'Je was al ingeschreven', body: 'Deze inschrijving is al bevestigd. Je hoeft niets meer te doen.'},
    errors: {
      expired: {title: 'De link is verlopen', message: 'Een bevestigingslink is 24 uur geldig. Schrijf je opnieuw in, dan sturen we je een nieuwe.'},
      invalid: {title: 'Deze link werkt niet', message: 'De link is niet compleet of klopt niet. Kopieer de hele link uit de e-mail, of schrijf je opnieuw in.'},
      used: {title: 'Deze link is al gebruikt', message: 'Je hebt je na het bevestigen met deze link weer afgemeld, of we hebben je intussen een nieuwere link gestuurd. Wil je de nieuwsbrief weer ontvangen? Schrijf je dan opnieuw in.'},
      server_error: {title: 'Er ging iets mis', message: 'Het lukte nu niet aan onze kant. Probeer het over een paar minuten opnieuw met dezelfde link.'}
    },
    resubscribe: 'Opnieuw inschrijven',
    backHome: '← Terug naar de startpagina'
  },
  en: {
    metaTitle: 'Confirm your subscription',
    loading: 'Loading...',
    ready: {
      heading: 'Confirm your subscription',
      body: 'Press the button to confirm your subscription to the SkillQuest newsletter.',
      button: 'Confirm subscription'
    },
    working: 'Confirming...',
    success: {heading: "You're subscribed", body: "Thanks! From now on you'll get the SkillQuest newsletter. Every newsletter has a link to unsubscribe in one click."},
    already: {heading: 'You were already subscribed', body: "This subscription is already confirmed. There's nothing else you need to do."},
    errors: {
      expired: {title: 'This link has expired', message: "A confirmation link is valid for 24 hours. Subscribe again and we'll send you a new one."},
      invalid: {title: "This link doesn't work", message: 'The link is incomplete or incorrect. Copy the whole link from the email, or subscribe again.'},
      used: {title: 'This link has already been used', message: 'You unsubscribed after confirming with this link, or we have sent you a newer link since. Want the newsletter again? Subscribe again.'},
      server_error: {title: 'Something went wrong', message: "It didn't work on our side just now. Try again in a few minutes with the same link."}
    },
    resubscribe: 'Subscribe again',
    backHome: '← Back to the homepage'
  },
  de: {
    metaTitle: 'Newsletter-Abonnement bestätigen',
    loading: 'Wird geladen ...',
    ready: {
      heading: 'Bestätige dein Abonnement',
      body: 'Klicke auf die Schaltfläche, um dein Abonnement für den SkillQuest-Newsletter zu bestätigen.',
      button: 'Abonnement bestätigen'
    },
    working: 'Wird bestätigt ...',
    success: {heading: 'Du bist jetzt angemeldet', body: 'Danke! Ab sofort bekommst du den SkillQuest-Newsletter. Jeder Newsletter enthält einen Link, über den du dich mit einem Klick abmelden kannst.'},
    already: {heading: 'Du warst bereits angemeldet', body: 'Dieses Abonnement ist bereits bestätigt. Du musst nichts weiter tun.'},
    errors: {
      expired: {title: 'Dieser Link ist abgelaufen', message: 'Ein Bestätigungslink ist 24 Stunden lang gültig. Melde dich einfach noch einmal an, dann schicken wir dir einen neuen.'},
      invalid: {title: 'Dieser Link funktioniert nicht', message: 'Der Link ist unvollständig oder falsch. Kopiere den gesamten Link aus der E-Mail oder melde dich erneut an.'},
      used: {title: 'Dieser Link wurde bereits verwendet', message: 'Du hast dich nach der Bestätigung mit diesem Link wieder abgemeldet, oder wir haben dir inzwischen einen neueren Link geschickt. Möchtest du den Newsletter wieder erhalten? Dann melde dich einfach erneut an.'},
      server_error: {title: 'Es ist ein Fehler aufgetreten', message: 'Bei uns hat es gerade nicht funktioniert. Versuch es in ein paar Minuten noch einmal mit demselben Link.'}
    },
    resubscribe: 'Erneut abonnieren',
    backHome: '← Zurück zur Startseite'
  },
  fr: {
    metaTitle: "Confirmer l'inscription à la newsletter",
    loading: 'Chargement en cours...',
    ready: {
      heading: 'Confirme ton inscription',
      body: 'Clique sur le bouton pour confirmer ton inscription à la newsletter de SkillQuest.',
      button: "Confirmer l'inscription"
    },
    working: 'Confirmation en cours...',
    success: {heading: 'Tu es inscrit', body: 'Merci ! À partir de maintenant, tu recevras la newsletter de SkillQuest. Chaque newsletter contient un lien pour te désabonner en un clic.'},
    already: {heading: 'Tu étais déjà abonné', body: "Ton inscription est déjà confirmée. Tu n'as rien d'autre à faire."},
    errors: {
      expired: {title: "Ce lien n'est plus valide", message: "Un lien de confirmation est valable 24 heures. Inscris-toi de nouveau et nous t'en enverrons un nouveau."},
      invalid: {title: 'Ce lien ne fonctionne pas', message: "Le lien est incomplet ou incorrect. Copie le lien en entier depuis l'e-mail, ou réinscris-toi."},
      used: {title: 'Ce lien a déjà été utilisé', message: "Tu t'es désabonné après avoir confirmé avec ce lien, ou nous t'avons envoyé un lien plus récent depuis. Tu veux à nouveau recevoir la newsletter ? Inscris-toi de nouveau."},
      server_error: {title: "Une erreur s'est produite", message: "Ça n'a pas fonctionné de notre côté. Réessaie dans quelques minutes avec le même lien."}
    },
    resubscribe: 'Se réinscrire',
    backHome: "← Retour à la page d'accueil"
  },
  es: {
    metaTitle: 'Confirmar la suscripción al boletín',
    loading: 'Cargando...',
    ready: {
      heading: 'Confirma tu suscripción',
      body: 'Pulsa el botón para confirmar tu suscripción al boletín de SkillQuest.',
      button: 'Confirmar suscripción'
    },
    working: 'Confirmando...',
    success: {heading: 'Ya estás suscrito', body: '¡Gracias! A partir de ahora recibirás el boletín de SkillQuest. Cada boletín incluye un enlace para darte de baja con un solo clic.'},
    already: {heading: 'Ya estabas suscrito', body: 'Ya se ha confirmado esta suscripción. No tienes que hacer nada más.'},
    errors: {
      expired: {title: 'Este enlace ha caducado', message: 'El enlace de confirmación es válido durante 24 horas. Si te vuelves a suscribir, te mandaremos uno nuevo.'},
      invalid: {title: 'Este enlace no funciona', message: 'El enlace está incompleto o es incorrecto. Copia el enlace completo del correo electrónico o vuelve a suscribirte.'},
      used: {title: 'Este enlace ya se ha utilizado', message: 'Te diste de baja después de confirmar con este enlace, o te hemos enviado un enlace más reciente desde entonces. ¿Quieres volver a recibir el boletín? Suscríbete de nuevo.'},
      server_error: {title: 'Ha surgido un error', message: 'Ahora mismo no ha funcionado por nuestra parte. Inténtalo de nuevo dentro de unos minutos con el mismo enlace.'}
    },
    resubscribe: 'Volver a suscribirse',
    backHome: '← Volver a la página de inicio'
  },
  it: {
    metaTitle: "Conferma l'iscrizione alla newsletter",
    loading: 'Caricamento in corso...',
    ready: {
      heading: 'Conferma la tua iscrizione',
      body: 'Clicca sul pulsante per confermare l’iscrizione alla newsletter di SkillQuest.',
      button: 'Conferma l’iscrizione'
    },
    working: 'Conferma in corso...',
    success: {heading: 'Ti sei iscritto', body: "Grazie! D'ora in poi riceverai la newsletter di SkillQuest. Ogni newsletter contiene un link per annullare l'iscrizione con un solo clic."},
    already: {heading: 'Eri già iscritto', body: "L'iscrizione è già confermata. Non devi fare nient'altro."},
    errors: {
      expired: {title: 'Questo link è scaduto', message: 'Il link di conferma è valido per 24 ore. Iscriviti di nuovo e te ne manderemo uno nuovo.'},
      invalid: {title: 'Questo link non funziona', message: "Il link è incompleto o errato. Copia l'intero link dall'email oppure iscriviti di nuovo."},
      used: {title: 'Questo link è già stato utilizzato', message: "Hai annullato l'iscrizione dopo aver confermato con questo link, oppure nel frattempo te ne abbiamo mandato uno più recente. Vuoi ricevere di nuovo la newsletter? Iscriviti di nuovo."},
      server_error: {title: 'Si è verificato un errore', message: 'Per un momento non ha funzionato da parte nostra. Riprova tra qualche minuto con lo stesso link.'}
    },
    resubscribe: 'Iscriviti di nuovo',
    backHome: '← Torna alla homepage'
  }
};

export const newsletterUnsubscribeCopy: Record<Locale, NewsletterUnsubscribeCopy> = {
  nl: {
    metaTitle: 'Afmelden voor de nieuwsbrief',
    loading: 'Bezig met laden...',
    ready: {
      heading: 'Afmelden voor de nieuwsbrief',
      body: 'Wil je de SkillQuest-nieuwsbrief niet meer ontvangen? Druk op de knop, dan sturen we hem je niet meer.',
      button: 'Afmelden'
    },
    working: 'Afmelden...',
    success: {heading: 'Je bent afgemeld', body: 'Je krijgt de SkillQuest-nieuwsbrief niet meer. Heb je een SkillQuest-account, dan blijft dat gewoon bestaan.'},
    errors: {
      invalid: {title: 'Deze link werkt niet', message: 'De afmeldlink is niet compleet. Gebruik de link onderaan een nieuwsbrief, of mail ons op hello@skill-quest.app, dan melden we je af.'},
      server_error: {title: 'Er ging iets mis', message: 'Het lukte nu niet aan onze kant. Probeer het over een paar minuten opnieuw.'}
    },
    backHome: '← Terug naar de startpagina'
  },
  en: {
    metaTitle: 'Unsubscribe from the newsletter',
    loading: 'Loading...',
    ready: {
      heading: 'Unsubscribe from the newsletter',
      body: "Don't want the SkillQuest newsletter anymore? Press the button and we'll stop sending it.",
      button: 'Unsubscribe'
    },
    working: 'Unsubscribing...',
    success: {heading: "You've been unsubscribed", body: "You won't get the SkillQuest newsletter anymore. If you have a SkillQuest account, it stays as it is."},
    errors: {
      invalid: {title: "This link doesn't work", message: "The unsubscribe link is incomplete. Use the link at the bottom of a newsletter, or email us at hello@skill-quest.app and we'll unsubscribe you."},
      server_error: {title: 'Something went wrong', message: "It didn't work on our side just now. Try again in a few minutes."}
    },
    backHome: '← Back to the homepage'
  },
  de: {
    metaTitle: 'Newsletter abbestellen',
    loading: 'Wird geladen ...',
    ready: {
      heading: 'Newsletter abbestellen',
      body: 'Du möchtest den SkillQuest-Newsletter nicht mehr erhalten? Klicke auf die Schaltfläche und wir senden ihn dir nicht mehr zu.',
      button: 'Abmelden'
    },
    working: 'Wird abgemeldet ...',
    success: {heading: 'Du bist jetzt abgemeldet', body: 'Du erhältst den SkillQuest-Newsletter nicht mehr. Wenn du ein SkillQuest-Konto hast, bleibt alles wie bisher.'},
    errors: {
      invalid: {title: 'Dieser Link funktioniert nicht', message: 'Der Link zum Abmelden ist unvollständig. Nutze den Link am Ende des Newsletters oder schreib uns eine E-Mail an hello@skill-quest.app, dann melden wir dich ab.'},
      server_error: {title: 'Es ist ein Fehler aufgetreten', message: 'Es hat bei uns gerade nicht funktioniert. Versuch es in ein paar Minuten noch einmal.'}
    },
    backHome: '← Zurück zur Startseite'
  },
  fr: {
    metaTitle: 'Se désabonner de la newsletter',
    loading: 'Chargement en cours...',
    ready: {
      heading: 'Se désabonner de la newsletter',
      body: "Tu ne veux plus recevoir la newsletter de SkillQuest ? Clique sur le bouton et nous arrêterons de te l'envoyer.",
      button: 'Se désabonner'
    },
    working: 'Désabonnement en cours...',
    success: {heading: 'Tu es désabonné', body: 'Tu ne recevras plus la newsletter de SkillQuest. Si tu as un compte SkillQuest, il reste inchangé.'},
    errors: {
      invalid: {title: 'Ce lien ne fonctionne pas', message: "Le lien de désabonnement est incomplet. Utilise le lien en bas d'une newsletter, ou écris-nous à hello@skill-quest.app et nous te désabonnerons."},
      server_error: {title: "Une erreur s'est produite", message: "Ça n'a pas fonctionné de notre côté. Réessaie dans quelques minutes."}
    },
    backHome: "← Retour à la page d'accueil"
  },
  es: {
    metaTitle: 'Darse de baja del boletín',
    loading: 'Cargando...',
    ready: {
      heading: 'Darse de baja del boletín',
      body: '¿Ya no quieres recibir el boletín de SkillQuest? Pulsa el botón y dejaremos de enviártelo.',
      button: 'Darse de baja'
    },
    working: 'Dando de baja...',
    success: {heading: 'Ya te has dado de baja', body: 'Ya no recibirás el boletín de SkillQuest. Si tienes una cuenta de SkillQuest, seguirá igual.'},
    errors: {
      invalid: {title: 'Este enlace no funciona', message: 'El enlace para darte de baja está incompleto. Usa el enlace que aparece al final del boletín o envíanos un correo a hello@skill-quest.app y te daremos de baja.'},
      server_error: {title: 'Ha surgido un error', message: 'Ahora mismo no ha funcionado por nuestra parte. Inténtalo de nuevo dentro de unos minutos.'}
    },
    backHome: '← Volver a la página de inicio'
  },
  it: {
    metaTitle: "Annulla l'iscrizione alla newsletter",
    loading: 'Caricamento in corso...',
    ready: {
      heading: 'Annulla l’iscrizione alla newsletter',
      body: 'Non vuoi più ricevere la newsletter di SkillQuest? Clicca sul pulsante e smetteremo di inviartela.',
      button: 'Annulla iscrizione'
    },
    working: 'Annullamento in corso...',
    success: {heading: 'Iscrizione annullata', body: 'Non riceverai più la newsletter di SkillQuest. Se hai un account SkillQuest, rimarrà attivo come prima.'},
    errors: {
      invalid: {title: 'Questo link non funziona', message: "Il link per annullare l'iscrizione è incompleto. Usa il link in fondo a una newsletter, oppure scrivici a hello@skill-quest.app e annulleremo noi l'iscrizione."},
      server_error: {title: 'Si è verificato un errore', message: 'Per ora non ha funzionato da parte nostra. Riprova tra qualche minuto.'}
    },
    backHome: '← Torna alla homepage'
  }
};
