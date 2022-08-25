import { useState } from 'react'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useTypedSelector } from "../../../redux/hooks";
import { IUserWordParams, IWord } from '../../../types/types'
import './DictionaryCard.css'

interface DictionaryCardProps {
  word: IWord
  addDifficultWord: (id: string) => void
  addLearnedWord: (id: string) => void
  removeFromLearned: (id: string) => void
  removeFromHard: (id: string) => void
  infoWord: IUserWordParams[]
  updateUserWords: () => void
  checkLearnedPage: () => void
}

export default function DictionaryCard({
  word,
  addDifficultWord,
  addLearnedWord,
  removeFromLearned,
  removeFromHard,
  infoWord,
  updateUserWords,
  checkLearnedPage
}: DictionaryCardProps) {
  const wordInfo = infoWord.find((uWord) => uWord.wordId === word.id)
  const [play, setPlay] = useState(false)
  const [hard, setHard] = useState(wordInfo?.difficulty === 'hard')
  const [learned, setLearned] = useState(wordInfo?.optional.learned)
  const { authData } = useTypedSelector(state => state.auth);
  
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
      if (index < audio.length - 1) {
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

  const addToDifficult = async (id: string) => {
    if (hard) {
      removeFromHard(id)
      setHard(false)
    } else {
      setLearned(false)
      addDifficultWord(id)
      setHard(true)
    }
  }

  const addToLearned = async (id: string) => {
    if (learned === true) {
      await removeFromLearned(id)
      setLearned(false)
    } else {
      setLearned(true)
      setHard(false)
      await addLearnedWord(id)
    }
  }

  return (
    <div className="card">
      <div className="card__header-bcg" />
      <CardMedia
        className="card__img"
        component="img"
        sx={{ width: 251 }}
        image={`https://rs-lang-base.herokuapp.com/${word.image}`}
        alt={word.word}
      />
      <div className="card__descr">
        <div className="card__header">
          <div>
            <p className="card__word">
              {word.word} - {word.transcription} - {word.wordTranslate}
            </p>
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
        {authData && <CardActions>
          <Button
            onClick={() => addToDifficult(word.id)}
            variant={!hard ? 'outlined' : 'contained'}
            color="error"
            fullWidth
            endIcon={<ErrorOutlineIcon />}
          >
            Difficult word
          </Button>
          <Button
            onClick={() => addToLearned(word.id)}
            variant={!learned ? 'outlined' : 'contained'}
            color="success"
            fullWidth
            endIcon={<CheckCircleIcon />}
          >
            Learned
          </Button>
        </CardActions>}
      </div>
    </div>
  )
}
