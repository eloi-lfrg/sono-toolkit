/*
 * Copyright (c) 2024 Eloi Lafargue.
 * MIT License
 */

import {computeCompressorAttack} from "../src";

test('compute compressor attack for low frequency', () => {
    const attack = computeCompressorAttack(90)
    expect(attack).toBe(12);
});

test('compute compressor attack for medium frequency', () => {
    const attack = computeCompressorAttack(227)
    expect(attack).toBe(5);
});

test('compute compressor attack for high frequency', () => {
    const attack = computeCompressorAttack(1557)
    expect(attack).toBe(1);
});
