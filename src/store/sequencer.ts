import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';
import { generate, type SequenceStep } from '../audio-engine/generator';
import { BASE_NOTE, DEFAUL_SCALE, DEFAUL_SEQ_LENGTH } from '../constants';
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
  pattern: generate(DEFAUL_SEQ_LENGTH),
  options: { seqLength: DEFAUL_SEQ_LENGTH, baseNote: BASE_NOTE, scale: DEFAUL_SCALE },
};

interface Reducers extends SliceCaseReducers<State> {
  setPattern: CaseReducer<State, PayloadAction<SequenceStep[]>>;
  setSequenceLength: CaseReducer<State, PayloadAction<number>>;
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
  },
});

const {
  actions: { setPattern, setSequenceLength },
  reducer,
} = slice;

export { setPattern, setSequenceLength };
export type { State as SequencerState };
export default reducer;
