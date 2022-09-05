/* eslint-disable */

import { Button, Grid, List, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Cancel, CheckCircle, VolumeUp } from '@mui/icons-material'
import { IResult } from '../../../types/types'
import RslangApi from '../../../api/RslangApi'
import { useEffect, useState } from 'react'
import {
  createNewUserWord,
  updateLocalStatisticSprint,
  updateWord,
} from './utils/updateStatistic'
import { prepareNewStatistic } from '../../../redux/features/statisticSlice/utils'
import { useTypedSelector } from '../../../redux/hooks'
import Loader from '../../Loader/Loader'
const api = new RslangApi()

const ResultItem = (properties: { props: IResult }) => {
  const props = properties.props

  const audio = new Audio(`https://rs-lang-base.herokuapp.com/${props.sound}`)

  return (
    <div className="result-item">
      <div>
        {props.isCorrect && <CheckCircle color="success" />}
        {!props.isCorrect && <Cancel color="error" />}
        &nbsp;
        <Typography variant="h6" component="div">
          {props.word} - {props.transcription} - {props.translation}
        </Typography>
      </div>
      <VolumeUp
        onClick={() => {
          audio.play()
        }}
      />
    </div>
  )
}

export default function Result(props: {
  result: IResult[]
  score: number
  bestStreak: number
}) {
  let correctWords = props.result.filter((el) => el.isCorrect).length
  let unCorrectWords = props.result.filter((el) => !el.isCorrect).length
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('authData') || '{}')
  const { authData } = useTypedSelector((state) => state.auth)
  const [resultWords, setResultWords] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const rightAnswersIds = props.result
    .filter((item) => item.isCorrect)
    .map((item) => item.id)
  const wrongAnswersIds = props.result
    .filter((item) => !item.isCorrect)
    .map((item) => item.id)

  updateLocalStatisticSprint(
    rightAnswersIds,
    wrongAnswersIds,
    'sprint',
    props.bestStreak,
    user.userId
  )
  let callFucntionOnce = 1

  useEffect(() => {
    if (callFucntionOnce === 1) {
      callFucntionOnce++
      if (user && authData) {
        const fetchData = async () => {
          const prevStat = (await api.getUserStatistics()) || {}
          const allLearnedWords = await api.getAllLearnedWords()
          const newStat = prepareNewStatistic(
            prevStat,
            [...rightAnswersIds, ...wrongAnswersIds],
            allLearnedWords.length
          )
          if (newStat) {
            await api.updateUserStatistics(newStat)
          }
          const words = await api.getWords()
          if (words) {
            props.result.forEach((el) => {
              const word = words.find((item) => item.id === el.id)
              if (word && word.userWord) {
                // @ts-ignore
                const newWord = updateWord(word, el.isCorrect, 'sprint')
                if (newWord) {
                  api.updateUserWord(word.id!, newWord).then((data) => {
                    setResultWords(
                      resultWords.push('done') as unknown as string[]
                    )
                    if (resultWords.length === 20) setShowResults(true)
                    console.log(resultWords)
                  })
                }
              } else {
                const newWord = createNewUserWord(el.id, el.isCorrect, 'sprint')
                api
                  .createUserWord(newWord.optional.wordId, newWord)
                  .then((data) => {
                    setResultWords(
                      resultWords.push('done') as unknown as string[]
                    )
                    if (resultWords.length === 20) setShowResults(true)
                    console.log(resultWords)
                  })
              }
            })
          }
        }
        fetchData()
      }
    }
  }, [])

  return (
    <>
      {localStorage.authData && (
        <>
          {showResults && (
            <div className="results">
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ mt: 4, mb: 2 }}
                  variant="h5"
                  component="div"
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Correct:&nbsp;
                  <b style={{ color: '#2e7d32' }}>{correctWords}</b> &nbsp;
                  Wrong:&nbsp;
                  <b style={{ color: '#d32f2f' }}>{unCorrectWords}</b> &nbsp;
                  Score:&nbsp;<b style={{ color: '#34568B' }}>{props.score}</b>
                  &nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(-1)}
                  >
                    Home
                  </Button>
                </Typography>
                <List>
                  {props.result.map((el, i) => (
                    <ResultItem props={el} key={i} />
                  ))}
                </List>
              </Grid>
            </div>
          )}
          {!showResults && <Loader />}
        </>
      )}
      {!localStorage.authData && (
        <>
          <div className="results">
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h5"
                component="div"
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Correct:&nbsp;
                <b style={{ color: '#2e7d32' }}>{correctWords}</b> &nbsp;
                Wrong:&nbsp;
                <b style={{ color: '#d32f2f' }}>{unCorrectWords}</b> &nbsp;
                Score:&nbsp;<b style={{ color: '#34568B' }}>{props.score}</b>
                &nbsp;
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                >
                  Home
                </Button>
              </Typography>
              <List>
                {props.result.map((el, i) => (
                  <ResultItem props={el} key={i} />
                ))}
              </List>
            </Grid>
          </div>
        </>
      )}
    </>
  )
}
