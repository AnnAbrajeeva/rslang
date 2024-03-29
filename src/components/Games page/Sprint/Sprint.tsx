import React from 'react';
import { IUserWordWithParams, IWord } from '../../../types/types';
import './sprint.css';
import SprintContainer from './SprintGameCont';
import { useState } from 'react';
import Result from './Result';
import LevelBox from '../../dictionary-page/LevelBox/LevelBox';
import { isGameBeforeDic } from '../Games';
import { useEffect } from 'react';

const Sprint = () => {
  const [isEnded, setIsEnded] = useState(false);
  const [result, setResult] = useState([]);
  const [level, setLevel] = useState(-1);
  const [page, setPage] = useState(-1);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(1);
  const [bestStreak, setBestStreak] = useState(1);
  let [words, setWords] = useState<IWord[] | IUserWordWithParams[] | []>([]);

  useEffect(() => {
    if (isGameBeforeDic) {
      setLevel(Number(localStorage.group) + 1);
      setPage(Number(localStorage.page));
    }
  }, []);

  function increaseCount() {
    setCount(count + 1);
  }

  function saveBestStreak() {
    if (bestStreak < count) {
      setBestStreak(count);
      setCount(0);
    }
    setCount(0);
  }

  return (
    <div className="sprint">
      {level !== -1 && (
        <>
          {!isEnded && result.length !== 20 && (
            <SprintContainer
              result={result}
              setIsEnded={setIsEnded}
              level={level}
              score={score}
              setScore={setScore}
              page={page}
              increaseCount={increaseCount}
              saveBestStreak={saveBestStreak}
              words={words}
              setWords={setWords}
            />
          )}
          {(isEnded || result.length === 20) && (
            <Result bestStreak={bestStreak} result={result} score={score} words={words} />
          )}
        </>
      )}
      {level === -1 && (
        <div className="levels">
          <LevelBox changeLevel={setLevel} group={level} />
        </div>
      )}
    </div>
  );
};

export default Sprint;
