import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';
import { BASE_TEMPO } from '../constants';

interface State {
  currentStep: number;
  playing: boolean;
  tempo: number;
}

interface Reducers extends SliceCaseReducers<State> {
  setStep: CaseReducer<State, PayloadAction<number>>;
  setPlaying: CaseReducer<State, PayloadAction<boolean>>;
  setTempo: CaseReducer<State, PayloadAction<number>>;
}

const slice = createSlice<State, Reducers>({
  name: 'transport',
  initialState: { currentStep: -1, playing: false, tempo: BASE_TEMPO },
  reducers: {
    setStep: (state, { payload }) => {
      return {
        ...state,
        currentStep: payload,
      };
    },
    setPlaying: (state, { payload }) => {
      return {
        ...state,
        playing: payload,
      };
    },
    setTempo: (state, { payload }) => {
      return {
        ...state,
        tempo: payload,
      };
    },
  },
});

const {
  actions: { setStep, setPlaying, setTempo },
  reducer,
} = slice;

export { setStep, setPlaying, setTempo };
export type { State as TransportState };
export default reducer;
