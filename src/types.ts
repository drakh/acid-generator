import { type SequenceStep } from './audio-engine/generator.ts';
import { type SCALE } from './audio-engine/scales.ts';

// type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
//   ? Acc[number]
//   : Enumerate<N, [...Acc, Acc['length']]>;
//
// type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
//
// type T = IntRange<20, 300>;

export type Pattern = {
  pattern: SequenceStep[];
  name: string;
  scale: SCALE;
};

export type InternalSynth = 'internal';

export type SequencerOutput = {
  port: MIDIOutput;
  selected: boolean;
  channel: number;
};

export enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
}
