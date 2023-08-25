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
import { DIRECTION, type Pattern, type SequencerOutput } from '../types';

const { sequencer: { name, pattern, storedPatterns, scale } = {} } = storage;

interface State extends Pattern {
  storedPatterns: Pattern[];
  options: {
    baseNote: number;
    gate: number;
    output: { midi: MIDIAccess | null; outputs: SequencerOutput[] };
  };
}

const initialState: State = {
  pattern:
    pattern ||
    generate({
      patternLength: DEFAULTS.SEQ_LENGTH,
      spread: 100,
      density: 100,
      accentsDensity: 50,
      slidesDensity: 50,
    }),
  name: name || dockerNames.getRandomName(),
  scale: scale || DEFAULTS.SCALE,
  options: {
    baseNote: BASE_NOTE,
    gate: 0.8,
    output: {
      midi: null,
      outputs: [],
    },
  },
  storedPatterns: storedPatterns || [],
};

interface Reducers extends SliceCaseReducers<State> {
  setPattern: CaseReducer<State, PayloadAction<SequenceStep[]>>;
  setScale: CaseReducer<State, PayloadAction<SCALE>>;
  setName: CaseReducer<State, PayloadAction<string>>;
  shiftPattern: CaseReducer<State, PayloadAction<DIRECTION>>;
  storePattern: CaseReducer<State, PayloadAction<Pattern>>;
  loadPattern: CaseReducer<State, PayloadAction<number>>;
  deletePattern: CaseReducer<State, PayloadAction<number>>;
  setMidiInterface: CaseReducer<State, PayloadAction<MIDIAccess>>;
  addMidiOutput: CaseReducer<State, PayloadAction<SequencerOutput>>;
  selectOutput: CaseReducer<State, PayloadAction<string | undefined>>;
  setMidiChannel: CaseReducer<State, PayloadAction<{ id: string; channel: number }>>;
}

const slice = createSlice<State, Reducers>({
  name: 'pattern',
  initialState: {
    ...initialState,
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
    setMidiInterface: (state, { payload }) => {
      const {
        options,
        options: { output },
      } = state;
      return {
        ...state,
        options: {
          ...options,
          output: {
            ...output,
            midi: payload,
          },
        },
      };
    },
    addMidiOutput: (state, { payload }) => {
      const {
        options,
        options: { output },
        options: {
          output: { outputs },
        },
      } = state;
      const includesPort = outputs.find(({ port }) => port.id === payload.port.id);
      return {
        ...state,
        options: {
          ...options,
          output: {
            ...output,
            outputs: includesPort ? outputs : [...outputs, payload],
          },
        },
      };
    },
    selectOutput: (state, { payload }) => {
      const {
        options,
        options: { output },
        options: {
          output: { outputs },
        },
      } = state;
      return {
        ...state,
        options: {
          ...options,
          output: {
            ...output,
            outputs: outputs.map((out) => {
              const {
                port: { id },
              } = out;
              return {
                ...out,
                selected: id === payload,
              };
            }),
          },
        },
      };
    },
    setMidiChannel: (state, { payload: { id, channel } }) => {
      const {
        options,
        options: { output },
        options: {
          output: { outputs },
        },
      } = state;
      return {
        ...state,
        options: {
          ...options,
          output: {
            ...output,
            outputs: outputs.map((out) => {
              const { port } = out;
              if (port.id !== id) return out;
              return {
                ...out,
                channel,
              };
            }),
          },
        },
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
    addMidiOutput,
    setMidiInterface,
    selectOutput,
    setMidiChannel,
  },
  reducer,
} = slice;

export {
  setPattern,
  setSequenceLength,
  setScale,
  setName,
  shiftPattern,
  storePattern,
  loadPattern,
  deletePattern,
  addMidiOutput,
  setMidiInterface,
  selectOutput,
  setMidiChannel,
};
export type { State as SequencerState };
export default reducer;
