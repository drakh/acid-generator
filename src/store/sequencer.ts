import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';
import { generate, type SequenceStep } from '../audio-engine/generator';
import { BASE_NOTE, DEFAULTS } from '../constants';
import { type SCALE } from '../audio-engine/scales';
import { storage } from '../localStorage.ts';

const { sequencer = {} } = storage;

interface State {
  pattern: SequenceStep[];
  options: {
    baseNote: number;
    scale: SCALE;
    gate: number;
  };
}

const initialState: State = {
  pattern: generate({
    patternLength: DEFAULTS.SEQ_LENGTH,
    spread: 100,
    density: 100,
    accentsDensity: 50,
    slidesDensity: 50,
  }),
  options: {
    baseNote: BASE_NOTE,
    scale: DEFAULTS.SCALE,
    gate: 0.8,
  },
};

interface Reducers extends SliceCaseReducers<State> {
  setPattern: CaseReducer<State, PayloadAction<SequenceStep[]>>;
  setSequenceLength: CaseReducer<State, PayloadAction<number>>;
  setScale: CaseReducer<State, PayloadAction<SCALE>>;
}

const slice = createSlice<State, Reducers>({
  name: 'pattern',
  initialState: {
    ...initialState,
    ...sequencer,
  },
  reducers: {
    setPattern: (state, { payload }) => {
      return {
        ...state,
        pattern: payload,
      };
    },
    setSequenceLength: (state, { payload }) => {
      const { options } = state;
      return {
        ...state,
        options: {
          ...options,
          seqLength: payload,
        },
      };
    },
    setScale: (state, { payload }) => {
      const { options } = state;
      return {
        ...state,
        options: {
          ...options,
          scale: payload,
        },
      };
    },
  },
});

const {
  actions: { setPattern, setSequenceLength, setScale },
  reducer,
} = slice;

export { setPattern, setSequenceLength, setScale };
export type { State as SequencerState };
export default reducer;
