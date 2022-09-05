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
import { IResult, IUserWordWithParams, IWord } from '../../../types/types'
import { useEffect } from 'react'
import { useState } from 'react'
import Timer from './Timer'
import Score from './Score'
import Indicators from './Indicators'
import RslangApi from '../../../api/RslangApi'
import Loader from '../../Loader/Loader'
import { useTypedSelector } from '../../../redux/hooks'
const correctSound = new Audio(require('./sounds/correct.mp3'))
const wrongSound = new Audio(require('./sounds/wrong.mp3'))
const api = new RslangApi()

const auth = localStorage.getItem('authData')

const SprintContainer = (props: {
  result: IResult[]
  setIsEnded: (arg0: boolean) => void
  level: number
  score: number
  setScore: Function
  page: number
  increaseCount: () => void
  saveBestStreak: () => void
}) => {
  const { authData } = useTypedSelector((state) => state.auth)
  let [iteration, setIteration] = useState(0)
  let [words, setWords] = useState<IWord[] | IUserWordWithParams[] | []>([])
  let [randomNum, setRandomNum] = useState(Math.floor(Math.random() * words.length))
  let [scoreIndicator, setScoreIndicator] = useState(0)
  let [toyIndicator, setToyIndicator] = useState(0)
  let [indicators, setIndicators] = useState({ 1: false, 2: false, 3: false })
  let [fullscreen, setFullscreen] = useState(false)
  const [volumeOff, setVolumeOff] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let randomPage = Math.floor(Math.random() * 30)
    if (props.page !== -1) randomPage = props.page

    const fetchData = async () => {
      setLoading(true)
      if (!auth && !authData) {
        const res = await api.getAllWords(randomPage, props.level - 1)
        setWords(res)
      }
      if (auth && authData && props.level !== 7) {
        const res = await api.getAllUserWordsWithParams(
          randomPage,
          props.level - 1
        )
        let filterWords = res.filter((word) => {
          if(word.userWord && word.userWord.optional.learned === true) {
            return
          } else {
            return word
          }
        })
        let allWords
        if (filterWords.length < 20 && randomPage > 1) {
          const num = 20 - filterWords.length
          const res = await api.getAllUserWordsWithParams(
            randomPage -= 1,
            props.level - 1
          )
          allWords = filterWords.concat(res.splice(0, num))
        } else {
          allWords = filterWords
        }
        setWords(allWords)     
      }
      if (auth && authData && props.level === 7) {
        const res = await api.getAllHardWords()
        setWords(res)
      }
      setLoading(false)
    }
    fetchData()
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
    if (iteration === words.length-1) props.setIsEnded(true)
    props.saveBestStreak()
    setIteration((prev) => (prev += 1))
    if (Math.random() < 0.5) setRandomNum(iteration + 1)
    else setRandomNum(Math.floor(Math.random() * words.length))
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

      id: words[iteration].id!,
    })
    if (scoreIndicator !== 3) {
      setScoreIndicator((prev) => (prev += 1))
      setIndicators(checkIndicators(scoreIndicator + 1))
      props.setScore((prev: number) => (prev += (scoreIndicator + 1) * 5))
    } else {
      setIndicators(checkIndicators(scoreIndicator))
      props.setScore((prev: number) => (prev += scoreIndicator * 5))
    }
    props.increaseCount()
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
      id: words[iteration].id!,
    })
    props.saveBestStreak()
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
        {words.length > 0 && iteration <= words.length && (
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
        {loading && <Loader />}
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
