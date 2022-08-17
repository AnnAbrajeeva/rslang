import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
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
      <div className="dictionary">
        <div>
          {words.map((word) => (
            <DictionaryCard word={word} />
          ))}
        </div>
      </div>
    </Container>
  )
}
