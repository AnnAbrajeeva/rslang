/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn } from '../../thunks';
import { IAuthUser as IAuth } from '../../../types/types';
import { IAuthState } from './types';

const initialState: IAuthState = {
  authData: null,
  isSigningIn: false,
  signingInError: null,
  enteringFlag: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserData(state, action: PayloadAction<IAuth | null>) {
      state.authData = action.payload;
    },
    setSigningInError(state, action: PayloadAction<null>) {
      state.signingInError = action.payload;
    },
    setEnteringFlag(state, action: PayloadAction<boolean>) {
      state.enteringFlag = action.payload;
    },

  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.isSigningIn = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
      state.isSigningIn = false;
      state.signingInError = null;
      state.authData = action.payload;
      state.enteringFlag = true;
      localStorage.setItem('authData', JSON.stringify(action.payload));
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.signingInError = action.payload;
      state.isSigningIn = false;
      state.enteringFlag = true;
    },
  },
});

export const {
  setAuthUserData,
  setSigningInError,
  setEnteringFlag,
} = authSlice.actions;

export default authSlice.reducer;