import {
  type CaseReducer,
  createSlice,
  type PayloadAction,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';

interface State {
  dispatchGenerate: boolean;
}

interface Reducers extends SliceCaseReducers<State> {
  setGenerate: CaseReducer<State, PayloadAction<boolean>>;
}

const initialState: State = { dispatchGenerate: false };

const slice = createSlice<State, Reducers>({
  name: 'generateor',
  initialState,
  reducers: {
    setGenerate: (state, { payload }) => {
      return {
        ...state,
        dispatchGenerate: payload,
      };
    },
  },
});

const {
  actions: { setGenerate },
  reducer,
} = slice;

export { setGenerate };
export type { State as GeneratorState };
export default reducer;
