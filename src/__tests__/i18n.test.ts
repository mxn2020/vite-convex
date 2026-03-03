import { describe, it, expect } from 'vitest';
import { t, setLocale, getLocale, getSupportedLocales } from '../lib/i18n';

describe('i18n', () => {
    it('should return English translation by default', () => {
        expect(t('common.loading')).toBe('Loading...');
    });

    it('should switch to German', () => {
        setLocale('de');
        expect(t('common.loading')).toBe('Wird geladen...');
        setLocale('en'); // reset
    });

    it('should return key if translation missing', () => {
        expect(t('nonexistent.key')).toBe('nonexistent.key');
    });

    it('should report supported locales', () => {
        expect(getSupportedLocales()).toContain('en');
        expect(getSupportedLocales()).toContain('de');
    });

    it('should return current locale', () => {
        expect(getLocale()).toBe('en');
    });
});
