/* eslint-disable */

import { FC, useEffect, useState } from 'react';
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

const correctSound = require('../../../../assets/sounds/correct_answer.mp3');
const wrongSound = require('../../../../assets/sounds/wrong.mp3');

const ChallengeCard: FC = () => {

    const [count, setCount] = useState(0);
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
        <MemoizedAudio  count={count} setcount={setCount} src={currentQuestionsSet[currentQuestionIndex].audio} />
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