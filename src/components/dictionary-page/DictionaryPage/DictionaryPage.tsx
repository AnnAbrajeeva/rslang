import React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dictionary from '../Dictionary';
import LevelBox from '../LevelBox/LevelBox';
import Pagination from '../Pagination/Pagination';
import Loader from '../../Loader/Loader';
import './DictionaryPage.css';
import RslangApi from '../../../api/RslangApi';
import { IUserWordParams, IUserWordWithParams, IWord } from '../../../types/types';
import { useTypedSelector } from '../../../redux/hooks';
import Games from '../../Games page/Games';
import { IStatistic } from '../../../types/auth-audio/IStatistic';
import { addLearned, removeLearned } from './utils';

const api = new RslangApi();
const auth = localStorage.getItem('authData');

export default function DictionaryPage() {
  const { authData } = useTypedSelector((state) => state.auth);
  const [words, setWords] = useState<IWord[] | IUserWordWithParams[]>([]);
  const [wordsParams, setWordsParams] = useState<IUserWordParams[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number(localStorage.getItem('page')) || 0);
  const [group, setGroup] = useState(Number(localStorage.getItem('group')) || 0);
  const [allLearned, setAllLearned] = useState(false);
  const [statistic, setStatistic] = useState<IStatistic | Record<string, never>>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!auth && !authData) {
        const res = await api.getAllWords(page, group);
        setWords(res);
      } else {
        const uWords = await api.getAllUserWordsWithParams(page, group);
        setWords(uWords);
        const response = await api.getAllUserWords();
        setWordsParams(response);
      }
      if (authData && group === 6) {
        const hardWords = await api.getAllHardWords();
        setWords(hardWords);
      }
      setLoading(false);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, group]);

  useEffect(() => {
    if (auth && authData) {
      const fetchData = async () => {
        const userStatistic = await api.getUserStatistics();
        if (Object.keys(userStatistic).length !== 0) {
          setStatistic(userStatistic);
          (words as IUserWordWithParams[]).forEach((word) => {
            checkIsLearnedWord(word);
          });
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  const checkLearnedPage = (): boolean =>
    // eslint-disable-next-line consistent-return, array-callback-return
    (words as IUserWordWithParams[]).every((word) => {
      if (word.userWord) {
        return word.userWord.difficulty === 'hard' || word.userWord.optional.learned === true;
      }
    });

  useEffect(() => {
    if (auth && authData) {
      setAllLearned(checkLearnedPage());
      (words as IUserWordWithParams[]).forEach((word) => {
        checkIsLearnedWord(word);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words as IUserWordWithParams[]]);

  const updateUserWords = async () => {
    if (group === 6) {
      const hardWords = await api.getAllHardWords();
      setWords(hardWords);
    } else {
      const uWords = await api.getAllUserWordsWithParams(page, group);
      setWords(uWords);
      const userStatistic = await api.getUserStatistics();
      if (Object.keys(userStatistic).length !== 0) {
        setStatistic(userStatistic);
        uWords.forEach((word) => {
          checkIsLearnedWord(word);
        });
      }
      setAllLearned(checkLearnedPage());
    }
  };

  const changePage = (newPage: number) => {
    setPage(newPage - 1);
    localStorage.setItem('page', (newPage - 1).toString());
  };

  const changeLevel = (newGroup: number) => {
    setGroup(newGroup - 1);
    changePage(1);
    localStorage.setItem('group', (newGroup - 1).toString());
  };

  const learnedPageColor = () => {
    const color = allLearned && authData && group !== 6 ? '8px solid green' : '';
    return color;
  };

  const checkIsLearnedWord = async (word: IUserWordWithParams) => {
    if (auth && Object.keys(statistic).length !== 0 && word.userWord) {
      const rightCounterAudio =
        word.userWord && word.userWord.optional?.audiochallenge
          ? Number(word.userWord.optional?.audiochallenge?.rightCounter)
          : 0;

      const rightCounterSprint =
        word.userWord && word.userWord.optional?.sprint
          ? Number(word.userWord.optional?.sprint?.rightCounter)
          : 0;

      const wrongCounterAudio =
        word.userWord && (word as IUserWordWithParams).userWord.optional?.audiochallenge
          ? Number(word.userWord.optional?.audiochallenge?.wrongCounter)
          : 0;

      const wrongCounterSprint =
        word.userWord && word.userWord.optional?.sprint
          ? Number(word.userWord.optional?.sprint?.wrongCounter)
          : 0;

      const allRightCounter = rightCounterAudio + rightCounterSprint;
      const allWrongCounter = wrongCounterAudio + wrongCounterSprint;

      if (
        allRightCounter >= 3 &&
        word.userWord.difficulty !== 'hard' &&
        !word.userWord.optional.learned
      ) {
        await addLearned(word, statistic);
      } else if (allRightCounter >= 5 && word.userWord.difficulty === 'hard') {
        await addLearned(word, statistic);
      } else if (word.userWord.optional.learned && allWrongCounter > 0) {
        removeLearned(word, statistic);
      }
    }
    setAllLearned(checkLearnedPage());
  };

  return (
    <div className="dictionary-page">
      <CssBaseline />
      <Container sx={{ paddingBottom: 5, paddingTop: 5 }}>
        <LevelBox changeLevel={changeLevel} group={group} />
        {loading ? (
          <Loader />
        ) : (
          <DictionaryContent
            learnCardsStyle={learnedPageColor}
            group={group}
            changePage={changePage}
            words={words}
            updateUserWords={updateUserWords}
            allLearned={allLearned}
            userWords={wordsParams}
            statistic={statistic}
          />
        )}
      </Container>
    </div>
  );
}

interface DictionaryGamesWrapperProps {
  disabled: boolean;
  group: number;
}

function DictionaryGamesWrapper({ disabled, group }: DictionaryGamesWrapperProps) {
  return (
    <div className={disabled && group !== 6 ? 'disabled' : ''}>
      <Games />
    </div>
  );
}

interface IDictionaryContentProps {
  words: IWord[] | IUserWordWithParams[];
  userWords: IUserWordParams[];
  changePage: (newPage: number) => void;
  group: number;
  updateUserWords: () => void;
  learnCardsStyle: () => string;
  allLearned: boolean;
  statistic: IStatistic | Record<string, never>;
}

function DictionaryContent({
  words,
  changePage,
  group,
  updateUserWords,
  learnCardsStyle,
  allLearned,
  userWords,
  statistic,
}: IDictionaryContentProps) {
  return (
    <>
      <Box>
        <Dictionary
          updateUserWords={updateUserWords}
          words={words}
          userWords={userWords}
          learnCardsStyle={learnCardsStyle}
          allLearned={allLearned}
          statistic={statistic}
        />
      </Box>
      {group !== 6 && <Pagination allLearned={allLearned} changePage={changePage} />}
      {words.length > 0 && <DictionaryGamesWrapper group={group} disabled={allLearned} />}
    </>
  );
}
