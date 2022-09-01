/* eslint-disable */

import { Button, Grid, List, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Cancel, CheckCircle, VolumeUp } from '@mui/icons-material'
import { IResult } from '../../../types/types'
import RslangApi from '../../../api/RslangApi'
import { useEffect } from 'react'
import { updateLocalStatisticSprint } from './utils/updateStatistic'
const api = new RslangApi()
const user = JSON.parse(localStorage.getItem('authData') || '{}')

const ResultItem = (properties: { props: IResult }) => {
  const props = properties.props
  let callFunctionOnce = 1

  useEffect(() => {
    if (callFunctionOnce === 1) {
      callFunctionOnce++

      if (localStorage.authData) {
        api
          .getUserWord(props.id)
          .then((data) => {
            if (data.wordId) {
              if (props.isCorrect) {
                api.updateUserWord(data.wordId, {
                  difficulty: data.difficulty,
                  optional: {
                    data: new Date().toLocaleDateString(),
                  },
                })
              } else if (!props.isCorrect) {
                api.updateUserWord(data.wordId, {
                  difficulty: data.difficulty,
                  optional: {
                    data: new Date().toLocaleDateString(),
                  },
                })
              }
            }
          })
          .catch((err) => {
            if (props.isCorrect) {
              api.createUserWord(props.id, {
                difficulty: 'weak',
                optional: {
                  data: new Date().toLocaleDateString(),
                },
              })
            } else if (!props.isCorrect) {
              api.createUserWord(props.id, {
                difficulty: 'weak',
                optional: {
                  data: new Date().toLocaleDateString(),
                },
              })
            }
          })
      }
    }
  }, [props.id, props.isCorrect])

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

  console.log(user.id)
  updateLocalStatisticSprint(
    rightAnswersIds,
    wrongAnswersIds,
    'sprint',
    props.bestStreak,
    user.userId
  )

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
