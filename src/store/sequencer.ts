import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';
import dockerNames from 'docker-names-ts';
import { generate, type SequenceStep } from '../audio-engine/generator';
import { BASE_NOTE, DEFAULTS } from '../constants';
import { type SCALE } from '../audio-engine/scales';
import { storage } from '../localStorage';

const { sequencer = {} } = storage;

enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
}

interface State {
  pattern: SequenceStep[];
  name: string;
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
  name: dockerNames.getRandomName(),
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
  setName: CaseReducer<State, PayloadAction<string>>;
  shiftPattern: CaseReducer<State, PayloadAction<DIRECTION>>;
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
  },
});

const {
  actions: { setPattern, setSequenceLength, setScale, setName, shiftPattern },
  reducer,
} = slice;

export { setPattern, setSequenceLength, setScale, setName, shiftPattern, DIRECTION };
export type { State as SequencerState };
export default reducer;
