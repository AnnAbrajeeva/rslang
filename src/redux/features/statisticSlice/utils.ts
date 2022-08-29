/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { IStatistic } from '../../../types/auth-audio/IStatistic';
import { getCurrentDate, isObjectEmpty } from '../../../utils';
import { TDailyResults, TLearnedWordsIds } from './types';

// Функция возвращает новый объект статистики, который нужно отправить на бэк
export const prepareNewStatistic = (
  prevStatistic: IStatistic | {}, // предыдущая статистика, полученная с бэка
  gameWordsIds: Array<string> // id всех слов, которые участвовали в игре
) => {
  const prevData = { ...prevStatistic };
  const newWordsIds: Array<string> = [];
  const today = getCurrentDate();
  if (!isObjectEmpty(prevData)) {
    [...gameWordsIds].forEach((el) => {
      if (!(el in prevData!.optional!.learnedWordsIds)) newWordsIds.push(el);
    });
    const newDailyResult =
      today in prevData!.optional!.dailyResults
        ? {
            newWordsCounter:
              prevData!.optional!.dailyResults[today].newWordsCounter +
              newWordsIds.length,
            allWordsCounter: prevData!.learnedWords! + newWordsIds.length,
          }
        : {
            newWordsCounter: newWordsIds.length,
            allWordsCounter: prevData!.learnedWords! + newWordsIds.length,
          };
    const addedWordsIds: TLearnedWordsIds = {};
    newWordsIds.forEach((item) => {
      addedWordsIds[item] = 1;
    });
    const newDailyResults = { ...prevData!.optional!.dailyResults };
    newDailyResults[today] = newDailyResult;
    return {
      learnedWords: prevData!.learnedWords! + newWordsIds.length,
      optional: {
        learnedWordsIds: {
          ...prevData!.optional!.learnedWordsIds,
          ...addedWordsIds,
        },
        dailyResults: newDailyResults,
      },
    };
  // eslint-disable-next-line no-else-return
  } else if (isObjectEmpty(prevData)) {
    const addedWordsIds: TLearnedWordsIds = {};
    gameWordsIds.forEach((item) => {
      addedWordsIds[item] = 1;
    });
    const dailyResult = {
      newWordsCounter: gameWordsIds.length,
      allWordsCounter: gameWordsIds.length,
    };
    const dailyResults: TDailyResults = {};
    dailyResults[today] = dailyResult;
    return {
      learnedWords: gameWordsIds.length,
      optional: {
        learnedWordsIds: {
          ...addedWordsIds,
        },
        dailyResults,
      },
    };
  }
};
