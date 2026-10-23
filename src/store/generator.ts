import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';
import { DEFAULTS } from '../constants';
import { storage } from '../localStorage';

const { generator } = storage;

interface State {
  dispatchGenerate: boolean;
  patternLength: number;
  density: number;
  spread: number;
  accentsDensity: number;
  slidesDensity: number;
  startWithNote: boolean;
  startWithAccent: boolean;
  euclidean: boolean;
  euclideanPulses: number;
  euclideanSteps: number;
  euclideanRotate: number;
}

interface Reducers extends SliceCaseReducers<State> {
  setGenerate: CaseReducer<State, PayloadAction<boolean>>;
  setPatternLength: CaseReducer<State, PayloadAction<number>>;
  setDensity: CaseReducer<State, PayloadAction<number>>;
  setSpread: CaseReducer<State, PayloadAction<number>>;
  setAccentDensity: CaseReducer<State, PayloadAction<number>>;
  setSlidesDensity: CaseReducer<State, PayloadAction<number>>;
  setEuclidean: CaseReducer<State, PayloadAction<boolean>>;
  setEuclideanPulses: CaseReducer<State, PayloadAction<number>>;
  setEuclideanSteps: CaseReducer<State, PayloadAction<number>>;
  setEuclideanRotate: CaseReducer<State, PayloadAction<number>>;
}

const initialState: State = {
  dispatchGenerate: false,
  patternLength: DEFAULTS.SEQ_LENGTH,
  density: 100,
  spread: 100,
  accentsDensity: 50,
  slidesDensity: 50,
  startWithAccent: false,
  startWithNote: false,
  euclidean: false,
  euclideanPulses: 7,
  euclideanSteps: 16,
  euclideanRotate: 0,
};

const slice = createSlice<State, Reducers>({
  name: 'generator',
  initialState: {
    ...initialState,
    ...generator,
    dispatchGenerate: false,
  },
  reducers: {
    setGenerate: (state, { payload }) => {
      return {
        ...state,
        dispatchGenerate: payload,
      };
    },
    setPatternLength: (state, { payload }) => {
      return {
        ...state,
        patternLength: payload,
      };
    },
    setDensity: (state, { payload }) => {
      return {
        ...state,
        density: payload,
      };
    },
    setSpread: (state, { payload }) => {
      return {
        ...state,
        spread: payload,
      };
    },
    setAccentDensity: (state, { payload }) => {
      return {
        ...state,
        accentsDensity: payload,
      };
    },
    setSlidesDensity: (state, { payload }) => {
      return {
        ...state,
        slidesDensity: payload,
      };
    },
    setEuclidean: (state, { payload }) => {
      return {
        ...state,
        euclidean: payload,
      };
    },
    setEuclideanPulses: (state, { payload }) => {
      return {
        ...state,
        euclideanPulses: Math.min(payload, state.euclideanSteps),
      };
    },
    setEuclideanSteps: (state, { payload }) => {
      return {
        ...state,
        euclideanSteps: payload,
        euclideanPulses: Math.min(state.euclideanPulses, payload),
        euclideanRotate: Math.min(state.euclideanRotate, payload - 1),
      };
    },
    setEuclideanRotate: (state, { payload }) => {
      return {
        ...state,
        euclideanRotate: Math.min(payload, state.euclideanSteps - 1),
      };
    },
  },
});

const {
  actions: {
    setGenerate,
    setPatternLength,
    setDensity,
    setSpread,
    setAccentDensity,
    setSlidesDensity,
    setEuclidean,
    setEuclideanPulses,
    setEuclideanSteps,
    setEuclideanRotate,
  },
  reducer,
} = slice;

export {
  setGenerate,
  setPatternLength,
  setDensity,
  setSpread,
  setAccentDensity,
  setSlidesDensity,
  setEuclidean,
  setEuclideanPulses,
  setEuclideanSteps,
  setEuclideanRotate,
};
export type { State as GeneratorState };
export default reducer;
