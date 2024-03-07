import { configureStore, type PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import generator, { type GeneratorState } from './store/generator';
import sequencer, { type SequencerState } from './store/sequencer';
import transport, { setPlaying, setStep, type TransportState } from './store/transport';
import synth, { type SynthState } from './store/synth';

export interface State {
  transport: TransportState;
  sequencer: SequencerState;
  generator: GeneratorState;
  synth: SynthState;
}

const store = configureStore<State>({
  reducer: combineReducers({
    transport,
    sequencer,
    generator,
    synth,
  }),
  middleware: [
    (store) => (next) => (action: PayloadAction) => {
      next(action);
      if (action.type !== setPlaying.type && action.type !== setStep.type) {
        const newState = store.getState();
        localStorage.setItem('state', JSON.stringify(newState));
      }
    },
  ],
});

export { store };
