import { type GeneratorState } from './generator';
import { type SequencerState } from './sequencer';
import { type TransportState } from './transport';
import { type SynthState } from './synth';

// type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
//   ? Acc[number]
//   : Enumerate<N, [...Acc, Acc['length']]>;
//
// type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
//
// type T = IntRange<20, 300>;

export interface State {
  transport: TransportState;
  sequencer: SequencerState;
  generator: GeneratorState;
  synth: SynthState;
}
