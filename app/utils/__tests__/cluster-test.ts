/**
 * Comprehensive test suite for app/utils/cluster.ts
 * 
 * Test Strategy:
 * - Cluster enum value validation
 * - Name and slug consistency
 * - URL generation for different clusters
 */

import { describe, expect, test } from 'vitest';
import { Cluster, clusterName, clusterSlug, clusterUrl } from '../cluster';

describe('Cluster enum', () => {
    test('has MainnetBeta value', () => {
        expect(Cluster.MainnetBeta).toBeDefined();
    });

    test('has Testnet value', () => {
        expect(Cluster.Testnet).toBeDefined();
    });

    test('has Devnet value', () => {
        expect(Cluster.Devnet).toBeDefined();
    });

    test('has Custom value', () => {
        expect(Cluster.Custom).toBeDefined();
    });
});

describe('clusterName', () => {
    test('returns correct name for MainnetBeta', () => {
        const name = clusterName(Cluster.MainnetBeta);
        expect(name).toBe('Mainnet Beta');
    });

    test('returns correct name for Testnet', () => {
        const name = clusterName(Cluster.Testnet);
        expect(name).toBe('Testnet');
    });

    test('returns correct name for Devnet', () => {
        const name = clusterName(Cluster.Devnet);
        expect(name).toBe('Devnet');
    });

    test('returns correct name for Custom', () => {
        const name = clusterName(Cluster.Custom);
        expect(name).toBe('Custom');
    });
});

describe('clusterSlug', () => {
    test('returns "mainnet-beta" for MainnetBeta', () => {
        const slug = clusterSlug(Cluster.MainnetBeta);
        expect(slug).toBe('mainnet-beta');
    });

    test('returns "testnet" for Testnet', () => {
        const slug = clusterSlug(Cluster.Testnet);
        expect(slug).toBe('testnet');
    });

    test('returns "devnet" for Devnet', () => {
        const slug = clusterSlug(Cluster.Devnet);
        expect(slug).toBe('devnet');
    });

    test('returns "custom" for Custom', () => {
        const slug = clusterSlug(Cluster.Custom);
        expect(slug).toBe('custom');
    });

    test('all slugs are lowercase', () => {
        const clusters = [Cluster.MainnetBeta, Cluster.Testnet, Cluster.Devnet, Cluster.Custom];
        clusters.forEach(cluster => {
            const slug = clusterSlug(cluster);
            expect(slug).toBe(slug.toLowerCase());
        });
    });
});

describe('clusterUrl', () => {
    test('returns URL for MainnetBeta', () => {
        const url = clusterUrl(Cluster.MainnetBeta, '');
        expect(url).toBeDefined();
        expect(typeof url).toBe('string');
    });

    test('returns URL for Testnet', () => {
        const url = clusterUrl(Cluster.Testnet, '');
        expect(url).toBeDefined();
        expect(typeof url).toBe('string');
    });

    test('returns URL for Devnet', () => {
        const url = clusterUrl(Cluster.Devnet, '');
        expect(url).toBeDefined();
        expect(typeof url).toBe('string');
    });

    test('returns custom URL for Custom cluster', () => {
        const customUrl = 'https://custom-rpc.example.com';
        const url = clusterUrl(Cluster.Custom, customUrl);
        expect(url).toBe(customUrl);
    });
});