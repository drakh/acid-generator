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
  },
});

const {
  actions: { setPattern, setSequenceLength, setScale, setName },
  reducer,
} = slice;

export { setPattern, setSequenceLength, setScale, setName };
export type { State as SequencerState };
export default reducer;
