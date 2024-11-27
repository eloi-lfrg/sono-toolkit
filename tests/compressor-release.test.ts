/*
 * Copyright (c) 2024 Eloi Lafargue.
 * MIT License
 */

import {computeCompressorRelease} from "../src";

test('compute compressor release for low frequency', () => {
    const attack = computeCompressorRelease(90)
    expect(attack).toBe(354);
});

test('compute compressor release for medium frequency', () => {
    const attack = computeCompressorRelease(227)
    expect(attack).toBe(140);
});

test('compute compressor release for high frequency', () => {
    const attack = computeCompressorRelease(1557)
    expect(attack).toBe(20);
});
