import React from 'react';
import { FC, useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../../redux/hooks';
import { AnswerProps } from './types';
import StyledAnswer from './Answer.styles';
import { selectAnswer } from '../../../../redux/features/audioChallengeSlice';

const Answer: FC<AnswerProps> = ({
  value,
  answerText,
  currentAnswer,
  correctAnswer,
  onSelectAnswer,
}) => {
  const isCorrect = Boolean(currentAnswer && answerText === correctAnswer);
  const isWrong = Boolean(currentAnswer === answerText && currentAnswer !== correctAnswer);
  const isButtonsBlocked = useTypedSelector((state) => state.challenge.isButtonsBlocked);
  const dispatch = useTypedDispatch();

  const correctAudio = new Audio('../../../../assets/sounds/correct_answer.mp3');
  const wrongAudio = new Audio('../../../../assets/sounds/wrong.mp3');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (Number(e.key) === value && !isButtonsBlocked) {
        if (correctAnswer === answerText) correctAudio.play();
        if (correctAnswer != answerText) wrongAudio.play();
        dispatch(selectAnswer(answerText));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [answerText, isButtonsBlocked]);

  return (
    <StyledAnswer
      isCorrectAnswer={isCorrect}
      isWrongAnswer={isWrong}
      isDisabled={isButtonsBlocked}
      onClick={() => onSelectAnswer(answerText)}
    >
      {`${value}. ${answerText}`}
    </StyledAnswer>
  );
};

export default Answer;
