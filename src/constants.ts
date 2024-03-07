import { SCALE } from './audio-engine/scales.ts';
import { type InternalSynth } from './types.ts';

type Range = {
  MIN: number;
  MAX: number;
};

export const BASE_NOTE = 48;

export const DEFAULTS = {
  BPM: 120,
  SCALE: SCALE.PHRYGIAN,
  SEQ_LENGTH: 16,
  DELAY_LEVEL: -18,
  CUTOFF: 220,
  RESONANCE: 3,
};

export const CUTOFF: Range = {
  MIN: 110,
  MAX: 880,
};

export const RES: Range = {
  MIN: 0,
  MAX: 9,
};

export const BPM: Range = {
  MIN: 30,
  MAX: 240,
};

export const DELAY_SEND: Range = {
  MIN: -80,
  MAX: -1,
};

export const internalSynth: InternalSynth = 'internal';
