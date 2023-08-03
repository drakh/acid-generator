import { createSlice, configureStore, type PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { generate, SequenceStep } from './audio-engine/generator';

export interface State {
  sequencer: {
    currentStep: number;
    maxSteps: number;
  };
  pattern: SequenceStep[];
}

const sequencerSlice = createSlice({
  name: 'steps',
  initialState: { currentStep: -1, maxSteps: 16 },
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentStep: action.payload,
      };
    },
  },
});

const {
  actions: { setStep },
  reducer: sequencerReducer,
} = sequencerSlice;

const patternSlice = createSlice({
  name: 'pattern',
  initialState: generate(16),
  reducers: {
    setPattern: (_state, action: PayloadAction<SequenceStep[]>) => {
      return action.payload;
    },
  },
});

const {
  actions: { setPattern },
  reducer: patternReducer,
} = patternSlice;

const combinedReducer = combineReducers({
  sequencer: sequencerReducer,
  pattern: patternReducer,
});

const store = configureStore<State>({
  reducer: combinedReducer,
});

export { store, setStep, setPattern };
