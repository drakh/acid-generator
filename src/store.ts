import { createSlice, configureStore, type PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export interface State {
  steps: {
    currentStep: number;
    maxSteps: number;
  };
}

const slice = createSlice({
  name: 'steps',
  initialState: { currentStep: 0, maxSteps: 16 },
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentStep: action.payload,
      };
    },
  },
});

const {
  actions: { setStep },
  reducer,
} = slice;

const combinedReducer = combineReducers({
  steps: reducer,
});

const store = configureStore<State>({
  reducer: combinedReducer,
});

export { store, setStep };
