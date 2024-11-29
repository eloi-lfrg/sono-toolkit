/*
 * Copyright (c) 2024 Eloi Lafargue.
 * MIT License
 */

/**
 * Computes the compressor attack in ms
 *
 * @returns The corresponding compressor attack in ms
 *
 * @param hpf - The high pass filter frequency in Hz
 */
export function computeCompressorAttack(hpf: number): number {
    return Math.round((1 / (3 * Math.PI * hpf)) * 10000);
}
