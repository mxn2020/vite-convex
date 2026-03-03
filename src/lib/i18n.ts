const translations: Record<string, Record<string, string>> = {
    en: {
        'app.title': 'Vite Convex App',
        'app.description': 'A modern web application',
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong',
        'common.retry': 'Try Again',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.delete': 'Delete',
        'common.edit': 'Edit',
        'common.create': 'Create',
        'common.search': 'Search',
        'common.noResults': 'No results found',
        'auth.signIn': 'Sign In',
        'auth.signOut': 'Sign Out',
        'auth.signUp': 'Sign Up',
    },
    de: {
        'app.title': 'Vite Convex App',
        'app.description': 'Eine moderne Webanwendung',
        'common.loading': 'Wird geladen...',
        'common.error': 'Etwas ist schiefgelaufen',
        'common.retry': 'Erneut versuchen',
        'common.save': 'Speichern',
        'common.cancel': 'Abbrechen',
        'common.delete': 'Löschen',
        'common.edit': 'Bearbeiten',
        'common.create': 'Erstellen',
        'common.search': 'Suchen',
        'common.noResults': 'Keine Ergebnisse gefunden',
        'auth.signIn': 'Anmelden',
        'auth.signOut': 'Abmelden',
        'auth.signUp': 'Registrieren',
    },
};

let currentLocale = 'en';

export function setLocale(locale: string): void {
    if (translations[locale]) {
        currentLocale = locale;
    }
}

export function getLocale(): string {
    return currentLocale;
}

export function t(key: string): string {
    return translations[currentLocale]?.[key] ?? translations['en']?.[key] ?? key;
}

export function getSupportedLocales(): string[] {
    return Object.keys(translations);
}
