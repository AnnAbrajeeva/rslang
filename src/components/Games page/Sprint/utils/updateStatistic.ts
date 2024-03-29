/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IUserWordWithParams } from './../../../../types/types'
/*eslint import/no-cycle: [2, { ignoreExternal: true }]*/
import { getNewWordsFromArray } from '../../../../utils'
import AUDIOCHALLENGE from '../../../../utils/constants'

export interface ILocalStatisticSprint {
  date: string
  allNewWordsCount: number
  allGamesRight: number
  allGamesWrong: number
  wordList: Array<string>
  games: {
    sprint: {
      bestStreak: number
      gameNewWordsCount: number
      rightAnswers: number
      wrongAnswers: number
      wordList: Array<string>
    }
    audiochallenge: {
      bestStreak: number
      gameNewWordsCount: number
      rightAnswers: number
      wrongAnswers: number
      wordList: Array<string>
    }
  }
}

const setInitialLocalStatistic = (
  rightAnswersIds: Array<string>,
  wrongAnswersIds: Array<string>,
  game: string,
  currentStreak: number,
  userId?: string
) => {
  const userKey = `statistic-${userId}`
  const guestKey = `statistic-guest`
  const userStatistic = userId ? localStorage.getItem(userKey) : undefined
  const guestStatistic = localStorage.getItem(guestKey)
  const prevStatistic =
    userStatistic || (!userId && guestStatistic ? guestStatistic : null)

  const prevData = JSON.parse(prevStatistic || '{}') as ILocalStatisticSprint
  const allWordsList = [...rightAnswersIds, ...wrongAnswersIds]
  const audiochallengeStat =
    prevData && prevData.games && prevData.games.audiochallenge
      ? prevData.games.audiochallenge
      : {
          bestStreak: 0,
          gameNewWordsCount: 0,
          rightAnswers: 0,
          wrongAnswers: 0,
          wordList: [],
        }
  const sprintStat =
    game === 'sprint'
      ? {
          bestStreak: currentStreak,
          gameNewWordsCount: allWordsList.length,
          rightAnswers: rightAnswersIds.length,
          wrongAnswers: wrongAnswersIds.length,
          wordList: allWordsList,
        }
      : {
          bestStreak: 0,
          gameNewWordsCount: 0,
          rightAnswers: 0,
          wrongAnswers: 0,
          wordList: [],
        }

  const newData: ILocalStatisticSprint = {
    date: new Date().toLocaleString().split(', ')[0],
    allNewWordsCount: rightAnswersIds.length + wrongAnswersIds.length,
    allGamesRight: rightAnswersIds.length,
    allGamesWrong: wrongAnswersIds.length,
    wordList: allWordsList,
    games: {
      sprint: sprintStat,
      audiochallenge: audiochallengeStat,
    },
  }
  return newData
}

// eslint-disable-next-line import/prefer-default-export
export const updateLocalStatisticSprint = (
  rightAnswersIds: Array<string>,
  wrongAnswersIds: Array<string>,
  game: string,
  currentStreak: number,
  userId?: string
) => {
  const userKey = `statistic-${userId}`
  const guestKey = `statistic-guest`
  const userStatistic = userId ? localStorage.getItem(userKey) : undefined
  const guestStatistic = localStorage.getItem(guestKey)
  const prevStatistic =
    userStatistic || (!userId && guestStatistic ? guestStatistic : null)
  const currentDate = new Date().toLocaleString().split(', ')[0]
  let newData: ILocalStatisticSprint
  const prevData = JSON.parse(prevStatistic || '{}') as ILocalStatisticSprint
  if (prevStatistic && prevData.games.sprint) {
    let dailyGameNewWords: string[] = []
    if (game === 'sprint') {
      dailyGameNewWords = getNewWordsFromArray(
        [...rightAnswersIds, ...wrongAnswersIds],
        prevData.games.sprint.wordList
      )
    }
    const dailyAllNewWords = getNewWordsFromArray(
      [...rightAnswersIds, ...wrongAnswersIds],
      prevData.wordList
    )

    if (currentDate === prevData.date) {
      const sprintStat =
        game === 'sprint'
          ? {
              bestStreak:
                currentStreak > prevData.games.sprint.bestStreak
                  ? currentStreak
                  : prevData.games.sprint.bestStreak,
              gameNewWordsCount:
                prevData.games.sprint.gameNewWordsCount +
                dailyGameNewWords.length,
              rightAnswers:
                prevData.games.sprint.rightAnswers + rightAnswersIds.length,
              wrongAnswers:
                prevData.games.sprint.wrongAnswers + wrongAnswersIds.length,
              wordList: [
                ...prevData.games.sprint.wordList,
                ...dailyGameNewWords,
              ],
            }
          : { ...prevData.games.sprint }

      newData = {
        games: {
          sprint: sprintStat,
          audiochallenge: prevData.games.audiochallenge,
        },
        date: currentDate,
        allNewWordsCount: prevData.allNewWordsCount + dailyAllNewWords.length,
        allGamesRight:
          sprintStat.rightAnswers + prevData.games.audiochallenge.rightAnswers,
        allGamesWrong:
          sprintStat.wrongAnswers + prevData.games.audiochallenge.wrongAnswers,
        wordList: [...prevData.wordList, ...dailyAllNewWords],
      }
      userId
        ? localStorage.setItem(userKey, JSON.stringify(newData))
        : localStorage.setItem(guestKey, JSON.stringify(newData))
    } else if (currentDate !== prevData.date) {
      const sprintStat =
        game === 'sprint'
          ? {
              bestStreak: currentStreak,
              gameNewWordsCount: dailyGameNewWords.length,
              rightAnswers: rightAnswersIds.length,
              wrongAnswers: wrongAnswersIds.length,
              wordList: [
                ...prevData.games.sprint.wordList,
                ...dailyGameNewWords,
              ],
            }
          : {
              ...prevData.games.sprint,
              bestStreak: 0,
              gameWordsCount: 0,
              rightAnswers: 0,
              wrongAnswers: 0,
            }
      newData = {
        games: {
          sprint: sprintStat,
          audiochallenge: prevData.games.audiochallenge,
        },
        date: currentDate,
        allNewWordsCount: dailyAllNewWords.length,
        allGamesRight: rightAnswersIds.length,
        allGamesWrong: wrongAnswersIds.length,
        wordList: [...prevData.wordList, ...dailyAllNewWords],
      }
      userId
        ? localStorage.setItem(userKey, JSON.stringify(newData))
        : localStorage.setItem(guestKey, JSON.stringify(newData))
    }
  } else {
    newData = setInitialLocalStatistic(
      rightAnswersIds,
      wrongAnswersIds,
      game,
      currentStreak,
      userId
    )
    userId
      ? localStorage.setItem(userKey, JSON.stringify(newData))
      : localStorage.setItem(guestKey, JSON.stringify(newData))
  }
}

