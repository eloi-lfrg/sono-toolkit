/*
 * Copyright (c) 2024 Eloi Lafargue.
 * MIT License
 */

import {LimiterThresholdParams, LimiterTypeEnum, ChargeTypeEnum} from '../types/limiter-threshold'

/**
 * Computes the limiter threshold to apply according to the given parameters
 *
 * @returns The corresponding limiter threshold
 *
 * @param params - The params according to the sonorisation configuration
 */
export function computeLimiterThreshold(params: LimiterThresholdParams): number {
    const {limiterType} = params

    if (limiterType === LimiterTypeEnum.DBU || limiterType === LimiterTypeEnum.TRACKS_DS24 ) {
        return computeDBULimiters(params)
    } else {
        return computeDCXLimiters(params)
    }
}

/**
 * Computes the limiter threshold to apply for DBU and T.RACKS DS2/4 processors
 *
 * @returns The corresponding limiter threshold
 *
 * @param params - The params according to the sonorisation configuration
 */
function computeDBULimiters(params: LimiterThresholdParams): number {
    const {limiterType, chargeType, hpPower, impedance, ampPower, ampGain} = params

    const reductionFactor = getReductionFactor(chargeType);
    const computedHpPower = 20 * log10(Math.sqrt(hpPower / reductionFactor * impedance) / 0.775) - ampGain;
    const computedAmpPower = 20 * log10(Math.sqrt(ampPower / 2 * impedance) / 0.775) - ampGain;
    const dBuPower = computedAmpPower > computedHpPower ? computedHpPower : computedAmpPower;

    if (limiterType === LimiterTypeEnum.DBU)
        return dBuPower > 0 ? roundDown(dBuPower, 1) : roundUp(dBuPower, 1);
    else
        return dBuPower - 2.5 > 0 ? roundDown(dBuPower - 2.5, 0) : roundUp(dBuPower - 2.5, 0);
}

/**
 * Computes the limiter threshold to apply for DCX2496 (sub or top) processor
 *
 * @returns The corresponding limiter threshold
 *
 * @param params - The params according to the sonorisation configuration
 */
function computeDCXLimiters(params: LimiterThresholdParams): number {
    const {limiterType, chargeType, hpPower, impedance, ampPower, ampGain} = params

    const reductionFactor = getReductionFactor(chargeType);
    let computedHpPower = (20 * log10(Math.sqrt(hpPower / reductionFactor * impedance) / 0.775) - ampGain) - 22;
    let computedAmpPower = (20 * log10(Math.sqrt(ampPower / 2 * impedance) / 0.775) - ampGain) - 22;

    if (limiterType === LimiterTypeEnum.DCX2496_SUB) {
        computedAmpPower += 1.5;
        computedHpPower += 1.5;
    } else {
        computedAmpPower += 3.75;
        computedHpPower += 3.75;
    }
    const rawLimiter = computedAmpPower > computedHpPower ? computedHpPower : computedAmpPower;
    return rawLimiter > 0 ? roundDown(rawLimiter, 1) : roundUp(rawLimiter, 1);
}

/**
 * Returns the reduction factor to apply if the charge is open or close
 *
 * @returns The corresponding reduction factor 1.5625 if open, 2.34375 if close
 *
 * @param chargeType - The charge type open or close
 */
function getReductionFactor(chargeType: ChargeTypeEnum): 1.5625 | 2.34375 {
    return chargeType === ChargeTypeEnum.OPEN ? 1.5625 : 2.34375
}

/**
 * Log10 computation shortcut
 *
 * @returns The result of Log10(x)
 *
 * @param x - The input number
 */
function log10(x: number): number {
    return Math.log(x) / Math.LN10;
}

/**
 * Rounds down a number at pow factor
 *
 * @returns The result of the down rounded number at pow factor
 *
 * @param n - The input number
 * @param nd - The pow factor
 */
function roundDown(n: number, nd: number): number {
    const sign_n = (n < 0) ? -1 : 1;
    const abs_n = Math.abs(n);
    const factor = Math.pow(10, (nd < 0 ? Math.ceil(nd) : Math.floor(nd)));
    return sign_n * Math.floor(abs_n * factor) / factor;
}

/**
 * Rounds up a number at pow factor
 *
 * @returns The result of the up rounded number at pow factor
 *
 * @param n - The input number
 * @param nd - The pow factor
 */
function roundUp(n: number, nd: number): number {
    const sign_n = (n < 0) ? -1 : 1;
    const abs_n = Math.abs(n);
    const factor = Math.pow(10, (nd < 0 ? Math.ceil(nd) : Math.floor(nd)));
    return sign_n * Math.ceil(abs_n * factor) / factor;
}
