/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Alert } from '@mui/material'
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from '@mui/icons-material'
import { IResult, IWord } from '../../../types/types'
import { useEffect } from 'react'
import { useState } from 'react'
import Timer from './Timer'
import Score from './Score'
import Indicators from './Indicators'

const SprintContainer = (props: {
  result: IResult[]
  setIsEnded: (arg0: boolean) => void
  level: number
  score: number
  setScore: Function
}) => {
  let [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 20))
  let [iteration, setIteration] = useState(0)
  let [words, setWords] = useState<IWord[]>([])
  let [scoreIndicator, setScoreIndicator] = useState(0)
  let [toyIndicator, setToyIndicator] = useState(0)
  let [indicators, setIndicators] = useState({ 1: false, 2: false, 3: false })
  let [wrongAlert, setWrongAlert] = useState(false)
  let [correctAlert, setCorrectAlert] = useState(false)

  useEffect(() => {
    fetch(
      `https://rs-lang-base.herokuapp.com/words?page=${Math.floor(
        Math.random() * 30
      )}&group=${props.level}`
    )
      .then((res) => res.json())
      .then((data) => setWords(data))
  }, [props.level])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') correctBtn()
    else if (e.key === 'ArrowLeft') wrongBtn()
  }

  function matchBtns() {
    if (iteration === 19) props.setIsEnded(true)
    setIteration((prev) => (prev += 1))
    if (Math.random() < 0.5) setRandomNum(iteration + 1)
    else setRandomNum(Math.floor(Math.random() * 20))
    setTimeout(() => {
      setCorrectAlert(false)
      setWrongAlert(false)
    }, 1000)
  }

  function correctMatch() {
    setCorrectAlert(true)
    setToyIndicator((prev) => (prev += 1))
    props.result.push({
      word: words[iteration].word,
      translation: words[iteration].wordTranslate,
      isCorrect: true,
    })
    if (scoreIndicator !== 3) {
      setScoreIndicator((prev) => (prev += 1))
      setIndicators(checkIndicators(scoreIndicator + 1))
      props.setScore((prev: number) => (prev += (scoreIndicator + 1) * 5))
    } else {
      setIndicators(checkIndicators(scoreIndicator))
      props.setScore((prev: number) => (prev += scoreIndicator * 5))
    }
  }

  function wrongMatch() {
    setWrongAlert(true)
    setToyIndicator(0)
    setScoreIndicator(0)
    setIndicators({ 1: false, 2: false, 3: false })
    props.result.push({
      word: words[iteration].word,
      translation: words[iteration].wordTranslate,
      isCorrect: false,
    })
  }

  function wrongBtn() {
    matchBtns()
    if (words[iteration].wordTranslate !== words[randomNum].wordTranslate) {
      correctMatch()
    } else {
      wrongMatch()
    }
  }

  function correctBtn() {
    matchBtns()
    if (words[iteration].wordTranslate === words[randomNum].wordTranslate) {
      correctMatch()
    } else {
      wrongMatch()
    }
  }

  return (
    <>
      {/* <div className="alert">
        {wrongAlert && (
          <Alert severity="error">
            <b>WRONG!</b>
          </Alert>
        )}
        {correctAlert && (
          <Alert severity="success">
            CORRECT!&nbsp;
            <b style={{ color: '#4caf50' }}>+{scoreIndicator * 5}</b>
          </Alert>
        )}
      </div> */}
      <div className="sprint-cont">
        {words.length === 20 && iteration !== 20 && (
          <>
            <div className="indicators">
              <Timer setIsEnded={props.setIsEnded} />
              <Indicators indicators={indicators} toyIndicator={toyIndicator} />
              <Score score={props.score} />
            </div>
            <div className="sprint-game-cont">
              <h1 className="word">{words[iteration].word}</h1>
              <h2 className="translation">{words[randomNum].wordTranslate}</h2>
              <div className="sprint-btns">
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<ArrowCircleLeftOutlined fontSize="large" />}
                  style={{ width: '150px' }}
                  onClick={() => wrongBtn()}
                >
                  Wrong
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<ArrowCircleRightOutlined fontSize="large" />}
                  style={{ width: '150px' }}
                  onClick={() => correctBtn()}
                >
                  Right
                </Button>
              </div>
            </div>
          </>
        )}
        {words.length !== 20 && (
          <>
            <h2>Loading...</h2>
          </>
        )}
      </div>
    </>
  )
}

export default SprintContainer

function checkIndicators(n: number) {
  let res = { 1: false, 2: false, 3: false }

  switch (n) {
    case 1:
      res = { 1: true, 2: false, 3: false }
      break
    case 2:
      res = { 1: true, 2: true, 3: false }
      break
    case 3:
      res = { 1: true, 2: true, 3: true }
      break
  }
  return res
}
