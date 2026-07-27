export const authLocales = ['nl', 'en', 'de', 'fr', 'es', 'it'] as const;

export type AuthLocale = (typeof authLocales)[number];

export type AuthCopy = {
  logoText: string;
  forgotTitle: string;
  forgotIntro: string;
  emailLabel: string;
  forgotSubmit: string;
  forgotSubmitting: string;
  forgotSentTitle: string;
  forgotSentBody: string;
  backToSkillQuest: string;
  forgotError: string;
  confirmTitle: string;
  confirmIntro: string;
  continueButton: string;
  expiredTitle: string;
  confirmExpiredBody: string;
  requestNewLink: string;
  resetSuccessTitle: string;
  resetSuccessBody: string;
  openSkillQuest: string;
  resetExpiredBody: string;
  resetTitle: string;
  resetIntro: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  showPasswordSuffix: string;
  hidePasswordSuffix: string;
  passwordRequirements: string;
  passwordManagerHint: string;
  mismatchError: string;
  resetGenericError: string;
  checkingButton: string;
  updatingButton: string;
  updatePasswordButton: string;
};

export const defaultAuthLocale: AuthLocale = 'nl';

export const authCopy: Record<AuthLocale, AuthCopy> = {
  nl: {
    logoText: 'SQ',
    forgotTitle: 'Wachtwoord vergeten',
    forgotIntro:
      'Vul je e-mailadres in. We sturen een link waarmee je via de website een nieuw wachtwoord kunt kiezen.',
    emailLabel: 'E-mailadres',
    forgotSubmit: 'Resetlink versturen',
    forgotSubmitting: 'Versturen...',
    forgotSentTitle: 'Check je e-mail',
    forgotSentBody:
      'Als er een account bestaat voor dit e-mailadres, ontvang je een link om je wachtwoord opnieuw in te stellen. De link werkt op je telefoon en op je computer.',
    backToSkillQuest: 'Terug naar SkillQuest',
    forgotError: 'We konden de e-mail niet versturen. Probeer het later opnieuw.',
    confirmTitle: 'Wachtwoord opnieuw instellen',
    confirmIntro:
      'Bevestig dat je je SkillQuest-wachtwoord wilt wijzigen. Daarna kun je een nieuw wachtwoord kiezen.',
    continueButton: 'Doorgaan',
    expiredTitle: 'Resetlink verlopen',
    confirmExpiredBody:
      'Deze link mist gegevens of is niet meer geldig. Vraag een nieuwe wachtwoordreset aan.',
    requestNewLink: 'Nieuwe resetlink aanvragen',
    resetSuccessTitle: 'Wachtwoord gewijzigd',
    resetSuccessBody:
      'Je wachtwoord is bijgewerkt. We hebben je sessies uitgelogd; log opnieuw in met je nieuwe wachtwoord.',
    openSkillQuest: 'Open SkillQuest',
    resetExpiredBody:
      'Vraag een nieuwe wachtwoordreset aan en open de nieuwste link uit je e-mail.',
    resetTitle: 'Nieuw wachtwoord instellen',
    resetIntro: 'Kies een sterk nieuw wachtwoord voor je SkillQuest-account.',
    newPasswordLabel: 'Nieuw wachtwoord',
    confirmPasswordLabel: 'Bevestig wachtwoord',
    showPasswordSuffix: 'tonen',
    hidePasswordSuffix: 'verbergen',
    passwordRequirements:
      'Minimaal 12 tekens met een kleine letter, hoofdletter en cijfer.',
    passwordManagerHint:
      'Gebruik bij voorkeur een uniek wachtwoord uit je password manager.',
    mismatchError: 'De wachtwoorden komen niet overeen.',
    resetGenericError:
      'Je wachtwoord kon niet worden gewijzigd. Probeer het opnieuw.',
    checkingButton: 'Controleren...',
    updatingButton: 'Bijwerken...',
    updatePasswordButton: 'Wachtwoord wijzigen'
  },
  en: {
    logoText: 'SQ',
    forgotTitle: 'Forgot password',
    forgotIntro:
      'Enter your email address. We will send you a link to choose a new password on the website.',
    emailLabel: 'Email address',
    forgotSubmit: 'Send reset link',
    forgotSubmitting: 'Sending...',
    forgotSentTitle: 'Check your email',
    forgotSentBody:
      'If an account exists for this email address, you will receive a link to reset your password. The link works on both your phone and computer.',
    backToSkillQuest: 'Back to SkillQuest',
    forgotError: "We couldn't send the email. Please try again later.",
    confirmTitle: 'Reset password',
    confirmIntro:
      'Please confirm that you want to change your SkillQuest password. After that, you can choose a new password.',
    continueButton: 'Continue',
    expiredTitle: 'Reset link expired',
    confirmExpiredBody:
      'This link is missing details or is no longer valid. Please request a new password reset.',
    requestNewLink: 'Request new reset link',
    resetSuccessTitle: 'Password changed',
    resetSuccessBody:
      'Your password has been updated. We have logged you out of your sessions; please log in again with your new password.',
    openSkillQuest: 'Open SkillQuest',
    resetExpiredBody:
      'Please request a new password reset and open the latest link from your email.',
    resetTitle: 'Set new password',
    resetIntro: 'Choose a strong new password for your SkillQuest account.',
    newPasswordLabel: 'New password',
    confirmPasswordLabel: 'Confirm password',
    showPasswordSuffix: 'show',
    hidePasswordSuffix: 'hide',
    passwordRequirements:
      'At least 12 characters with a lowercase letter, uppercase letter, and digit.',
    passwordManagerHint:
      'Preferably use a unique password from your password manager.',
    mismatchError: 'Passwords do not match.',
    resetGenericError: 'Your password could not be changed. Please try again.',
    checkingButton: 'Checking...',
    updatingButton: 'Updating...',
    updatePasswordButton: 'Change password'
  },
  de: {
    logoText: 'SQ',
    forgotTitle: 'Passwort vergessen',
    forgotIntro:
      'Gib deine E-Mail-Adresse ein. Wir senden dir einen Link, mit dem du ein neues Passwort auf der Website erstellen kannst.',
    emailLabel: 'E-Mail-Adresse',
    forgotSubmit: 'Reset-Link senden',
    forgotSubmitting: 'Wird gesendet...',
    forgotSentTitle: 'Prüfe deine E-Mails',
    forgotSentBody:
      'Wenn für diese E-Mail-Adresse ein Konto existiert, erhältst du einen Link zum Zurücksetzen deines Passworts. Der Link funktioniert auf deinem Smartphone und deinem Computer.',
    backToSkillQuest: 'Zurück zu SkillQuest',
    forgotError:
      'Die E-Mail konnte nicht gesendet werden. Bitte versuche es später noch einmal.',
    confirmTitle: 'Passwort zurücksetzen',
    confirmIntro:
      'Bitte bestätige, dass du dein SkillQuest-Passwort ändern möchtest. Danach kannst du ein neues Passwort wählen.',
    continueButton: 'Weiter',
    expiredTitle: 'Reset-Link abgelaufen',
    confirmExpiredBody:
      'Dieser Link ist unvollständig oder nicht mehr gültig. Bitte fordere einen neuen Link zum Zurücksetzen des Passworts an.',
    requestNewLink: 'Neuen Reset-Link anfordern',
    resetSuccessTitle: 'Passwort geändert',
    resetSuccessBody:
      'Dein Passwort wurde aktualisiert. Wir haben dich aus allen Sitzungen abgemeldet; bitte melde dich mit deinem neuen Passwort wieder an.',
    openSkillQuest: 'SkillQuest öffnen',
    resetExpiredBody:
      'Bitte fordere einen neuen Link zum Zurücksetzen des Passworts an und öffne den neuesten Link aus deiner E-Mail.',
    resetTitle: 'Neues Passwort festlegen',
    resetIntro: 'Wähle ein starkes neues Passwort für dein SkillQuest-Konto.',
    newPasswordLabel: 'Neues Passwort',
    confirmPasswordLabel: 'Passwort bestätigen',
    showPasswordSuffix: 'anzeigen',
    hidePasswordSuffix: 'ausblenden',
    passwordRequirements:
      'Mindestens 12 Zeichen mit einem Kleinbuchstaben, Großbuchstaben und einer Ziffer.',
    passwordManagerHint:
      'Verwende vorzugsweise ein einzigartiges Passwort aus deinem Passwort-Manager.',
    mismatchError: 'Die Passwörter stimmen nicht überein.',
    resetGenericError:
      'Dein Passwort konnte nicht geändert werden. Bitte versuche es erneut.',
    checkingButton: 'Wird geprüft...',
    updatingButton: 'Wird aktualisiert...',
    updatePasswordButton: 'Passwort ändern'
  },
  fr: {
    logoText: 'SQ',
    forgotTitle: 'Mot de passe oublié',
    forgotIntro:
      'Saisissez votre adresse e-mail. Nous vous enverrons un lien pour choisir un nouveau mot de passe sur le site web.',
    emailLabel: 'Adresse e-mail',
    forgotSubmit: 'Envoyer le lien de réinitialisation',
    forgotSubmitting: 'Envoi en cours...',
    forgotSentTitle: 'Vérifiez vos e-mails',
    forgotSentBody:
      'Si un compte existe pour cette adresse e-mail, vous recevrez un lien pour réinitialiser votre mot de passe. Le lien fonctionne sur votre téléphone et votre ordinateur.',
    backToSkillQuest: 'Retour à SkillQuest',
    forgotError: "Impossible d'envoyer l'e-mail. Veuillez réessayer plus tard.",
    confirmTitle: 'Réinitialiser le mot de passe',
    confirmIntro:
      'Veuillez confirmer que vous souhaitez modifier votre mot de passe SkillQuest. Vous pourrez ensuite choisir un nouveau mot de passe.',
    continueButton: 'Continuer',
    expiredTitle: 'Lien de réinitialisation expiré',
    confirmExpiredBody:
      "Ce lien est incomplet ou n'est plus valide. Veuillez demander une nouvelle réinitialisation de mot de passe.",
    requestNewLink: 'Demander un nouveau lien de réinitialisation',
    resetSuccessTitle: 'Mot de passe modifié',
    resetSuccessBody:
      'Votre mot de passe a été mis à jour. Nous vous avons déconnecté de vos sessions actuelles ; veuillez vous reconnecter avec votre nouveau mot de passe.',
    openSkillQuest: 'Ouvrir SkillQuest',
    resetExpiredBody:
      'Veuillez demander une nouvelle réinitialisation de mot de passe et ouvrir le dernier lien reçu par e-mail.',
    resetTitle: 'Définir un nouveau mot de passe',
    resetIntro:
      'Choisissez un nouveau mot de passe fort pour votre compte SkillQuest.',
    newPasswordLabel: 'Nouveau mot de passe',
    confirmPasswordLabel: 'Confirmer le mot de passe',
    showPasswordSuffix: 'afficher',
    hidePasswordSuffix: 'masquer',
    passwordRequirements:
      'Au moins 12 caractères avec une lettre minuscule, une lettre majuscule et un chiffre.',
    passwordManagerHint:
      'Utilisez de préférence un mot de passe unique provenant de votre gestionnaire de mots de passe.',
    mismatchError: 'Les mots de passe ne correspondent pas.',
    resetGenericError:
      "Votre mot de passe n'a pas pu être modifié. Veuillez réessayer.",
    checkingButton: 'Vérification...',
    updatingButton: 'Mise à jour...',
    updatePasswordButton: 'Modifier le mot de passe'
  },
  es: {
    logoText: 'SQ',
    forgotTitle: '¿Has olvidado tu contraseña?',
    forgotIntro:
      'Introduce tu dirección de correo electrónico. Te enviaremos un enlace para elegir una nueva contraseña en el sitio web.',
    emailLabel: 'Correo electrónico',
    forgotSubmit: 'Enviar enlace de restablecimiento',
    forgotSubmitting: 'Enviando...',
    forgotSentTitle: 'Comprueba tu correo',
    forgotSentBody:
      'Si existe una cuenta para este correo electrónico, recibirás un enlace para restablecer tu contraseña. El enlace funciona tanto en tu teléfono como en tu ordenador.',
    backToSkillQuest: 'Volver a SkillQuest',
    forgotError:
      'No hemos podido enviar el correo. Por favor, inténtalo de nuevo más tarde.',
    confirmTitle: 'Restablecer contraseña',
    confirmIntro:
      'Confirma que deseas cambiar tu contraseña de SkillQuest. Después podrás elegir una nueva.',
    continueButton: 'Continuar',
    expiredTitle: 'Enlace de restablecimiento caducado',
    confirmExpiredBody:
      'Este enlace está incompleto o ya no es válido. Solicita un nuevo restablecimiento de contraseña.',
    requestNewLink: 'Solicitar nuevo enlace de restablecimiento',
    resetSuccessTitle: 'Contraseña cambiada',
    resetSuccessBody:
      'Tu contraseña ha sido actualizada. Hemos cerrado tus sesiones activas; por favor, inicia sesión de nuevo con tu nueva contraseña.',
    openSkillQuest: 'Abrir SkillQuest',
    resetExpiredBody:
      'Solicita un nuevo restablecimiento de contraseña y abre el enlace más reciente de tu correo.',
    resetTitle: 'Establecer nueva contraseña',
    resetIntro: 'Elige una nueva contraseña segura para tu cuenta de SkillQuest.',
    newPasswordLabel: 'Nueva contraseña',
    confirmPasswordLabel: 'Confirmar contraseña',
    showPasswordSuffix: 'mostrar',
    hidePasswordSuffix: 'ocultar',
    passwordRequirements:
      'Al menos 12 caracteres con una letra minúscula, una letra mayúscula y un número.',
    passwordManagerHint:
      'Se recomienda usar una contraseña única de tu gestor de contraseñas.',
    mismatchError: 'Las contraseñas no coinciden.',
    resetGenericError:
      'No se ha podido cambiar tu contraseña. Por favor, inténtalo de nuevo.',
    checkingButton: 'Comprobando...',
    updatingButton: 'Actualizando...',
    updatePasswordButton: 'Cambiar contraseña'
  },
  it: {
    logoText: 'SQ',
    forgotTitle: 'Password dimenticata',
    forgotIntro:
      'Inserisci il tuo indirizzo email. Ti invieremo un link per scegliere una nuova password sul sito web.',
    emailLabel: 'Indirizzo email',
    forgotSubmit: 'Invia link di ripristino',
    forgotSubmitting: 'Invio in corso...',
    forgotSentTitle: 'Controlla la tua email',
    forgotSentBody:
      "Se esiste un account associato a questo indirizzo email, riceverai un link per reimpostare la password. Il link funziona sia sul telefono che sul computer.",
    backToSkillQuest: 'Torna a SkillQuest',
    forgotError: "Impossibile inviare l'email. Riprova più tardi.",
    confirmTitle: 'Reimposta password',
    confirmIntro:
      'Conferma di voler modificare la tua password di SkillQuest. Successivamente potrai sceglierne una nuova.',
    continueButton: 'Continua',
    expiredTitle: 'Link di ripristino scaduto',
    confirmExpiredBody:
      'Questo link non contiene dati sufficienti o non è più valido. Richiedi un nuovo ripristino della password.',
    requestNewLink: 'Richiedi nuovo link di ripristino',
    resetSuccessTitle: 'Password modificata',
    resetSuccessBody:
      'La tua password è stata aggiornata. Abbiamo disconnesso tutte le sessioni; accedi di nuovo con la tua nuova password.',
    openSkillQuest: 'Apri SkillQuest',
    resetExpiredBody:
      'Richiedi un nuovo ripristino della password e apri il link più recente ricevuto via email.',
    resetTitle: 'Imposta nuova password',
    resetIntro: 'Scegli una nuova password sicura per il tuo account SkillQuest.',
    newPasswordLabel: 'Nuova password',
    confirmPasswordLabel: 'Conferma password',
    showPasswordSuffix: 'mostra',
    hidePasswordSuffix: 'nascondi',
    passwordRequirements:
      'Almeno 12 caratteri con una lettera minuscola, una maiuscola e un numero.',
    passwordManagerHint:
      'Si consiglia di utilizzare una password unica dal proprio password manager.',
    mismatchError: 'Le password non corrispondono.',
    resetGenericError: 'Impossibile modificare la password. Riprova.',
    checkingButton: 'Verifica in corso...',
    updatingButton: 'Aggiornamento in corso...',
    updatePasswordButton: 'Modifica password'
  }
};

