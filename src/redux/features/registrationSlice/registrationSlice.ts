/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUser } from '../../thunks';
import { IRegistrationState, ICreatedUser } from './types';

const initialState: IRegistrationState = {
  isCreatingUser: false,
  userCreationError: null,
  registeringFlag: false,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setUserCreationError: (state, action: PayloadAction<null>) => {
      state.userCreationError = action.payload;
    },
    setRegisteringFlag: (state, action: PayloadAction<boolean>) => {
      state.registeringFlag = action.payload;
    },
  },
  extraReducers: {
    [createUser.pending.type]: (state) => {
      state.isCreatingUser = true;
    },

    [createUser.fulfilled.type]: (state, action: PayloadAction<ICreatedUser>) => {
      state.isCreatingUser = false;
      state.userCreationError = null;
      state.registeringFlag = true;
    },

    [createUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isCreatingUser = false;
      state.userCreationError = action.payload;
      state.registeringFlag = true;
    },
  }
});

export const {
  setUserCreationError,
  setRegisteringFlag,
} = registrationSlice.actions;

export default registrationSlice.reducer;