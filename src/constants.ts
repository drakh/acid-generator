import { SCALE, SCALES } from './audio-engine/scales.ts';

const BASE_TEMPO = 120;
const BASE_NOTE = 48;
const DEFAUL_SCALE = SCALES[SCALE.PHRYGIAN];
const BPM = {
  MIN: 30,
  MAX: 240,
};

export { BASE_NOTE, DEFAUL_SCALE, BASE_TEMPO, BPM };
