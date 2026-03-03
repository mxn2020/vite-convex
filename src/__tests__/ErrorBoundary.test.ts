import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from '../components/ErrorBoundary';

describe('ErrorBoundary', () => {
    it('should be defined', () => {
        expect(ErrorBoundary).toBeDefined();
    });

    it('should be a class component', () => {
        expect(ErrorBoundary.prototype).toBeDefined();
        expect(typeof ErrorBoundary.prototype.render).toBe('function');
    });
});
