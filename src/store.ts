import { configureStore, type PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import generator from './store/generator';
import sequencer from './store/sequencer';
import transport, { setPlaying, setStep } from './store/transport';
import synth from './store/synth';
import { type State } from './types';

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
        console.info({ newState });
        localStorage.setItem('state', JSON.stringify(newState));
      }
    },
  ],
});

export { store };
