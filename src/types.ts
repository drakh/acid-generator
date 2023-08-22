import { type SequenceStep } from './audio-engine/generator.ts';
import { type SCALE } from './audio-engine/scales.ts';

export type Pattern = {
  pattern: SequenceStep[];
  name: string;
  scale: SCALE;
};
