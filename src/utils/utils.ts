import { ILocalStatisticSprint } from '../components/Games page/Sprint/utils/updateStatistic';
import { ILocalStatistic } from '../types/auth-audio/ILocalStatistic';
import { TDifficulty } from '../types/auth-audio/IUserWord';
import { IWord } from '../types/auth-audio/IWord';
import AUDIOCHALLENGE from './constants';
import { TGetWordsByGroup } from './types';

export const shuffleArray = <T>(arr: Array<T>): Array<T> => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const getRandomValueFromArray = <T>(arr: Array<T>): T =>
  arr[Math.floor(Math.random() * (arr.length - 1))];

export const getWordsByGroup: TGetWordsByGroup = (words, group) =>
  words.filter((word) => word.group === group);

export const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

export const getNewWordsFromArray = (
  newDailyWords: Array<string>,
  allLearnedWords: Array<string>
) => {
  const result: Array<string> = [];
  [...newDailyWords].forEach((el) => {
    if (!allLearnedWords.includes(el)) result.push(el);
  });
  return result;
};

const setInitialLocalStatistic = (
  rightAnswersIds: Array<string>,
  wrongAnswersIds: Array<string>,
  game: string,
  currentStreak: number,
  prevData: ILocalStatisticSprint
) => {
  const allWordsList = [...rightAnswersIds, ...wrongAnswersIds];
  const sprintStat =
    prevData && prevData.games && prevData.games.sprint
      ? prevData.games.sprint
      : {
          bestStreak: 0,
          gameNewWordsCount: 0,
          rightAnswers: 0,
          wrongAnswers: 0,
          wordList: [],
        };

  const audiochallengeStat =
    game === AUDIOCHALLENGE
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
        };

  const newData: ILocalStatisticSprint = {
    date: new Date().toLocaleString().split(', ')[0],
    allNewWordsCount: rightAnswersIds.length + wrongAnswersIds.length,
    allGamesRight: rightAnswersIds.length,
    allGamesWrong: wrongAnswersIds.length,
    wordList: allWordsList,
    games: {
      audiochallenge: audiochallengeStat,
      sprint: sprintStat,
    },
  };
  return newData;
};

export const updateLocalStatistic = (
  rightAnswersIds: Array<string>,
  wrongAnswersIds: Array<string>,
  game: string,
  currentStreak: number,
  userId?: string
) => {
  const userKey = `statistic-${userId}`;
  const guestKey = `statistic-guest`;
  const userStatistic = userId ? localStorage.getItem(userKey) : undefined;
  const guestStatistic = localStorage.getItem(guestKey);
  const prevStatistic = userStatistic || (!userId && guestStatistic ? guestStatistic : null);
  const currentDate = new Date().toLocaleString().split(', ')[0];
  console.log(currentDate);
  let newData: ILocalStatisticSprint;
  const prevData = JSON.parse(prevStatistic || '{}') as ILocalStatisticSprint;
  if (prevStatistic && prevData.games.audiochallenge) {
    let dailyGameNewWords: string[] = [];
    if (game === AUDIOCHALLENGE) {
      dailyGameNewWords = getNewWordsFromArray(
        [...rightAnswersIds, ...wrongAnswersIds],
        prevData.games.audiochallenge.wordList
      );
    }
    const dailyAllNewWords = getNewWordsFromArray(
      [...rightAnswersIds, ...wrongAnswersIds],
      prevData.wordList
    );

    if (currentDate === prevData.date) {
      const audiochallengeStat =
        game === AUDIOCHALLENGE
          ? {
              bestStreak:
                currentStreak > prevData.games.audiochallenge.bestStreak
                  ? currentStreak
                  : prevData.games.audiochallenge.bestStreak,
              gameNewWordsCount:
                prevData.games.audiochallenge.gameNewWordsCount + dailyGameNewWords.length,
              rightAnswers: prevData.games.audiochallenge.rightAnswers + rightAnswersIds.length,
              wrongAnswers: prevData.games.audiochallenge.wrongAnswers + wrongAnswersIds.length,
              wordList: [...prevData.games.audiochallenge.wordList, ...dailyGameNewWords],
            }
          : { ...prevData.games.audiochallenge };

      newData = {
        games: {
          audiochallenge: audiochallengeStat,
          sprint: prevData.games.sprint,
        },
        date: currentDate,
        allNewWordsCount: prevData.allNewWordsCount + dailyAllNewWords.length,
        allGamesRight: audiochallengeStat.rightAnswers + prevData.games.sprint.rightAnswers,
        allGamesWrong: audiochallengeStat.wrongAnswers + prevData.games.sprint.wrongAnswers,
        wordList: [...prevData.wordList, ...dailyAllNewWords],
      };
      userId
        ? localStorage.setItem(userKey, JSON.stringify(newData))
        : localStorage.setItem(guestKey, JSON.stringify(newData));
    } else if (currentDate !== prevData.date) {
      const audiochallengeStat =
        game === AUDIOCHALLENGE
          ? {
              bestStreak: currentStreak,
              gameNewWordsCount: dailyGameNewWords.length,
              rightAnswers: rightAnswersIds.length,
              wrongAnswers: wrongAnswersIds.length,
              wordList: [...prevData.games.audiochallenge.wordList, ...dailyGameNewWords],
            }
          : {
              ...prevData.games.audiochallenge,
              bestStreak: 0,
              gameWordsCount: 0,
              rightAnswers: 0,
              wrongAnswers: 0,
            };
      newData = {
        games: {
          audiochallenge: audiochallengeStat,
          sprint: prevData.games.sprint,
        },
        date: currentDate,
        allNewWordsCount: dailyAllNewWords.length,
        allGamesRight: rightAnswersIds.length + prevData.games.sprint.rightAnswers,
        allGamesWrong: wrongAnswersIds.length + prevData.games.sprint.wrongAnswers,
        wordList: [...prevData.wordList, ...dailyAllNewWords],
      };
      userId
        ? localStorage.setItem(userKey, JSON.stringify(newData))
        : localStorage.setItem(guestKey, JSON.stringify(newData));
    }
  } else {
    newData = setInitialLocalStatistic(
      rightAnswersIds,
      wrongAnswersIds,
      game,
      currentStreak,
      prevData
    );
    userId
      ? localStorage.setItem(userKey, JSON.stringify(newData))
      : localStorage.setItem(guestKey, JSON.stringify(newData));
  }
};

