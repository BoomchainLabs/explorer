/**
 * Comprehensive test suite for app/utils/url.ts
 * 
 * Test Strategy:
 * - URL construction and parameter handling
 * - Cluster-specific path generation
 * - Query parameter extraction and parsing
 */

import { describe, expect, test } from 'vitest';
import { pickClusterParams } from '../url';

describe('pickClusterParams', () => {
    test('returns path without cluster params when none exist', () => {
        const result = pickClusterParams('/address/test');
        expect(result).toBe('/address/test');
    });

    test('preserves cluster param from current search params', () => {
        const currentSearchParams = new URLSearchParams('cluster=devnet');
        const result = pickClusterParams('/address/test', currentSearchParams);
        expect(result).toBe('/address/test?cluster=devnet');
    });

    test('preserves customUrl param from current search params', () => {
        const currentSearchParams = new URLSearchParams('customUrl=https://example.com');
        const result = pickClusterParams('/address/test', currentSearchParams);
        expect(result).toBe('/address/test?customUrl=https%3A%2F%2Fexample.com');
    });

    test('preserves multiple cluster params', () => {
        const currentSearchParams = new URLSearchParams('cluster=devnet&customUrl=https://example.com');
        const result = pickClusterParams('/address/test', currentSearchParams);
        expect(result).toContain('cluster=devnet');
        expect(result).toContain('customUrl=');
    });

    test('ignores non-cluster params', () => {
        const currentSearchParams = new URLSearchParams('foo=bar&cluster=devnet&baz=qux');
        const result = pickClusterParams('/address/test', currentSearchParams);
        expect(result).toBe('/address/test?cluster=devnet');
    });

    test('handles empty current search params', () => {
        const currentSearchParams = new URLSearchParams('');
        const result = pickClusterParams('/address/test', currentSearchParams);
        expect(result).toBe('/address/test');
    });

    test('merges additional params with cluster params', () => {
        const currentSearchParams = new URLSearchParams('cluster=testnet');
        const additionalParams = new URLSearchParams('foo=bar');
        const result = pickClusterParams('/address/test', currentSearchParams, additionalParams);
        expect(result).toContain('cluster=testnet');
        expect(result).toContain('foo=bar');
    });

    test('handles root path', () => {
        const currentSearchParams = new URLSearchParams('cluster=devnet');
        const result = pickClusterParams('/', currentSearchParams);
        expect(result).toBe('/?cluster=devnet');
    });
});