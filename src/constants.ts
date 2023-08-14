import { SCALE } from './audio-engine/scales.ts';

type Range = {
  MIN: number;
  MAX: number;
};

const BASE_NOTE = 48;

const DEFAULTS = {
  BPM: 120,
  SCALE: SCALE.PHRYGIAN,
  SEQ_LENGTH: 16,
  DELAY_LEVEL: -18,
  CUTOFF: 220,
  RESONANCE: 3,
};

const CUTOFF: Range = {
  MIN: 110,
  MAX: 880,
};

const RES: Range = {
  MIN: 0,
  MAX: 9,
};

const BPM: Range = {
  MIN: 30,
  MAX: 240,
};

const DELAY_SEND: Range = {
  MIN: -80,
  MAX: -1,
};

export { DEFAULTS, BASE_NOTE, BPM, CUTOFF, RES, DELAY_SEND };
