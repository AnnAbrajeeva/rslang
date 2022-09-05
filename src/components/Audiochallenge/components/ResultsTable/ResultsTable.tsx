/* eslint-disable */
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserWordData } from '../../../../utils';
import { useTypedDispatch, useTypedSelector } from '../../../../redux/hooks';
import { postUserWord, sendStatistic, updateUserWord } from '../../../../redux/thunks';

import AUDIOCHALLENGE from '../../../../utils/constants';
import { IStatistic } from '../../../../types/auth-audio/IStatistic';
import { IUserWord } from '../../../../types/auth-audio/IUserWord';
import { IWord } from '../../../../types/auth-audio/IWord';
import { saveDailyResults, setInitialChallengeState } from '../../../../redux/features/audioChallengeSlice';
import { prepareNewStatistic } from '../../../../redux/features/statisticSlice/utils';



import ResultsItem from '../ResultsItem';

import { StyledButton, StyledResultsTable, StyledRightAnswers, StyledWrongAnswers } from './ResultsTable.styles';
import RslangApi from '../../../../api/RslangApi';
const api = new RslangApi()

const ResultsTable: FC = () => {
    const navigate = useNavigate();
    const { rightAnswers, wrongAnswers, bestGameStreak } = useTypedSelector(state => state.challenge);
    const rightAnswersPercent = (rightAnswers.length + wrongAnswers.length) > 0
        ? Math.round((rightAnswers.length / (rightAnswers.length + wrongAnswers.length)) * 100) : 0;
    const prevStatistic = useTypedSelector(state => state.statistic.statisticData);
    const allWords = useTypedSelector(state => state.words.allWords);
    const rightWords: Array<IWord> = [];
    const wrongWords: Array<IWord> = [];
    const learnedWords = (async() => {
        const learned = await api.getAllLearnedWords()
        return learned
    })

    rightAnswers.forEach(el => {
        rightWords.push(allWords.find(item => item._id === el)!);
    });
    wrongAnswers.forEach(el => {
        wrongWords.push(allWords.find(item => item._id === el)!);
    });

    const user = localStorage.getItem('authData');
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (user) {
            const userData = JSON.parse(user);
            const { userId } = userData;
            dispatch(saveDailyResults(userId));
            const newStatistic = prepareNewStatistic(prevStatistic, [...rightAnswers, ...wrongAnswers], learnedWords.length) as IStatistic;
            dispatch(sendStatistic({ userData, newStatistic }));
            rightWords.forEach((el) => {
                const newUserWord = updateUserWordData(el, true, AUDIOCHALLENGE) as IUserWord;
                !(el.hasOwnProperty('userWord'))
                    ? dispatch(postUserWord({ newUserWord, userData }))
                    : dispatch(updateUserWord({ newUserWord, userData }));
            });
            wrongWords.forEach((el) => {
                const newUserWord = updateUserWordData(el, false, AUDIOCHALLENGE) as IUserWord;
                !(el.hasOwnProperty('userWord'))
                    ? dispatch(postUserWord({ newUserWord, userData }))
                    : dispatch(updateUserWord({ newUserWord, userData }));
            });
        } else dispatch(saveDailyResults());
    }, [dispatch]);

    const handleNextGameClick = () => {
        dispatch(setInitialChallengeState());
        navigate('/games');
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