import React from 'react';
import { FC } from 'react';
import { Wrapper, StyledButtonsRow } from './LevelPicker.styles';
import { useTypedDispatch, useTypedSelector } from '../../../../redux/hooks';
import { getWordsByGroup, shuffleArray } from '../../../../utils';
import {
  NUM_OF_QUESTIONS,
  setAnswersSet,
  setWordsByLevel,
  startChallengeByLevel,
} from '../../../../redux/features/audioChallengeSlice';

const LevelPicker: FC = () => {
  const challengeLevels = [
    'Beginner',
    'Pre-Intermediate',
    'Intermediate',
    'Upper-Intermediate',
    'Advanced',
    'Profiency',
  ];
  const { allWords } = useTypedSelector((state) => state.words);
  const dispatch = useTypedDispatch();

  const onSubmitLevel = (level: number) => {
    const levelWords = getWordsByGroup(allWords, level);
    const gameSet = shuffleArray(levelWords).slice(0, NUM_OF_QUESTIONS);
    dispatch(setAnswersSet(levelWords));
    dispatch(setWordsByLevel(gameSet));
    dispatch(startChallengeByLevel(level.toString()));
  };
  return (
    <Wrapper>
      <h2>Choose your English level:</h2>
      <StyledButtonsRow>
        {challengeLevels.map((el) => (
          <div key={el} onClick={() => onSubmitLevel(challengeLevels.indexOf(el))}>
            {el}
          </div>
        ))}
      </StyledButtonsRow>
    </Wrapper>
  );
};

export default LevelPicker;
