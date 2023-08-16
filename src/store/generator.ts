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
}

interface Reducers extends SliceCaseReducers<State> {
  setGenerate: CaseReducer<State, PayloadAction<boolean>>;
  setPatternLength: CaseReducer<State, PayloadAction<number>>;
  setDensity: CaseReducer<State, PayloadAction<number>>;
  setSpread: CaseReducer<State, PayloadAction<number>>;
  setAccentDensity: CaseReducer<State, PayloadAction<number>>;
  setSlidesDensity: CaseReducer<State, PayloadAction<number>>;
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
};
export type { State as GeneratorState };
export default reducer;
