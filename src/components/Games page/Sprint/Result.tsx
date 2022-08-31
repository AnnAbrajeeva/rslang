import { Button, Grid, List, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Cancel, CheckCircle, VolumeUp } from '@mui/icons-material'
import { IResult } from '../../../types/types'
import RslangApi from '../../../api/RslangApi'
import { useEffect } from 'react'
const api = new RslangApi()

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
            if (
              data.wordId &&
              data.optional.correctGuess &&
              data.optional.wrongGuess
            ) {
              if (props.isCorrect) {
                api.updateUserWord(data.wordId, {
                  difficulty: data.difficulty,
                  optional: {
                    correctGuess: data.optional.correctGuess + 1,
                    isNewWord: false,
                    guessTime: Date.now(),
                  },
                })
              } else if (!props.isCorrect) {
                api.updateUserWord(data.wordId, {
                  difficulty: data.difficulty,
                  optional: {
                    wrongGuess: data.optional.wrongGuess + 1,
                    isNewWord: false,
                    guessTime: Date.now(),
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
                  correctGuess: 1,
                  guessTime: Date.now(),
                  isNewWord: true,
                },
              })
            } else if (!props.isCorrect) {
              api.createUserWord(props.id, {
                difficulty: 'weak',
                optional: {
                  wrongGuess: 1,
                  guessTime: Date.now(),
                  isNewWord: true,
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

export default function Result(props: { result: IResult[]; score: number }) {
  let correctWords = props.result.filter((el) => el.isCorrect).length
  let unCorrectWords = props.result.filter((el) => !el.isCorrect).length
  const navigate = useNavigate()

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
