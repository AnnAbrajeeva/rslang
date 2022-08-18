import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import { IWord } from '../../types/types'
import DictionaryCard from './DictionaryCard/DictionaryCard'

export default function Dictionary() {
  const [words, setWords] = useState<IWord[]>([])

  async function getWords() {
    const response = await fetch(
      `https://rs-lang-base.herokuapp.com/words?page=2&group=0`
    )
    const allWords = await response.json()
    setWords(allWords)
  }

  useEffect(() => {
    const fetchData = async () => {
      getWords()
    }
    fetchData()
  }, [])

  return (
    <Container>
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {words.map((word) => (
           <Grid item sm={12}>
           <Card >
            <DictionaryCard word={word} key={word.id} />
          </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
  )
}
