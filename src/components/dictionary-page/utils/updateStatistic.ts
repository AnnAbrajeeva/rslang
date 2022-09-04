import { TDailyResults, TLearnedWordsIds } from "../../../redux/features/statisticSlice/types";
import { IStatistic } from "../../../types/auth-audio/IStatistic";
import { getCurrentDate, isObjectEmpty } from "../../../utils";

 // eslint-disable-next-line consistent-return
 export const updateStatistic = async(statistic: IStatistic | {}, action: string) => {
    const prevData = { ...statistic };
    const today = new Date().toLocaleString().split(', ')[0];
    if (!isObjectEmpty(prevData)) {
      const newDailyResult =
        today in prevData!.optional!.dailyResults
          ? {
              newWordsCounter:
                prevData!.optional!.dailyResults[today].newWordsCounter,
              allWordsCounter: prevData!.learnedWords!,
              learnedWords: action === 'add' ? prevData!.optional!.dailyResults[today].learnedWords += 1 : prevData!.optional!.dailyResults[today].learnedWords -= 1
            }
          : {
              newWordsCounter: 0,
              allWordsCounter: 0,
              learnedWords: action === 'add' ? 1 : 0
            };
      const newDailyResults = { ...prevData!.optional!.dailyResults };
      newDailyResults[today] = newDailyResult;
      return {
        learnedWords: prevData!.learnedWords!,
        optional: {
          learnedWordsIds: {
            ...prevData!.optional!.learnedWordsIds
          },
          dailyResults: newDailyResults,
        },
      };
    } if (isObjectEmpty(prevData)) {
      const addedWordsIds: TLearnedWordsIds = {};
      const dailyResult = {
        newWordsCounter: 0,
        allWordsCounter: 0,
        learnedWords: action === 'add' ? 1 : 0
      };
      const dailyResults: TDailyResults = {};
      dailyResults[today] = dailyResult;
      return {
        learnedWords: 0,
        optional: {
          learnedWordsIds: {...addedWordsIds},
          dailyResults,
        },
      };
    }
  }