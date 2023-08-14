import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';
import { DEFAULTS } from '../constants';

const { CUTOFF, RESONANCE, DELAY_LEVEL } = DEFAULTS;

interface State {
  cutoff: number;
  resonance: number;
  delaySend: number;
}

interface Reducers extends SliceCaseReducers<State> {
  setCutoff: CaseReducer<State, PayloadAction<number>>;
  setResonance: CaseReducer<State, PayloadAction<number>>;
  setDelaySend: CaseReducer<State, PayloadAction<number>>;
}

const initialState: State = {
  cutoff: CUTOFF,
  resonance: RESONANCE,
  delaySend: DELAY_LEVEL,
};

const slice = createSlice<State, Reducers>({
  name: 'generateor',
  initialState,
  reducers: {
    setCutoff: (state, { payload }) => {
      return {
        ...state,
        cutoff: payload,
      };
    },
    setResonance: (state, { payload }) => {
      return {
        ...state,
        resonance: payload,
      };
    },
    setDelaySend: (state, { payload }) => {
      return {
        ...state,
        delaySend: payload,
      };
    },
  },
});

const {
  actions: { setCutoff, setResonance, setDelaySend },
  reducer,
} = slice;

export { setCutoff, setResonance, setDelaySend };
export type { State as SynthState };
export default reducer;
