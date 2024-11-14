/*
 * Copyright (c) 2024 Eloi Lafargue.
 * MIT License
 */

import {computeLimiterThreshold, LimiterTypeEnum, ChargeTypeEnum} from "../src";

test('compute DCX2496 limiter for subs in open charge', () => {
    const limiter = computeLimiterThreshold({
        limiterType: LimiterTypeEnum.DCX2496_SUB,
        chargeType: ChargeTypeEnum.OPEN,
        hpPower: 1600,
        impedance: 4,
        ampPower: 2000,
        ampGain: 32
    });
    expect(limiter).toBe(-14.3);
});

test('compute DCX2496 limiter for subs in close charge', () => {
    const limiter = computeLimiterThreshold({
        limiterType: LimiterTypeEnum.DCX2496_SUB,
        chargeType: ChargeTypeEnum.CLOSE,
        hpPower: 1600,
        impedance: 4,
        ampPower: 2000,
        ampGain: 32
    });
    expect(limiter).toBe(-16);
});

test('compute DCX2496 limiter for tops in open charge', () => {
    const limiter = computeLimiterThreshold({
        limiterType: LimiterTypeEnum.DCX2496_TOP,
        chargeType: ChargeTypeEnum.OPEN,
        hpPower: 1600,
        impedance: 4,
        ampPower: 2000,
        ampGain: 32
    });
    expect(limiter).toBe(-12.1);
});

test('compute DCX2496 limiter for tops in close charge', () => {
    const limiter = computeLimiterThreshold({
        limiterType: LimiterTypeEnum.DCX2496_TOP,
        chargeType: ChargeTypeEnum.CLOSE,
        hpPower: 1600,
        impedance: 4,
        ampPower: 2000,
        ampGain: 32
    });
    expect(limiter).toBe(-13.7);
});

test('compute dBu limiter in open charge', () => {
    const limiter = computeLimiterThreshold({
        limiterType: LimiterTypeEnum.DBU,
        chargeType: ChargeTypeEnum.OPEN,
        hpPower: 1600,
        impedance: 4,
        ampPower: 2000,
        ampGain: 32
    });
    expect(limiter).toBe(6.2);
});

test('compute dBu limiter in close charge', () => {
    const limiter = computeLimiterThreshold({
        limiterType: LimiterTypeEnum.DBU,
        chargeType: ChargeTypeEnum.CLOSE,
        hpPower: 1600,
        impedance: 4,
        ampPower: 2000,
        ampGain: 32
    });
    expect(limiter).toBe(4.5);
});

test('compute T.Racks DS2/4 limiter in open charge', () => {
    const limiter = computeLimiterThreshold({
        limiterType: LimiterTypeEnum.TRACKS_DS24,
        chargeType: ChargeTypeEnum.OPEN,
        hpPower: 1600,
        impedance: 4,
        ampPower: 2000,
        ampGain: 32
    });
    expect(limiter).toBe(3);
});

test('compute T.Racks DS2/4 limiter in open charge', () => {
    const limiter = computeLimiterThreshold({
        limiterType: LimiterTypeEnum.TRACKS_DS24,
        chargeType: ChargeTypeEnum.CLOSE,
        hpPower: 1600,
        impedance: 4,
        ampPower: 2000,
        ampGain: 32
    });
    expect(limiter).toBe(2);
});
