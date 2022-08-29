/* eslint-disable import/no-duplicates */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */
import { FC} from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../../redux/hooks';
import { setInitialChallengeState } from '../../../../redux/features/audioChallengeSlice';


import ResultsItem from '../ResultsItem';

import { StyledButton, StyledResultsTable, StyledRightAnswers, StyledWrongAnswers } from './ResultsTable.styles';

const ResultsTable: FC = () => {
  const { rightAnswers, wrongAnswers, bestGameStreak } = useTypedSelector(state => state.challenge);
  const rightAnswersPercent = (rightAnswers.length + wrongAnswers.length) > 0
    ? Math.round((rightAnswers.length / (rightAnswers.length + wrongAnswers.length)) * 100) : 0;


  const user = localStorage.getItem('authData');
  const dispatch = useTypedDispatch();


  const handleNextGameClick = () => {
    dispatch(setInitialChallengeState());
  }

  return (
    <StyledResultsTable>
      <p>{`You answered ${rightAnswersPercent}% correctly`}</p>
      {bestGameStreak > 0 && <p>{`Best answer series - ${bestGameStreak}`}</p>}
      <StyledWrongAnswers>Errors - <span>{wrongAnswers.length}</span></StyledWrongAnswers>
      {wrongAnswers.map(el => <ResultsItem key={el} index={el} />)}
      <StyledRightAnswers>Correct - <span>{rightAnswers.length}</span></StyledRightAnswers>
      {rightAnswers.map(el => <ResultsItem key={el} index={el} />)}
      <StyledButton onClick={(() => handleNextGameClick())}>Play again</StyledButton>
    </StyledResultsTable>
  )
}

export default ResultsTable;