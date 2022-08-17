import { useState } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { IWord } from '../../../types/types'
import './DictionaryCard.css'

interface DictionaryCardProps {
  word: IWord
}

export default function DictionaryCard({word}: DictionaryCardProps) {
  const [play, setPlay] = useState(false)
  const hardWordId = '5e9f5ee35eb9e72bc21af4a0'
  // const word: IWord = {
  //   id: '5e9f5ee35eb9e72bc21af4a0',
  //   group: 0,
  //   page: 0,
  //   word: 'alcohol',
  //   image: 'files/01_0002.jpg',
  //   audio: 'files/01_0002.mp3',
  //   audioMeaning: 'files/01_0002_meaning.mp3',
  //   audioExample: 'files/01_0002_example.mp3',
  //   textMeaning:
  //     '<i>Alcohol</i> is a type of drink that can make people drunk.',
  //   textExample:
  //     'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
  //   transcription: '[ǽlkəhɔ̀ːl]',
  //   textExampleTranslate:
  //     'Человек не должен водить машину после того, как он выпил алкоголь',
  //   textMeaningTranslate:
  //     'Алкоголь - это тип напитка, который может сделать людей пьяными',
  //   wordTranslate: 'алкоголь',
  // }

  const playSound = () => {
    setPlay((prev) => !prev)
    const audio = [
      `https://rs-lang-base.herokuapp.com/${word.audio}`,
      `https://rs-lang-base.herokuapp.com/${word.audioMeaning}`,
      `https://rs-lang-base.herokuapp.com/${word.audioExample}`,
    ]

    let index = 0
    const audioTrack = new Audio(audio[0])

    function playNext() {
        if (index < audio.length-1) {
          index += 1
          audioTrack.src = audio[index]
          audioTrack.load()
          audioTrack.play()
        } else {
          setPlay(false)
          audioTrack.removeEventListener('ended', playNext, false) 
        }
    }
    audioTrack.addEventListener('ended', playNext) 
    audioTrack.play()
  }
  

  return (
    <Card sx={{ maxWidth: 800 }}>
      <div className="card">
        <CardMedia
          component="img"
          sx={{ width: 251 }}
          image={`https://rs-lang-base.herokuapp.com/${word.image}`}
          alt={word.word}
        />
        <div className="card__descr">
          <div className="card__header">
            <div>
              <p className="card__word">
                {word.word} - {word.transcription}
              </p>
              <p className="card__translate">{word.wordTranslate}</p>
            </div>
            <div className="card__sound">
              <VolumeUpIcon
                onClick={playSound}
                className="card__sound-icon"
                fontSize="large"
                color={play ? 'success' : 'inherit'}
              />
              <audio src={`https://rs-lang-base.herokuapp.com/${word.audio}`}>
                <track kind="captions" />
              </audio>
              <audio
                src={`https://rs-lang-base.herokuapp.com/${word.audioMeaning}`}
              >
                <track kind="captions" />
              </audio>
              <audio
                src={`https://rs-lang-base.herokuapp.com/${word.audioExample}`}
              >
                <track kind="captions" />
              </audio>
            </div>
          </div>
          <CardContent>
            <Typography component="div" variant="body2" color="text.secondary">
              <p
                className="card__mean"
                dangerouslySetInnerHTML={{ __html: word.textMeaning }}
              />
              <p className="card__trans">{word.textMeaningTranslate}</p>
            </Typography>
            <hr />
            <Typography component="div" variant="body2" color="text.secondary">
              <p
                className="card__mean"
                dangerouslySetInnerHTML={{ __html: word.textExample }}
              />
              <p className="card__trans">{word.textExampleTranslate}</p>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant={hardWordId !== word.id ? 'outlined' : 'contained'}
              color="error"
              fullWidth
              endIcon={<ErrorOutlineIcon />}
            >
              Difficult word
            </Button>
            <Button
              variant={hardWordId !== word.id ? 'outlined' : 'contained'}
              color="success"
              fullWidth
              endIcon={<CheckCircleIcon />}
            >
              Learned
            </Button>
          </CardActions>
        </div>
      </div>
    </Card>
  )
}
