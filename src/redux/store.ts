import { combineReducers, configureStore } from '@reduxjs/toolkit';
import registration from './features/registrationSlice';
import auth from './features/authSlice';
import challenge from './features/audioChallengeSlice';


const rootReducer = combineReducers({
  registration,
  auth,
  challenge,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type TState = ReturnType<typeof rootReducer>;
export type TDispatch = typeof store.dispatch;
