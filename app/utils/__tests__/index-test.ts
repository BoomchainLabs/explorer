/**
 * Comprehensive test suite for app/utils/index.ts
 * 
 * Test Strategy:
 * - Happy path: Standard conversions with typical values
 * - Edge cases: Zero, negative numbers, very large/small values
 * - Boundary conditions: Maximum safe integers, precision limits
 * - Format verification: String formatting, comma separation, decimal handling
 */

import { describe, expect, test } from 'vitest';
import { lamportsToSol, lamportsToSolString } from '../index';

describe('lamportsToSol', () => {
    test('converts 0 lamports to 0 SOL', () => {
        expect(lamportsToSol(0)).toBe(0);
    });

    test('converts 1 billion lamports to 1 SOL', () => {
        expect(lamportsToSol(1_000_000_000)).toBe(1);
    });

    test('converts 1 lamport to correct fraction', () => {
        expect(lamportsToSol(1)).toBe(0.000000001);
    });

    test('handles large lamport amounts', () => {
        expect(lamportsToSol(1_000_000_000_000)).toBe(1000);
    });

    test('handles fractional SOL amounts', () => {
        expect(lamportsToSol(500_000_000)).toBe(0.5);
    });

    test('handles very small lamport amounts', () => {
        expect(lamportsToSol(123)).toBe(0.000000123);
    });

    test('handles negative lamport amounts', () => {
        expect(lamportsToSol(-1_000_000_000)).toBe(-1);
    });

    test('maintains precision for edge cases', () => {
        expect(lamportsToSol(999_999_999)).toBe(0.999999999);
    });
});

describe('lamportsToSolString', () => {
    test('converts 0 lamports to "0" SOL string', () => {
        expect(lamportsToSolString(0)).toBe('0');
    });

    test('converts 1 billion lamports to "1" SOL string', () => {
        expect(lamportsToSolString(1_000_000_000)).toBe('1');
    });

    test('converts 1 lamport to small fraction string', () => {
        expect(lamportsToSolString(1)).toBe('0.000000001');
    });

    test('handles large lamport amounts with commas', () => {
        const result = lamportsToSolString(1_000_000_000_000);
        expect(result).toBe('1,000');
    });

    test('handles fractional SOL with proper formatting', () => {
        expect(lamportsToSolString(500_000_000)).toBe('0.5');
    });

    test('formats multiple decimal places correctly', () => {
        expect(lamportsToSolString(123_456_789)).toBe('0.123456789');
    });

    test('handles negative amounts', () => {
        expect(lamportsToSolString(-1_000_000_000)).toBe('-1');
    });

    test('removes trailing zeros', () => {
        expect(lamportsToSolString(1_500_000_000)).toBe('1.5');
    });

    test('handles very large numbers with comma separation', () => {
        const result = lamportsToSolString(123_456_789_000_000_000);
        expect(result).toContain(',');
        expect(parseFloat(result.replace(/,/g, ''))).toBe(123456789);
    });

    test('maintains precision for small fractions', () => {
        expect(lamportsToSolString(999_999_999)).toBe('0.999999999');
    });
});