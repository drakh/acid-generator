import { getPattern } from 'euclidean-rhythms';

export interface EuclideanParams {
  pulses: number;
  steps: number;
  rotate: number;
}

const mod = (n: number, m: number): number => ((n % m) + m) % m;

/**
 * Indexes of the sequence steps that carry a note: Euclidean rhythm E(pulses, steps),
 * rotated by `rotate` and repeated until `patternLength` is filled.
 */
const getEuclideanSteps = (
  { pulses, steps, rotate }: EuclideanParams,
  patternLength: number,
): number[] => {
  const ringSize = Math.max(1, Math.round(steps));
  const ringPulses = Math.min(ringSize, Math.max(0, Math.round(pulses)));
  const ring = getPattern(ringPulses, ringSize);
  return Array(patternLength)
    .fill(0)
    .map((_v, i) => i)
    .filter((i) => ring[mod(i - Math.round(rotate), ringSize)] === 1);
};

export { getEuclideanSteps };
