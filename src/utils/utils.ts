/* eslint-disable consistent-return */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-prototype-builtins */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */

import { TDifficulty } from '../types/IUserWord';
import { IWord } from '../types/IWord';
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
