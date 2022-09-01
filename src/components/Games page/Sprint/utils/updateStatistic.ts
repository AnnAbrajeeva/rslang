/* eslint-disable no-unused-expressions */
// eslint-disable-next-line import/no-cycle
import { getCurrentDate, getNewWordsFromArray } from '../../../../utils'

export interface ILocalStatisticSprint {
    date: string;
    allNewWordsCount: number;
    allGamesRight: number;
    allGamesWrong: number;
    wordList: Array<string>;
    games: {
      sprint: {
        bestStreak: number;
        gameNewWordsCount: number;
        rightAnswers: number;
        wrongAnswers: number;
        wordList: Array<string>;
      };
      audiochallenge: {
        bestStreak: number;
        gameNewWordsCount: number;
        rightAnswers: number;
        wrongAnswers: number;
        wordList: Array<string>;
      };
    };
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

    console.log(rightAnswersIds, wrongAnswersIds)

  const prevData = JSON.parse(prevStatistic || '{}') as ILocalStatisticSprint
  const allWordsList = [...rightAnswersIds, ...wrongAnswersIds]
  const audiochallengeStat = prevData && prevData.games && prevData.games.audiochallenge ? prevData.games.audiochallenge : {
    bestStreak: 0,
    gameNewWordsCount: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
    wordList: [],
  };
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
    date: getCurrentDate(),
    allNewWordsCount: rightAnswersIds.length + wrongAnswersIds.length,
    allGamesRight: rightAnswersIds.length,
    allGamesWrong: wrongAnswersIds.length,
    wordList: allWordsList,
    games: {
      sprint: sprintStat,
      audiochallenge: audiochallengeStat
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
  const currentDate = getCurrentDate()
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
                prevData.games.sprint.rightAnswers +
                rightAnswersIds.length,
              wrongAnswers:
                prevData.games.sprint.wrongAnswers +
                wrongAnswersIds.length,
              wordList: [
                ...prevData.games.sprint.wordList,
                ...dailyGameNewWords,
              ],
            }
          : { ...prevData.games.sprint }

      newData = {
        games: {
            sprint: sprintStat,
            audiochallenge: prevData.games.audiochallenge
        },
        date: currentDate,
        allNewWordsCount: prevData.allNewWordsCount + dailyAllNewWords.length,
        allGamesRight: sprintStat.rightAnswers + prevData.games.audiochallenge.rightAnswers,
        allGamesWrong: sprintStat.wrongAnswers + prevData.games.audiochallenge.wrongAnswers,
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
            audiochallenge: prevData.games.audiochallenge
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
    let statKey: string;
    let statistics: ILocalStatisticSprint|undefined;
    const user = localStorage.getItem('authData');
    if (user) {
      statKey = `statistic-${(JSON.parse(user)).userId}`
      statistics = JSON.parse(localStorage.getItem(statKey)!)
    }
    if (statistics) {
      statistics.games.sprint.rightAnswers/=2;
      statistics.games.sprint.wrongAnswers/=2;
      statistics.allGamesRight/=2;
      statistics.allGamesWrong/=2;
      return statistics;
    }
    return null;
  }

  export const getOneDayStatistics = () => {
    let statKey: string;
    let statistics: ILocalStatisticSprint|undefined;
    const user = localStorage.getItem('authData');
    if (user) {
      statKey = `statistic-${(JSON.parse(user)).userId}`
      statistics = JSON.parse(localStorage.getItem(statKey)!)
    }
    if (statistics) {
      statistics.allGamesRight/=2;
      statistics.allGamesWrong/=2;
      statistics.allNewWordsCount/=2;
      return statistics;
    }
    return null;
  }