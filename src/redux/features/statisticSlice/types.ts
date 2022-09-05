import { IDailyResult, IStatistic } from '../../../types/auth-audio/IStatistic';

export interface IStatisticState {
  statisticData: IStatistic | {};
  isLoadingStatistic: boolean;
  statisticLoaded: boolean;
  statisticError: string | null;
}

export type TLearnedWordsIds = {
  [prop: string]: number;
};

export type TDailyResults = {
  [prop: string]: IDailyResult;
};
