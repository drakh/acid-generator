import { type SCALE, SCALES } from './audio-engine/scales';

const arrayRand = (arr: number[], l: number): number[] => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, l);
};

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  if (value <= inMin) return outMin;
  if (value >= inMax) return outMax;
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

type NullOrNumber<T> = T extends number ? number : null;

const getNoteInScale = <T extends number | null>(
  note: T,
  scaleName: SCALE,
  root = 0,
  octave = 0,
): NullOrNumber<T> => {
  if (note === null) {
    return null as NullOrNumber<T>;
  }
  return (SCALES[scaleName][note] + root + 12 * octave) as NullOrNumber<T>;
};

export { arrayRand, mapRange, getNoteInScale };
