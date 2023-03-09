import React from 'react';
import { FC } from 'react';
import { useTypedSelector } from '../../../../redux/hooks';
import { ResultsItemProps } from './types';
import { StyledAudioIcon, StyledResultsItem } from './ResultsItem.styles';
import { BASE_URL } from '../../../../redux/thunks';

const ResultsItem: FC<ResultsItemProps> = ({ index }) => {
  const questions = useTypedSelector((state) => state.challenge.currentQuestionsSet);

  const item = questions.find((el) => el._id === index.toString());
  const word = item!.word;
  const translation = item!.wordTranslate;
  const audio = new Audio(`${BASE_URL}/${item!.audio}`);

  return (
    <StyledResultsItem>
      <>
        <StyledAudioIcon onClick={() => audio.play()} />
        <span>{word}</span> - <span>{translation}</span>
      </>
    </StyledResultsItem>
  );
};

export default ResultsItem;
