import { IUserWord } from '../../../types/auth-audio/IUserWord';
import { IWord } from '../../../types/auth-audio/IWord';

export interface IChallengeState {
  isStartedFromTextbook: boolean;
  challengeLevel: string;
  currentQuestionsSet: Array<IWord>;
  currentQuestionIndex: number;
  allAnswers: Array<IWord>;
  answers: Array<string>;
  currentAnswer: string;
  rightAnswers: Array<string>;
  wrongAnswers: Array<string>;
  showResult: boolean;
  isChallengeStarted: boolean;
  isFetchingWords: boolean;
  fetchWordsError: null | string;
  results: Array<IUserWord>;
  currentRightStreak: number;
  bestGameStreak: number;
  isButtonsBlocked: boolean;
}
