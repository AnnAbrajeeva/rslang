/* eslint-disable */
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IUserWord } from '../../../types/auth-audio/IUserWord';
import { IWord } from '../../../types/auth-audio/IWord';
import { fetchAllWords, fetchUserWords } from '../../thunks';
import { IWordsState } from './types';
import { combineAllWordsWithUserWords } from './utils';

const initialState: IWordsState = {
  allWords: [],
  isFetchingAllWords: false,
  fetchAllWordsError: null,
  fetchAllWordsFulfilled: false,
  isFetchingUserWords: false,
  fetchUserWordsError: null,
  fetchUserWordsFulfilled: false,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllWords.pending.type]: (state) => {
      state.isFetchingAllWords = true;
      state.fetchAllWordsFulfilled = false;
    },
    [fetchAllWords.fulfilled.type]: (state, action: PayloadAction<IWord[]>) => {
      state.isFetchingAllWords = false;
      state.fetchAllWordsError = null;
      state.fetchAllWordsFulfilled = true;
      state.allWords = action.payload;
    },
    [fetchAllWords.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchAllWordsError = action.payload;
      console.error(action.payload);
    },
    [fetchUserWords.pending.type]: (state) => {
      state.isFetchingUserWords = true;
      state.fetchUserWordsFulfilled = false;
    },
    [fetchUserWords.fulfilled.type]: (
      state,
      action: PayloadAction<IUserWord[]>
    ) => {
      state.isFetchingUserWords = false;
      state.fetchUserWordsError = null;
      const prevWords = current(state).allWords;
      state.allWords = combineAllWordsWithUserWords(prevWords, action.payload);
      state.fetchUserWordsFulfilled = true;
    },
    [fetchUserWords.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchUserWordsError = action.payload;
      console.error(action.payload);
    },
  },
});

export default wordsSlice.reducer;
