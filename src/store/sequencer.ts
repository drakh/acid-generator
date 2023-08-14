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
    seqLength: number;
    baseNote: number;
    scale: SCALE;
  };
}

const initialState: State = {
  pattern: generate(DEFAULTS.SEQ_LENGTH),
  options: { seqLength: DEFAULTS.SEQ_LENGTH, baseNote: BASE_NOTE, scale: DEFAULTS.SCALE },
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
