/* eslint-disable import/no-unresolved */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import { FC, useEffect } from 'react';
import { useTypedSelector, useTypedDispatch } from '../../../../redux/hooks';
import { selectAnswer, submitAnswer } from '../../../../redux/features/audioChallengeSlice';
import Answer from '../Answer';

import {
  StyledAnswersWrapper,
  StyledChallengeCard,
  StyledButton,
  StyledRightAnswer,
  StyledQuestionWrapper,
} from './ChallengeCard.styles';
import MemoizedAudio from '../Audio';

const correctSound = require('../../../../assets/sounds/correct_answer.wav');
const wrongSound = require('../../../../assets/sounds/wrong.wav');

const ChallengeCard: FC = () => {
  const {
    currentQuestionsSet,
    currentQuestionIndex,
    currentAnswer,
    answers,
    isButtonsBlocked
  } = useTypedSelector(state => state.challenge);

  const correctAudio = new Audio(correctSound);
  const wrongAudio = new Audio(wrongSound);
  
  const dispatch = useTypedDispatch();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentAnswer) dispatch(submitAnswer());
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentAnswer]);

  const correctAnswer = currentQuestionsSet[currentQuestionIndex].wordTranslate;
  const question = currentQuestionsSet[currentQuestionIndex].word;


  const dispatchSelectAnswer = (answerText: string) => {
    if (!isButtonsBlocked) {
      if (correctAnswer === answerText) correctAudio.play();
      if (correctAnswer != answerText) wrongAudio.play();
      dispatch(selectAnswer(answerText));
    }
  }

  const handleNextClick = () => {
    dispatch(submitAnswer());
  }

  const handleDontKnowClick = () => {
    dispatchSelectAnswer('false');
  }

  return (
    <StyledChallengeCard>
      <StyledQuestionWrapper>
        <MemoizedAudio src={currentQuestionsSet[currentQuestionIndex].audio} />
        {currentAnswer && <StyledRightAnswer>{question}</StyledRightAnswer>}
      </StyledQuestionWrapper>
      <StyledAnswersWrapper>
        {answers.map((answer, index) =>
          <Answer
            key={index}
            value={index + 1}
            answerText={answer}
            correctAnswer={correctAnswer}
            currentAnswer={currentAnswer}
            onSelectAnswer={() => dispatchSelectAnswer(answer)}
          />)}
      </StyledAnswersWrapper>
      {currentAnswer && <StyledButton onClick={handleNextClick}>
        Go
      </StyledButton>}
      {!currentAnswer && <StyledButton onClick={handleDontKnowClick}>
      Don&apos;t know
      </StyledButton>}
    </StyledChallengeCard>
  );
};

export default ChallengeCard;