export const checkIsLearnedWord = (word: IWord) =>
  word.userWord &&
  word.userWord.optional &&
  word.userWord.optional.counter &&
  ((word.userWord.difficulty === 'easy' && word.userWord.optional.counter > 2) ||
    (word.userWord.difficulty === 'difficult' && word.userWord.optional.counter > 4));

export const getNotLearnedWords = (words: Array<IWord>) =>
  [...words].filter((el) => !checkIsLearnedWord(el));

export const isObjectEmpty = (obj: object) => {
  for (const _key in obj) {
    return false;
  }
  return true;
};

export const createNewUserWord = (
  // для создания 'пустого' объекта userWord
  wordId: string,
  isRight: boolean,
  gameName?: string,
  difficulty?: TDifficulty
) => {
  const counter = isRight ? 1 : 0;
  return {
    difficulty: difficulty || 'easy',
    optional: {
      wordId,
      counter,
      audiochallenge: {
        rightCounter: Number(gameName && gameName === AUDIOCHALLENGE && isRight) || 0,
        wrongCounter: Number(gameName && gameName === AUDIOCHALLENGE && !isRight) || 0,
      },
      sprint: {
        rightCounter: Number(gameName && gameName === 'sprint' && isRight) || 0,
        wrongCounter: Number(gameName && gameName === 'sprint' && !isRight) || 0,
      },
    },
  };
};

export const updateUserWordData = (
  // создание обновленного объекта UserWord после игры
  word: IWord,
  isRight: boolean,
  gameName: string
) => {
  if (!word.hasOwnProperty('userWord')) {
    const updatedUserWord = createNewUserWord(word._id!, isRight, gameName);
    return updatedUserWord;
  }
  if (word.userWord) {
    const { difficulty, optional } = word.userWord!;
    const { wordId } = optional;
    const updatedUserWord = {
      difficulty: difficulty || 'easy',
      optional: {
        wordId,
        counter: isRight ? optional.counter + 1 : 0,
        audiochallenge: optional.audiochallenge
          ? {
              rightCounter:
                gameName && gameName === AUDIOCHALLENGE && isRight
                  ? optional.audiochallenge.rightCounter + 1
                  : optional.audiochallenge.rightCounter,
              wrongCounter:
                gameName && gameName === AUDIOCHALLENGE && !isRight
                  ? optional.audiochallenge.wrongCounter + 1
                  : optional.audiochallenge.wrongCounter,
            }
          : {
              rightCounter: isRight ? 1 : 0,
              wrongCounter: !isRight ? 1 : 0,
            },
        sprint: optional.sprint
          ? optional.sprint
          : {
              rightCounter: 0,
              wrongCounter: 0,
            },
      },
    };
    return updatedUserWord;
  }
};

export const getWordsFromTextbookForUser = (
  // для авторизованного пользователя
  allWords: Array<IWord>,
  group: number,
  page: number,
  quantity: number
) => {
  const currentWords = allWords.filter(
    (el) => ((el.group === group && el.page <= page) || el.group < group) && !checkIsLearnedWord(el)
  );
  if (currentWords.length <= quantity) {
    return currentWords;
  }
  return currentWords.slice(-quantity);
};

export const getWordsByPageAndGroup = (allWords: Array<IWord>, group: number, page: number) =>
  [...allWords].filter((el) => el.group === group && el.page === page);

export const getAudioChallengeStatistics = () => {
  let statKey: string;
  let statistics: ILocalStatistic | undefined;
  const user = localStorage.getItem('authData');
  if (user) {
    statKey = `statistic-${JSON.parse(user).userId}`;
    statistics = JSON.parse(localStorage.getItem(statKey)!);
  }
  if (statistics) {
    statistics.games.audiochallenge.rightAnswers /= 2;
    statistics.games.audiochallenge.wrongAnswers /= 2;
    statistics.allGamesRight /= 2;
    statistics.allGamesWrong /= 2;
    return statistics;
  }
  return null;
};
