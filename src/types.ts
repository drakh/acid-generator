import { type TransportState } from './store/transport';
import { type SequencerState } from './store/sequencer';

export interface State {
  transport: TransportState;
  sequencer: SequencerState;
}
