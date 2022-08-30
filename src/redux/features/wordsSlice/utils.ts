/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { IUserWord } from '../../../types/auth-audio/IUserWord';
import { IWord } from '../../../types/auth-audio/IWord';

export const combineAllWordsWithUserWords = (
  allWords: Array<IWord>,
  userWords: Array<IUserWord>
): Array<IWord> => {
  const userWordsData = [...userWords];
  const userWordsIds = userWordsData.map((el) => el.optional.wordId);
  const result = [...allWords].map((item) => {
    if (userWordsIds.indexOf(item._id!) !== -1) {
      item = {
        ...item,
        userWord: userWordsData.find((el) => el.optional.wordId === item._id),
      };
    }
    return item;
  });
  return result;
};
