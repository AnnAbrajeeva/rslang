/* eslint-disable consistent-return */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-prototype-builtins */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import { ILocalStatistic } from '../types/auth-audio/ILocalStatistic';
import { TDifficulty } from '../types/auth-audio/IUserWord';
import { IWord } from '../types/auth-audio/IWord';
import AUDIOCHALLENGE from './constants';
import { TGetWordsByGroup } from './types';

export const shuffleArray = <T>(arr: Array<T>): Array<T> => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const getRandomValueFromArray = <T>(arr: Array<T>): T => arr[Math.floor(Math.random() * (arr.length - 1))];

export const getWordsByGroup: TGetWordsByGroup = (words, group) => words.filter((word) => word.group === group);

export const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

export const getNewWordsFromArray = (
  newDailyWords: Array<string>,
  allLearnedWords: Array<string>
) => {
  let result: Array<string> = [];
  [...newDailyWords].forEach((el) => {
    if (!allLearnedWords.includes(el)) result.push(el);
  });
  return result;
};

const setInitialLocalStatistic = (
  rightAnswersIds: Array<string>,
  wrongAnswersIds: Array<string>,
  game: string,
  currentStreak: number
) => {
  const allWordsList = [...rightAnswersIds, ...wrongAnswersIds];
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

  const newData: ILocalStatistic = {
    date: getCurrentDate(),
    allNewWordsCount: rightAnswersIds.length + wrongAnswersIds.length,
    allGamesRight: rightAnswersIds.length,
    allGamesWrong: wrongAnswersIds.length,
    wordList: allWordsList,
    games: {
      audiochallenge: audiochallengeStat,
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
  const prevStatistic = userStatistic || (!userId && guestStatistic
    ? guestStatistic
    : null);
  const currentDate = getCurrentDate();
  let newData: ILocalStatistic;
  if (prevStatistic) {
    const prevData = JSON.parse(prevStatistic);
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
                prevData.games.audiochallenge.gameNewWordsCount +
                dailyGameNewWords.length,
              rightAnswers:
                prevData.games.audiochallenge.rightAnswers +
                rightAnswersIds.length,
              wrongAnswers:
                prevData.games.audiochallenge.wrongAnswers +
                wrongAnswersIds.length,
              wordList: [
                ...prevData.games.audiochallenge.wordList,
                ...dailyGameNewWords,
              ],
            }
          : { ...prevData.games.audiochallenge };

      newData = {
        games: {
          audiochallenge: audiochallengeStat,
        },
        date: currentDate,
        allNewWordsCount: prevData.allNewWordsCount + dailyAllNewWords.length,
        allGamesRight:
          audiochallengeStat.rightAnswers,
        allGamesWrong:
          audiochallengeStat.wrongAnswers,
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
              wordList: [
                ...prevData.games.audiochallenge.wordList,
                ...dailyGameNewWords,
              ],
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
        },
        date: currentDate,
        allNewWordsCount: dailyAllNewWords.length,
        allGamesRight: rightAnswersIds.length,
        allGamesWrong: wrongAnswersIds.length,
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
      currentStreak
    );
    userId
      ? localStorage.setItem(userKey, JSON.stringify(newData))
      : localStorage.setItem(guestKey, JSON.stringify(newData));
  }
};

export const checkIsLearnedWord = (word: IWord) => (
    word.userWord &&
    word.userWord.optional &&
    word.userWord.optional.counter &&
    ((word.userWord.difficulty === 'easy' &&
      word.userWord.optional.counter > 2) ||
      (word.userWord.difficulty === 'difficult' &&
        word.userWord.optional.counter > 4))
  );

export const getNotLearnedWords = (words: Array<IWord>) => [...words].filter((el) => !checkIsLearnedWord(el));

export const isObjectEmpty = (obj: object) => {
  for (let _key in obj) {
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
        rightCounter:
          Number(gameName && gameName === AUDIOCHALLENGE && isRight) || 0,
        wrongCounter:
          Number(gameName && gameName === AUDIOCHALLENGE && !isRight) || 0,
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
  } if (word.userWord) {
    const { difficulty, optional } = word.userWord!;
    const { wordId } = optional;
    const updatedUserWord = {
      difficulty: difficulty || 'easy',
      optional: {
        wordId,
        counter: isRight ? optional.counter + 1 : 0,
        audiochallenge: {
          rightCounter:
            gameName && gameName === AUDIOCHALLENGE && isRight
              ? optional.audiochallenge.rightCounter + 1
              : optional.audiochallenge.rightCounter,
          wrongCounter:
            gameName && gameName === AUDIOCHALLENGE && !isRight
              ? optional.audiochallenge.wrongCounter + 1
              : optional.audiochallenge.wrongCounter,
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
    (el) =>
      ((el.group === group && el.page <= page) || el.group < group) &&
      !checkIsLearnedWord(el)
  );
  if (currentWords.length <= quantity) {
    return currentWords;
  } return currentWords.slice(-quantity);
};

export const getWordsByPageAndGroup = (
  allWords: Array<IWord>,
  group: number,
  page: number
) => [...allWords].filter((el) => el.group === group && el.page === page);
