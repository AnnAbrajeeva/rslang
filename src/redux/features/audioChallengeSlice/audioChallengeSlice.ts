/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../types/types';
import { updateLocalStatistic } from '../../../utils';
import AUDIOCHALLENGE from '../../../utils/constants';
import { IChallengeState } from './types';
import getAnswers from './utils';

export const NUM_OF_ANSWER_OPTIONS = 5;
export const NUM_OF_QUESTIONS = 10;

const initialState: IChallengeState = {
  isStartedFromTextbook: false,
  challengeLevel: '',
  currentQuestionsSet: [],
  currentQuestionIndex: 0,
  allAnswers: [],
  answers: [],
  currentAnswer: '',
  rightAnswers: [],
  wrongAnswers: [],
  showResult: false,
  isChallengeStarted: false,
  isFetchingWords: false,
  fetchWordsError: null,
  results: [],
  currentRightStreak: 0,
  bestGameStreak: 0,
  isButtonsBlocked: false,
};

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    setGameFromTextbook(state) {
      state.isStartedFromTextbook = true;
    },
    setAnswersSet(state, action: PayloadAction<IWord[]>) {
      state.allAnswers = action.payload;
    },
    setWordsByLevel(state, action: PayloadAction<IWord[]>) {
      state.currentQuestionsSet = action.payload;
      state.answers = getAnswers(
        state.allAnswers,
        state.currentQuestionsSet[state.currentQuestionIndex].wordTranslate
      );
    },
    startChallenge(state) {
      state.isChallengeStarted = true;
    },
    startChallengeByLevel(state, action: PayloadAction<string>) {
      state.challengeLevel = action.payload;
      state.isChallengeStarted = true;
    },
    selectAnswer(state, action: PayloadAction<string>) {
      state.isButtonsBlocked = true;
      if (
        action.payload ===
        state.currentQuestionsSet[state.currentQuestionIndex].wordTranslate
      ) {
        state.rightAnswers.push(
          state.currentQuestionsSet[state.currentQuestionIndex]._id!
        );
        state.currentRightStreak++;
      } else {
        state.wrongAnswers.push(
          state.currentQuestionsSet[state.currentQuestionIndex]._id!
        );
        if (state.currentRightStreak > state.bestGameStreak)
          state.bestGameStreak = state.currentRightStreak;
        state.currentRightStreak = 0;
      }
      state.currentAnswer = action.payload;
    },
    submitAnswer(state) {
      if (state.currentQuestionIndex < state.currentQuestionsSet.length - 1) {
        state.currentAnswer = '';
        state.currentQuestionIndex++;
        state.answers = getAnswers(
          state.allAnswers,
          state.currentQuestionsSet[state.currentQuestionIndex].wordTranslate
        );
        state.isButtonsBlocked = false;
      } else {
        state.currentAnswer = '';
        if (state.currentRightStreak > state.bestGameStreak)
          state.bestGameStreak = state.currentRightStreak;
        state.showResult = true;
      }
    },
    saveDailyResults(state, action: PayloadAction<string | undefined>) {
      updateLocalStatistic(
        state.rightAnswers,
        state.wrongAnswers,
        AUDIOCHALLENGE,
        state.bestGameStreak,
        action.payload
      );
    },
    setInitialChallengeState(state) {
      return (state = { ...initialState });
    },
  },
  extraReducers: {},
});

export const {
  setGameFromTextbook,
  setAnswersSet,
  startChallenge,
  startChallengeByLevel,
  selectAnswer,
  submitAnswer,
  saveDailyResults,
  setInitialChallengeState,
  setWordsByLevel,
} = challengeSlice.actions;

export default challengeSlice.reducer;
