import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';
import { generate, type SequenceStep } from '../audio-engine/generator';
import { BASE_NOTE, DEFAUL_SCALE } from '../constants';
import { type Scale } from '../audio-engine/scales';

interface State {
  pattern: SequenceStep[];
  options: {
    maxSteps: number;
    baseNote: number;
    scale: Scale;
  };
}

interface Reducers extends SliceCaseReducers<State> {
  setPattern: CaseReducer<State, PayloadAction<SequenceStep[]>>;
  setSequenceLength: CaseReducer<State, PayloadAction<number>>;
}

const slice = createSlice<State, Reducers>({
  name: 'pattern',
  initialState: {
    pattern: generate(16),
    options: { maxSteps: 16, baseNote: BASE_NOTE, scale: DEFAUL_SCALE },
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
          maxSteps: payload,
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
