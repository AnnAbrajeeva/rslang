/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material'
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
  let [indicators, setIndicators] = useState({ 1: false, 2: false, 3: false })
  const correctSound = new Audio('./audio-files/correct.mp3')
  const wrongSound = new Audio('./audio-files/wrong.mp3')

  if (Math.random() < 0.5) setRandomNum(iteration)

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
    if (e.key === 'ArrowRight') correctMatch()
    else if (e.key === 'ArrowLeft') wrongMatch()
  }

  function matchBtns() {
    if (iteration === 19) props.setIsEnded(true)
    setIteration((prev) => (prev += 1))
    if (Math.random() < 0.5) setRandomNum(iteration)
    else setRandomNum(Math.floor(Math.random() * 20))
  }

  function wrongMatch() {
    if (words[iteration].wordTranslate !== words[randomNum].wordTranslate) {
      props.setScore(
        (prev: number) => (prev += (Math.floor(scoreIndicator / 3) + 1) * 5)
      )
      correctSound.play()
      setScoreIndicator((prev) => (prev += 1))
      setIndicators(checkIndicators(scoreIndicator + 1))
      props.result.push({
        word: words[iteration].word,
        translation: words[iteration].wordTranslate,
        isCorrect: true,
      })
    } else {
      wrongSound.play()
      setScoreIndicator((prev) => Math.floor(Math.abs(prev - 1) / 3) * 3)
      setIndicators({ 1: false, 2: false, 3: false })
      props.result.push({
        word: words[iteration].word,
        translation: words[iteration].wordTranslate,
        isCorrect: false,
      })
    }
    matchBtns()
  }

  function correctMatch() {
    if (words[iteration].wordTranslate === words[randomNum].wordTranslate) {
      props.setScore(
        (prev: number) => (prev += (Math.floor(scoreIndicator / 3) + 1) * 5)
      )
      correctSound.play()
      setScoreIndicator((prev) => (prev += 1))
      setIndicators(checkIndicators(scoreIndicator + 1))
      props.result.push({
        word: words[iteration].word,
        translation: words[iteration].wordTranslate,
        isCorrect: true,
      })
    } else {
      wrongSound.play()
      setScoreIndicator((prev) => Math.floor(Math.abs(prev - 1) / 3) * 3)
      setIndicators({ 1: false, 2: false, 3: false })
      props.result.push({
        word: words[iteration].word,
        translation: words[iteration].wordTranslate,
        isCorrect: false,
      })
    }
    matchBtns()
  }

  return (
    <div className="sprint-cont">
      {words.length === 20 && iteration !== 20 && (
        <>
          <div className="time-score">
            <Timer setIsEnded={props.setIsEnded} />
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
                onClick={() => wrongMatch()}
              >
                Wrong
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<ArrowCircleRightOutlined fontSize="large" />}
                style={{ width: '150px' }}
                onClick={() => correctMatch()}
              >
                Right
              </Button>
            </div>
          </div>
          <div className="indicators">
            <Indicators indicators={indicators} />
          </div>
          <audio src="./audio-files/correct.mp3"></audio>
        </>
      )}
      {words.length !== 20 && (
        <>
          <h2>Loading...</h2>
        </>
      )}
    </div>
  )
}

export default SprintContainer

function checkIndicators(n: number) {
  if (n % 3 !== 0) {
    let res = n + 3 - (Math.floor(n / 3) + 1) * 3
    if (res === 2) return { 1: true, 2: true, 3: false }
    else if (res === 1) return { 1: true, 2: false, 3: false }
  } else if (n === 3) {
    return { 1: true, 2: true, 3: true }
  }
  return { 1: false, 2: false, 3: false }
}