export const getSprintChallengeStatistics = () => {
  let statKey: string
  let statistics: ILocalStatisticSprint | undefined
  const user = localStorage.getItem('authData')
  if (user) {
    statKey = `statistic-${JSON.parse(user).userId}`
    statistics = JSON.parse(localStorage.getItem(statKey)!)
  }
  if (statistics) {
    statistics.games.sprint.rightAnswers /= 2
    statistics.games.sprint.wrongAnswers /= 2
    statistics.allGamesRight /= 2
    statistics.allGamesWrong /= 2
    return statistics
  }
  return null
}

export const getOneDayStatistics = () => {
  let statKey: string
  let statistics: ILocalStatisticSprint | undefined
  const user = localStorage.getItem('authData')
  if (user) {
    statKey = `statistic-${JSON.parse(user).userId}`
    statistics = JSON.parse(localStorage.getItem(statKey)!)
  }
  if (statistics) {
    statistics.allGamesRight
    statistics.allGamesWrong
    statistics.allNewWordsCount
    return statistics
  }
  return null
}

export const createNewUserWord = (
  // для создания 'пустого' объекта userWord
  wordId: string,
  isRight: boolean,
  gameName?: string,
  difficulty?: string
) => {
  const counter = isRight ? 1 : 0
  return {
    difficulty: difficulty || 'easy',
    optional: {
      wordId,
      counter,
      audiochallenge: {
        rightCounter:
          Number(gameName && gameName === AUDIOCHALLENGE && isRight) || 0,
        wrongCounter:
          Number(gameName && gameName === AUDIOCHALLENGE && !isRight) || 0,
      },
      sprint: {
        rightCounter: Number(gameName && gameName === 'sprint' && isRight) || 0,
        wrongCounter:
          Number(gameName && gameName === 'sprint' && !isRight) || 0,
      },
    },
  }
}

export const updateWord = (
  // создание обновленного объекта UserWord после игры
  word: IUserWordWithParams,
  isRight: boolean,
  gameName: string
  // eslint-disable-next-line consistent-return
) => {
  // eslint-disable-next-line no-prototype-builtins
  if (word) {
    const { difficulty, optional } = word.userWord
    const { id } = word
    const updatedUserWord = {
      difficulty: difficulty || 'easy',
      optional: {
        id,
        // eslint-disable-next-line no-nested-ternary
        counter: optional.counter
          ? isRight
            ? optional.counter + 1
            : 0
          : isRight
          ? 1
          : 0,
        audiochallenge: optional.audiochallenge
          ? optional.audiochallenge
          : {
              rightCounter: 0,
              wrongCounter: 0,
            },
        sprint: optional.sprint
          ? {
              rightCounter:
                gameName && gameName === 'sprint' && isRight
                  ? optional.sprint.rightCounter + 1
                  : optional.sprint.rightCounter,
              wrongCounter:
                gameName && gameName === 'sprint' && !isRight
                  ? optional.sprint.wrongCounter + 1
                  : optional.sprint.wrongCounter,
            }
          : {
              rightCounter: isRight ? 1 : 0,
              wrongCounter: !isRight ? 1 : 0,
            },
      },
    }
    return updatedUserWord
  }
}
