/* eslint-disable */
import { FC, useEffect} from 'react';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { fetchAllWords, fetchUserWords, getStatistic } from '../../redux/thunks';
import { NUM_OF_QUESTIONS, setAnswersSet, setInitialChallengeState, setWordsByLevel, startChallenge } from '../../redux/features/audioChallengeSlice';
import ChallengeCard from './components/ChallengeCard';
import ResultsTable from './components/ResultsTable';
import { StyledAlert, Wrapper } from './Audiochallenge.styles';
import { getWordsByPageAndGroup, getWordsFromTextbookForUser, shuffleArray } from '../../utils';
import LevelPicker from './components/LevelPicker';
import Loader from '../Loader/Loader';
import { isGameBeforeDic as isStartedFromTextbook } from '../Games page/Games';

const Audiochallenge: FC = () => {
  const { isChallengeStarted, showResult, currentQuestionsSet } = useTypedSelector(state => state.challenge);
  const { fetchAllWordsFulfilled, allWords } = useTypedSelector(state => state.words);
  const group = localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0;
  const page = localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0;
  const dispatch = useTypedDispatch();
  const user = localStorage.getItem('authData');
  const isShowLevel = !isStartedFromTextbook && !isChallengeStarted && !showResult && fetchAllWordsFulfilled;
  
  useEffect(() => {
    if (!user) {
      const startGame = async () => {
        await dispatch(fetchAllWords());
        if (isStartedFromTextbook) {
          dispatch(setAnswersSet(allWords));
          const currentWords = shuffleArray(getWordsByPageAndGroup(allWords, group, page)).slice(NUM_OF_QUESTIONS);
          await dispatch(setWordsByLevel(currentWords));
          dispatch(startChallenge());
        }
      }
      startGame();
    }

    if (user) {
      dispatch(getStatistic(JSON.parse(user)));
      const startGame = async () => {
        await dispatch(fetchAllWords());
        await dispatch(fetchUserWords(JSON.parse(user)));
        if (isStartedFromTextbook) {
          dispatch(setAnswersSet(allWords));
          const currentWords = getWordsFromTextbookForUser(allWords, group, page, NUM_OF_QUESTIONS);
          dispatch(setWordsByLevel(currentWords));
          dispatch(startChallenge());
        }
      };
      startGame();
    }
  }, []);

  useEffect(() => () => {
    dispatch(setInitialChallengeState());
  }, []);

  return (
    <Wrapper>
      {!fetchAllWordsFulfilled && <Loader/>}
      {isChallengeStarted && !currentQuestionsSet.length && <StyledAlert severity="info">Words for the game are not found. Restart the game.</StyledAlert>}
      {isShowLevel && <LevelPicker />}
      {fetchAllWordsFulfilled && isChallengeStarted && !showResult && currentQuestionsSet.length && <ChallengeCard />}
      {showResult && <ResultsTable />}
    </Wrapper>
  );
};

export default Audiochallenge;
