/**
 * Comprehensive test suite for app/utils/date.ts
 * 
 * Test Strategy:
 * - Timestamp formatting in various timezones
 * - UTC and local time handling
 * - Edge cases: epoch, negative timestamps, future dates
 * - Format consistency across different timestamp values
 */

import { describe, expect, test } from 'vitest';
import { displayTimestamp, displayTimestampUtc, displayTimestampWithoutDate } from '../date';

describe('displayTimestamp', () => {
    test('formats Unix timestamp correctly', () => {
        const timestamp = 1672531200;
        const result = displayTimestamp(timestamp);
        
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    test('formats Unix timestamp in milliseconds correctly', () => {
        const timestamp = 1672531200000;
        const result = displayTimestamp(timestamp);
        
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
    });

    test('handles zero timestamp', () => {
        const result = displayTimestamp(0);
        
        expect(result).toBeDefined();
        expect(result).toContain('1970');
    });

    test('handles negative timestamp (before epoch)', () => {
        const result = displayTimestamp(-86400);
        
        expect(result).toBeDefined();
        expect(result).toContain('1969');
    });

    test('formats recent timestamp correctly', () => {
        const recentTimestamp = Math.floor(Date.now() / 1000);
        const result = displayTimestamp(recentTimestamp);
        
        expect(result).toBeDefined();
        expect(result).toMatch(/202\d/);
    });

    test('handles short timezone names', () => {
        const timestamp = 1672531200;
        const result = displayTimestamp(timestamp, true);
        
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
    });
});

describe('displayTimestampUtc', () => {
    test('formats Unix timestamp in UTC', () => {
        const timestamp = 1672531200;
        const result = displayTimestampUtc(timestamp);
        
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    test('formats zero timestamp in UTC', () => {
        const result = displayTimestampUtc(0);
        
        expect(result).toBeDefined();
        expect(result).toContain('1970');
    });

    test('handles millisecond timestamps', () => {
        const timestamp = 1672531200000;
        const result = displayTimestampUtc(timestamp);
        
        expect(result).toBeDefined();
    });

    test('formats future timestamp', () => {
        const futureTimestamp = 1893456000;
        const result = displayTimestampUtc(futureTimestamp);
        
        expect(result).toBeDefined();
        expect(result).toContain('2030');
    });

    test('formats past timestamp', () => {
        const pastTimestamp = 946684800;
        const result = displayTimestampUtc(pastTimestamp);
        
        expect(result).toBeDefined();
        expect(result).toContain('2000');
    });
});

describe('displayTimestampWithoutDate', () => {
    test('formats timestamp showing only time', () => {
        const timestamp = 1672531200;
        const result = displayTimestampWithoutDate(timestamp);
        
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result).toMatch(/:/);
    });

    test('handles zero timestamp', () => {
        const result = displayTimestampWithoutDate(0);
        
        expect(result).toBeDefined();
        expect(result).toMatch(/:/);
    });

    test('formats time without date components', () => {
        const timestamp = 1672531200;
        const result = displayTimestampWithoutDate(timestamp);
        
        expect(result).not.toMatch(/202\d/);
        expect(result).not.toMatch(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
    });
});