import { combineReducers, configureStore } from '@reduxjs/toolkit';
import registration from './features/registrationSlice';
import auth from './features/authSlice';
import challenge from './features/audioChallengeSlice';
import words from './features/wordsSlice';
import statistic from './features/statisticSlice';

const rootReducer = combineReducers({
  registration,
  auth,
  challenge,
  words,
  statistic,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type TState = ReturnType<typeof rootReducer>;
export type TDispatch = typeof store.dispatch;
