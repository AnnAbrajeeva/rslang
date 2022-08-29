import { Button, Grid, List, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Cancel, CheckCircle, VolumeUp } from '@mui/icons-material'
import { IResult } from '../../../types/types'

const ResultItem = (props: {
  word: string
  isCorrect: boolean
  translation: string
  sound: string
}) => {
  const audio = new Audio(`https://rs-lang-base.herokuapp.com/${props.sound}`)

  return (
    <div className="result-item">
      <div>
        {props.isCorrect && <CheckCircle color="success" />}
        {!props.isCorrect && <Cancel color="error" />}
        <Typography variant="h6" component="div">
          {props.word} - {props.translation}
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
            Go home
          </Button>
        </Typography>
        <List>
          {props.result.map((el, i) => (
            <ResultItem
              word={el.word}
              isCorrect={el.isCorrect}
              translation={el.translation}
              sound={el.sound}
              key={i}
            />
          ))}
        </List>
      </Grid>
    </div>
  )
}
