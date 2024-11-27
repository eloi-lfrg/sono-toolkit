/*
 * Copyright (c) 2024 Eloi Lafargue.
 * MIT License
 */

/**
 * Computes the compressor release in ms
 *
 * @returns The corresponding compressor release in ms
 *
 * @param hpf - The high pass filter frequency in Hz
 */
export function computeCompressorRelease(hpf: number): number {
    return Math.round((1 / (2 * Math.PI * hpf) * 20) * 10000)
}
