/* eslint-disable */

import { Button, Grid, List, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Cancel, CheckCircle, VolumeUp } from '@mui/icons-material'
import { IResult, IUserWordParams } from '../../../types/types'
import RslangApi from '../../../api/RslangApi'
import { useEffect, useState } from 'react'
import {
  createNewUserWord,
  updateLocalStatisticSprint,
  updateWord,
} from './utils/updateStatistic'
const api = new RslangApi()
const user = JSON.parse(localStorage.getItem('authData') || '{}')

const ResultItem = (properties: { props: IResult }) => {
  const [userWords, setUserWords] = useState<IUserWordParams[]>()
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
  console.log(props.bestStreak)

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

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const words = await api.getWords()
        if (words) {
          props.result.forEach((el) => {
            const word = words.find(
              (item) => item.id === el.id
            )
            if (word && word.userWord) {  
              // @ts-ignore
              const newWord = updateWord(word, el.isCorrect, 'sprint')
              console.log(newWord)
              if (newWord) {
                api.updateUserWord(word.id!, newWord)
              }     
            } else {
              const newWord = createNewUserWord(el.id, el.isCorrect, 'sprint') 
              console.log('newWord', newWord)
              api.createUserWord(newWord.optional.wordId, newWord)
            }
          })
        }
      }
      fetchData()
    }
  }, [])

  return (
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
          Correct:&nbsp;<b style={{ color: '#2e7d32' }}>{correctWords}</b>{' '}
          &nbsp; Wrong:&nbsp;
          <b style={{ color: '#d32f2f' }}>{unCorrectWords}</b> &nbsp;
          Score:&nbsp;<b style={{ color: '#34568B' }}>{props.score}</b>&nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/games')}
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
  )
}