// The invite and app-handoff screens were Dutch-only strings baked into the
// components, even though they are reached from emails and share links that go
// out in every language. Kept separate from AuthCopy because these screens are
// about opening the app, not about signing in.
export type HandoffCopy = {
  friendInviteTitle: string;
  familyInviteTitle: string;
  inviteInvalid: string;
  friendInviteIntro: string;
  familyInviteIntro: string;
  openInApp: string;
  manualCodeLabel: string;
  copyCode: string;
  codeCopied: string;
  downloadApp: string;
  // {code} is replaced with the invite code, rendered in bold.
  friendInviteFallback: string;
  familyInviteFallback: string;
  callbackRecoveryTitle: string;
  callbackTitle: string;
  callbackIntro: string;
  callbackFallback: string;
  callbackMissingParams: string;
};

export const handoffCopy: Record<AuthLocale, HandoffCopy> = {
  nl: {
    friendInviteTitle: 'Vriendschapsuitnodiging',
    familyInviteTitle: 'Familie-uitnodiging',
    inviteInvalid: 'Deze uitnodigingslink is ongeldig of onvolledig.',
    friendInviteIntro: 'We proberen SkillQuest te openen met je uitnodiging.',
    familyInviteIntro:
      'We proberen SkillQuest te openen zodat je meteen bij het familiescherm uitkomt.',
    openInApp: 'Open in SkillQuest',
    manualCodeLabel: 'Handmatige code',
    copyCode: 'Kopieer code',
    codeCopied: 'Gekopieerd',
    downloadApp: 'App downloaden',
    friendInviteFallback:
      'Lukt openen niet? Open SkillQuest en gebruik {code} bij Vrienden, Vriend toevoegen.',
    familyInviteFallback:
      'Lukt openen niet? Open SkillQuest en ga naar Profiel, Familie, Ik heb een invite-code. Gebruik daar {code}.',
    callbackRecoveryTitle: 'Reset je wachtwoord in SkillQuest',
    callbackTitle: 'Open SkillQuest om verder te gaan',
    callbackIntro:
      'We proberen SkillQuest automatisch te openen. Bekijk je deze pagina op je computer, open dan dezelfde e-mail op de telefoon waar SkillQuest op staat.',
    callbackFallback:
      'Gebeurt er niets? Gebruik deze link op je iPhone of Android-toestel. Op een computer kan de app meestal niet worden geopend.',
    callbackMissingParams:
      'Deze link mist ook authenticatiegegevens. Vraag een nieuwe e-mail aan vanuit SkillQuest.'
  },
  en: {
    friendInviteTitle: 'Friend invite',
    familyInviteTitle: 'Family invite',
    inviteInvalid: 'This invite link is invalid or incomplete.',
    friendInviteIntro: 'We are trying to open SkillQuest with your invite.',
    familyInviteIntro:
      'We are trying to open SkillQuest so you land straight on the family screen.',
    openInApp: 'Open in SkillQuest',
    manualCodeLabel: 'Manual code',
    copyCode: 'Copy code',
    codeCopied: 'Copied',
    downloadApp: 'Download the app',
    friendInviteFallback:
      'Nothing happening? Open SkillQuest and use {code} under Friends, Add friend.',
    familyInviteFallback:
      'Nothing happening? Open SkillQuest and go to Profile, Family, I have an invite code. Use {code} there.',
    callbackRecoveryTitle: 'Reset your password in SkillQuest',
    callbackTitle: 'Open SkillQuest to continue',
    callbackIntro:
      'We are trying to open SkillQuest automatically. If you are reading this on a computer, open the same email on the phone that has SkillQuest installed.',
    callbackFallback:
      'Nothing happening? Use this link on your iPhone or Android device. A computer usually cannot open the mobile app.',
    callbackMissingParams:
      'This link is also missing its authentication details. Request a new email from SkillQuest.'
  },
  de: {
    friendInviteTitle: 'Freundschaftseinladung',
    familyInviteTitle: 'Familieneinladung',
    inviteInvalid: 'Dieser Einladungslink ist ungültig oder unvollständig.',
    friendInviteIntro: 'Wir versuchen, SkillQuest mit deiner Einladung zu öffnen.',
    familyInviteIntro:
      'Wir versuchen, SkillQuest zu öffnen, damit du direkt beim Familienbereich landest.',
    openInApp: 'In SkillQuest öffnen',
    manualCodeLabel: 'Code manuell eingeben',
    copyCode: 'Code kopieren',
    codeCopied: 'Kopiert',
    downloadApp: 'App herunterladen',
    friendInviteFallback:
      'Passiert nichts? Öffne SkillQuest und nutze {code} unter Freunde, Freund hinzufügen.',
    familyInviteFallback:
      'Passiert nichts? Öffne SkillQuest und gehe zu Profil, Familie, Ich habe einen Einladungscode. Nutze dort {code}.',
    callbackRecoveryTitle: 'Setze dein Passwort in SkillQuest zurück',
    callbackTitle: 'Öffne SkillQuest, um fortzufahren',
    callbackIntro:
      'Wir versuchen, SkillQuest automatisch zu öffnen. Wenn du diese Seite am Computer liest, öffne dieselbe E-Mail auf dem Handy, auf dem SkillQuest installiert ist.',
    callbackFallback:
      'Passiert nichts? Nutze diesen Link auf deinem iPhone oder Android-Gerät. Am Computer lässt sich die App meist nicht öffnen.',
    callbackMissingParams:
      'Diesem Link fehlen außerdem die Authentifizierungsdaten. Fordere eine neue E-Mail aus SkillQuest an.'
  },
  fr: {
    friendInviteTitle: 'Invitation entre amis',
    familyInviteTitle: 'Invitation familiale',
    inviteInvalid: "Ce lien d'invitation est invalide ou incomplet.",
    friendInviteIntro: "Nous essayons d'ouvrir SkillQuest avec ton invitation.",
    familyInviteIntro:
      "Nous essayons d'ouvrir SkillQuest pour que tu arrives directement sur l'écran famille.",
    openInApp: 'Ouvrir dans SkillQuest',
    manualCodeLabel: 'Code manuel',
    copyCode: 'Copier le code',
    codeCopied: 'Copié',
    downloadApp: "Télécharger l'app",
    friendInviteFallback:
      'Rien ne se passe ? Ouvre SkillQuest et saisis {code} dans Amis, Ajouter un ami.',
    familyInviteFallback:
      "Rien ne se passe ? Ouvre SkillQuest et va dans Profil, Famille, J'ai un code d'invitation. Saisis-y {code}.",
    callbackRecoveryTitle: 'Réinitialise ton mot de passe dans SkillQuest',
    callbackTitle: 'Ouvre SkillQuest pour continuer',
    callbackIntro:
      "Nous essayons d'ouvrir SkillQuest automatiquement. Si tu lis cette page sur un ordinateur, ouvre le même e-mail sur le téléphone où SkillQuest est installé.",
    callbackFallback:
      "Rien ne se passe ? Utilise ce lien sur ton iPhone ou ton appareil Android. Un ordinateur ne peut généralement pas ouvrir l'app mobile.",
    callbackMissingParams:
      "Il manque aussi les données d'authentification dans ce lien. Demande un nouvel e-mail depuis SkillQuest."
  },
  es: {
    friendInviteTitle: 'Invitación de amistad',
    familyInviteTitle: 'Invitación familiar',
    inviteInvalid: 'Este enlace de invitación no es válido o está incompleto.',
    friendInviteIntro: 'Estamos intentando abrir SkillQuest con tu invitación.',
    familyInviteIntro:
      'Estamos intentando abrir SkillQuest para que llegues directamente a la pantalla de familia.',
    openInApp: 'Abrir en SkillQuest',
    manualCodeLabel: 'Código manual',
    copyCode: 'Copiar código',
    codeCopied: 'Copiado',
    downloadApp: 'Descargar la app',
    friendInviteFallback:
      '¿No pasa nada? Abre SkillQuest y usa {code} en Amigos, Añadir amigo.',
    familyInviteFallback:
      '¿No pasa nada? Abre SkillQuest y ve a Perfil, Familia, Tengo un código de invitación. Usa allí {code}.',
    callbackRecoveryTitle: 'Restablece tu contraseña en SkillQuest',
    callbackTitle: 'Abre SkillQuest para continuar',
    callbackIntro:
      'Estamos intentando abrir SkillQuest automáticamente. Si estás leyendo esto en un ordenador, abre el mismo correo en el teléfono que tiene SkillQuest instalado.',
    callbackFallback:
      '¿No pasa nada? Usa este enlace en tu iPhone o dispositivo Android. Un ordenador normalmente no puede abrir la app móvil.',
    callbackMissingParams:
      'A este enlace también le faltan los datos de autenticación. Solicita un correo nuevo desde SkillQuest.'
  },
  it: {
    friendInviteTitle: 'Invito di amicizia',
    familyInviteTitle: 'Invito famiglia',
    inviteInvalid: 'Questo link di invito non è valido o è incompleto.',
    friendInviteIntro: 'Stiamo provando ad aprire SkillQuest con il tuo invito.',
    familyInviteIntro:
      'Stiamo provando ad aprire SkillQuest per portarti subito sulla schermata famiglia.',
    openInApp: 'Apri in SkillQuest',
    manualCodeLabel: 'Codice manuale',
    copyCode: 'Copia codice',
    codeCopied: 'Copiato',
    downloadApp: "Scarica l'app",
    friendInviteFallback:
      'Non succede nulla? Apri SkillQuest e usa {code} in Amici, Aggiungi amico.',
    familyInviteFallback:
      'Non succede nulla? Apri SkillQuest e vai su Profilo, Famiglia, Ho un codice invito. Usa lì {code}.',
    callbackRecoveryTitle: 'Reimposta la password in SkillQuest',
    callbackTitle: 'Apri SkillQuest per continuare',
    callbackIntro:
      "Stiamo provando ad aprire SkillQuest automaticamente. Se stai leggendo questa pagina sul computer, apri la stessa email sul telefono su cui è installato SkillQuest.",
    callbackFallback:
      "Non succede nulla? Usa questo link sul tuo iPhone o dispositivo Android. Da computer di solito non è possibile aprire l'app.",
    callbackMissingParams:
      'A questo link mancano anche i dati di autenticazione. Richiedi una nuova email da SkillQuest.'
  }
};

export function getHandoffCopy(locale: AuthLocale) {
  return handoffCopy[locale];
}

function isAuthLocale(value: string): value is AuthLocale {
  return authLocales.includes(value as AuthLocale);
}

export function resolveAuthLocale(candidate?: string | null): AuthLocale {
  if (candidate == null || candidate.trim().length === 0) {
    return defaultAuthLocale;
  }

  const candidates = candidate
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase().replace('_', '-'))
    .filter((part): part is string => part != null && part.length > 0);

  for (const value of candidates) {
    const baseLocale = value.split('-')[0] ?? value;

    if (isAuthLocale(value)) {
      return value;
    }

    if (isAuthLocale(baseLocale)) {
      return baseLocale;
    }
  }

  return defaultAuthLocale;
}

export function getAuthCopy(locale: AuthLocale) {
  return authCopy[locale];
}

export function withAuthLocale(path: string, locale: AuthLocale) {
  const url = new URL(path, 'https://www.skill-quest.app');
  url.searchParams.set('locale', locale);
  return `${url.pathname}${url.search}`;
}

export function localizedSitePath(locale: AuthLocale, path = '') {
  const normalizedPath = path.length === 0 || path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}
