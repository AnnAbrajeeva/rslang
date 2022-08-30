/* eslint-disable */
import { Button } from '@mui/material'
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  Fullscreen,
  VolumeOff,
  FullscreenExit,
  VolumeUp,
} from '@mui/icons-material'
import { IResult, IWord } from '../../../types/types'
import { useEffect } from 'react'
import { useState } from 'react'
import Timer from './Timer'
import Score from './Score'
import Indicators from './Indicators'
import RslangApi from '../../../api/RslangApi'
import Loader from '../../Loader/Loader'
const correctSound = new Audio(require('./sounds/correct.mp3'))
const wrongSound = new Audio(require('./sounds/wrong.mp3'))
const api = new RslangApi()

const SprintContainer = (props: {
  result: IResult[]
  setIsEnded: (arg0: boolean) => void
  level: number
  score: number
  setScore: Function
  page: number
}) => {
  let [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 20))
  let [iteration, setIteration] = useState(0)
  let [words, setWords] = useState<IWord[]>([])
  let [scoreIndicator, setScoreIndicator] = useState(0)
  let [toyIndicator, setToyIndicator] = useState(0)
  let [indicators, setIndicators] = useState({ 1: false, 2: false, 3: false })
  let [fullscreen, setFullscreen] = useState(false)
  const [volumeOff, setVolumeOff] = useState(false)

  useEffect(() => {
    let randomPage = Math.floor(Math.random() * 30)
    if (props.page !== -1) randomPage = props.page
    api.getAllWords(randomPage, props.level - 1).then((data) => setWords(data))
  }, [props.level, props.page])

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
    correctSound.pause()
    wrongSound.pause()
    correctSound.currentTime = 0
    wrongSound.currentTime = 0
  }

  function correctMatch() {
    if (!volumeOff) correctSound.play()
    setToyIndicator((prev) => (prev += 1))
    props.result.push({
      word: words[iteration].word,
      translation: words[iteration].wordTranslate,
      transcription: words[iteration].transcription,
      isCorrect: true,
      sound: words[iteration].audio,

      id: words[iteration].id,
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
    if (!volumeOff) wrongSound.play()
    setToyIndicator(0)
    setScoreIndicator(0)
    setIndicators({ 1: false, 2: false, 3: false })
    props.result.push({
      word: words[iteration].word,
      translation: words[iteration].wordTranslate,
      transcription: words[iteration].transcription,
      isCorrect: false,
      sound: words[iteration].audio,
      id: words[iteration].id,
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
      <div className="sprint-media-btns">
        {!fullscreen && (
          <Fullscreen
            fontSize="large"
            onClick={() => {
              if (document.documentElement.requestFullscreen) {
                setFullscreen(true)
                document.documentElement.requestFullscreen()
              }
            }}
          />
        )}
        {fullscreen && (
          <FullscreenExit
            fontSize="large"
            onClick={() => {
              if (document.exitFullscreen) {
                setFullscreen(false)
                document.exitFullscreen()
              }
            }}
          />
        )}
        &nbsp;
        {!volumeOff && (
          <VolumeUp
            fontSize="large"
            onClick={() => {
              setVolumeOff(true)
            }}
          />
        )}
        {volumeOff && (
          <VolumeOff
            fontSize="large"
            onClick={() => {
              setVolumeOff(false)
            }}
          />
        )}
      </div>
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
        {words.length !== 20 && <Loader />}
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
