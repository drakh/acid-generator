import { SCALE } from './audio-engine/scales.ts';

const BASE_NOTE = 48;
const DEFAULT_TEMPO = 120;
const DEFAUL_SCALE = SCALE.PHRYGIAN;
const DEFAUL_SEQ_LENGTH = 16;
const BPM = {
  MIN: 30,
  MAX: 240,
};

export { BASE_NOTE, DEFAUL_SCALE, DEFAULT_TEMPO, BPM, DEFAUL_SEQ_LENGTH };
