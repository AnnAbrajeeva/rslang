/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStatistic } from '../../../types/auth-audio/IStatistic';
import { getStatistic } from '../../thunks';
import { IStatisticState } from './types';

const initialState: IStatisticState = {
  statisticData: {},
  isLoadingStatistic: false,
  statisticLoaded: false,
  statisticError: null,
};

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: {
    [getStatistic.pending.type]: (state) => {
      state.isLoadingStatistic = true;
      state.statisticLoaded = false;
    },
    [getStatistic.fulfilled.type]: (
      state,
      action: PayloadAction<IStatistic>
    ) => {
      state.isLoadingStatistic = false;
      state.statisticError = null;
      state.statisticLoaded = true;
      state.statisticData = { ...action.payload };
    },
    [getStatistic.rejected.type]: (state, action: PayloadAction<string>) => {
      state.statisticError = action.payload;
      console.error(action.payload);
    },
  },
});

export default statisticSlice.reducer;
