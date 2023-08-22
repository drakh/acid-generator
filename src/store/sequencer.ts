import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';
import dockerNames from 'docker-names-ts';
import { concat } from 'lodash';
import { generate, type SequenceStep } from '../audio-engine/generator';
import { BASE_NOTE, DEFAULTS } from '../constants';
import { type SCALE } from '../audio-engine/scales';
import { storage } from '../localStorage';
import { type Pattern } from '../types';

const { sequencer = {} } = storage;

enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
}

interface State extends Pattern {
  storedPatterns: Pattern[];
  options: {
    baseNote: number;
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
  name: dockerNames.getRandomName(),
  scale: DEFAULTS.SCALE,
  options: {
    baseNote: BASE_NOTE,
    gate: 0.8,
  },
  storedPatterns: [],
};

interface Reducers extends SliceCaseReducers<State> {
  setPattern: CaseReducer<State, PayloadAction<SequenceStep[]>>;
  setScale: CaseReducer<State, PayloadAction<SCALE>>;
  setName: CaseReducer<State, PayloadAction<string>>;
  shiftPattern: CaseReducer<State, PayloadAction<DIRECTION>>;
  storePattern: CaseReducer<State, PayloadAction<Pattern>>;
  loadPattern: CaseReducer<State, PayloadAction<number>>;
  deletePattern: CaseReducer<State, PayloadAction<number>>;
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
    setScale: (state, { payload }) => {
      return {
        ...state,
        scale: payload,
      };
    },
    setName: (state, { payload }) => {
      return {
        ...state,
        name: payload,
      };
    },
    shiftPattern: (state, { payload }) => {
      const { pattern } = state;
      const { length } = pattern;
      const first =
        payload === DIRECTION.LEFT ? pattern.slice(0, 1) : pattern.slice(0, length - 1);
      const second =
        payload === DIRECTION.LEFT
          ? pattern.slice(1, length)
          : pattern.slice(length - 1, length);
      return {
        ...state,
        pattern: [...second, ...first],
      };
    },
    storePattern: (state, { payload }) => {
      return {
        ...state,
        storedPatterns: concat(payload, state.storedPatterns),
      };
    },
    loadPattern: (state, { payload }) => {
      const patternToLoad = state.storedPatterns[payload];
      return {
        ...state,
        ...patternToLoad,
      };
    },
    deletePattern: (state, { payload }) => {
      const { storedPatterns } = state;
      return {
        ...state,
        storedPatterns: storedPatterns.filter((_p, i) => i !== payload),
      };
    },
  },
});

const {
  actions: {
    setPattern,
    setSequenceLength,
    setScale,
    setName,
    shiftPattern,
    storePattern,
    loadPattern,
    deletePattern,
  },
  reducer,
} = slice;

export {
  setPattern,
  setSequenceLength,
  setScale,
  setName,
  shiftPattern,
  DIRECTION,
  storePattern,
  loadPattern,
  deletePattern,
};
export type { State as SequencerState };
export default reducer;
