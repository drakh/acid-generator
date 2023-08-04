import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import transport, { type TransportState } from './store/transport';
import sequencer, { type SequencerState } from './store/sequencer';

export interface State {
  transport: TransportState;
  sequencer: SequencerState;
}

const combinedReducer = combineReducers({
  transport,
  sequencer,
});

const store = configureStore<State>({
  reducer: combinedReducer,
});

export { store };
