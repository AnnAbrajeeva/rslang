import { IWord } from '../../../types/types';
import { getRandomValueFromArray, shuffleArray } from '../../../utils';

const NUM_OF_ANSWER_OPTIONS = 5;

const getAnswers = (
    arr: Array<IWord>,
    currentAnswer: string
  ): Array<string> => {
    const answers = [currentAnswer];
   
    while (answers.length < NUM_OF_ANSWER_OPTIONS) {
      const randomAnswer = getRandomValueFromArray(
        [...arr].map((el) => el.wordTranslate)
      );
      if (!answers.includes(randomAnswer)) {
        answers.push(randomAnswer);
      }
    }
    return shuffleArray(answers);
  };
  

export default getAnswers;