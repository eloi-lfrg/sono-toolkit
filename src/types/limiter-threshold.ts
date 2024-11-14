/*
 * Copyright (c) 2024 Eloi Lafargue.
 * MIT License
 */

/**
 * Enum for limiter types
 */
export enum LimiterTypeEnum {
    /**
     * General dBu limiters
     */
    DBU = "dBu",
    /**
     * T.Racks-DS2/4 limiter
     */
    TRACKS_DS24 = "T.RACKS-DS2/4",
    /**
     * Behringer DCX 2496 limiter for subs only
     */
    DCX2496_SUB = "DCX-2496_Sub",
    /**
     * Behringer DCX 2496 for tops only
     */
    DCX2496_TOP = "DCX-2496_Top"
}

/**
 * Enum for limiter types
 */
export enum ChargeTypeEnum {
    /**
     * Open charge (speaker visible)
     */
    OPEN = "Open",
    /**
     * Close charge (speaker invisible)
     */
    CLOSE = "Close"
}

/**
 * Limiter threshold computation parameters
 */
export interface LimiterThresholdParams {
    /**
     * Limiter type enumeration
     */
    limiterType: LimiterTypeEnum;
    /**
     * Charge type enumeration
     */
    chargeType: ChargeTypeEnum;
    /**
     * Impedance in Ohms (generally 2, 4, 8)
     */
    impedance: number;
    /**
     * Speaker power in W AES
     */
    hpPower: number;
    /**
     * Amplifier power in W RMS
     */
    ampPower: number;
    /**
     * Amplifier gain in W dB
     */
    ampGain: number;
}
