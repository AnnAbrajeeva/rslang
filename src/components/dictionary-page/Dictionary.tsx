import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { IWord } from '../../types/types'
import DictionaryCard from './DictionaryCard/DictionaryCard'
import RslangApi from '../../api/RslangApi'

const api = new RslangApi()
api.signInUser({ email: 'aaa@aa.ru', password: '12345678' }).then((res) => {
  localStorage.setItem('user', JSON.stringify(res))
})
api.getUser('62ff50ac029b170016ae891e').then((res) => console.log(res))

export default function Dictionary() {
  const [words, setWords] = useState<IWord[]>([])

  async function getWords() {
    setWords([
      {
        audio: 'files/03_0041.mp3',
        audioExample: 'files/03_0041_example.mp3',
        audioMeaning: 'files/03_0041_meaning.mp3',
        group: 0,
        id: '5e9f5ee35eb9e72bc21af4c8',
        image: 'files/03_0041.jpg',
        page: 2,
        textExample: 'The <b>alien</b> came in peace.',
        textExampleTranslate: 'пришелец пришел с миром',
        textMeaning: 'An <i>alien</i> is a creature from a different world.',
        textMeaningTranslate: 'Инопланетянин - это существо из другого мира',
        transcription: '[éiljən]',
        word: 'alien',
        wordTranslate: 'инопланетянин',
      },
    ])
  }

  useEffect(() => {
    const fetchData = async () => {
      getWords()
    }
    fetchData()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {words.map((word) => (
          <Grid item sm={12} key={word.id}>
            <Card>
              <DictionaryCard word={word} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
