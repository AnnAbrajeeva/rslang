import {
  TDailyResults,
  TLearnedWordsIds,
} from '../../../redux/features/statisticSlice/types'
import { IStatistic } from '../../../types/auth-audio/IStatistic'
import { isObjectEmpty } from '../../../utils'

// eslint-disable-next-line consistent-return
export const updateStatistic = async (
  statistic: IStatistic | {},
  action: string,
  id: string[]
) => {
  const prevData = { ...statistic }
  const newWordsIds: Array<string> = []
  const today = new Date().toLocaleString().split(', ')[0]
  console.log(id)
  if (!isObjectEmpty(prevData)) {
    [...id].forEach((el) => {
      if (!(el in prevData!.optional!.learnedWordsIds)) newWordsIds.push(el)
    })
    const newDailyResult =
      today in prevData!.optional!.dailyResults
        ? {
            newWordsCounter:
              prevData!.optional!.dailyResults[today].newWordsCounter +
              newWordsIds.length,
            allWordsCounter: prevData!.learnedWords! + newWordsIds.length,
            learnedWords:
              action === 'add'
                ? (prevData!.optional!.dailyResults[today].learnedWords += 1)
                : (prevData!.optional!.dailyResults[today].learnedWords > 0 ? prevData!.optional!.dailyResults[today].learnedWords -= 1 : 0),
          }
        : {
            newWordsCounter: newWordsIds.length,
            allWordsCounter: prevData!.learnedWords! + newWordsIds.length,
            learnedWords: action === 'add' ? 1 : 0,
          }
    const addedWordsIds: TLearnedWordsIds = {}
    newWordsIds.forEach((item) => {
      addedWordsIds[item] = 1
    })
    const newDailyResults = { ...prevData!.optional!.dailyResults }
    newDailyResults[today] = newDailyResult
    return {
      learnedWords: prevData!.learnedWords! + newWordsIds.length,
      optional: {
        learnedWordsIds: {
          ...prevData!.optional!.learnedWordsIds,
          ...addedWordsIds,
        },
        dailyResults: newDailyResults,
      },
    }
  }
  if (isObjectEmpty(prevData)) {
    const addedWordsIds: TLearnedWordsIds = {}
    id.forEach((item) => {
      addedWordsIds[item] = 1
    })
    const dailyResult = {
      newWordsCounter: id.length,
      allWordsCounter: id.length,
      learnedWords: action === 'add' ? 1 : 0,
    }
    const dailyResults: TDailyResults = {}
    dailyResults[today] = dailyResult
    return {
      learnedWords: id.length,
      optional: {
        learnedWordsIds: { ...addedWordsIds },
        dailyResults,
      },
    }
  }
}
