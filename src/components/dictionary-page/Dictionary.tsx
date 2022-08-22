import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import DictionaryCard from './DictionaryCard/DictionaryCard'
import { IUserWordParams, IWord } from '../../types/types'
import RslangApi from '../../api/RslangApi'

const api = new RslangApi()
api.signInUser({ email: 'aaa@aa.ru', password: '12345678' }).then((res) => {
  localStorage.setItem('user', JSON.stringify(res))
  console.log(res)
})

interface IDictionaryProps {
  words: IWord[]
  userWords: IUserWordParams[]
}

export default function Dictionary({ words, userWords }: IDictionaryProps) {
  const checkHardWord = (id: string) => {
    const userWord = userWords.find((uWord) => uWord.wordId === id)
    if (userWord && userWord.difficulty === 'hard') {
      return true
    }
    return false
  }

  const checkLearnedWord = (id: string) => {
    const userWord = userWords.find((uWord) => uWord.wordId === id)
    if (userWord && userWord.optional.learned === true) {
      return true
    }
    return false
  }

  const addDifficultWord = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
      const wordParams = { ...isUserWord }
      wordParams.difficulty = 'hard'
      wordParams.optional.learned = false
      wordParams.optional.studing = true
      await api.createUserWord(id, wordParams)
    } else {
      const wordParams = {
        difficulty: 'hard',
        optional: {
          studing: true,
          learned: false,
        },
      }
      await api.createUserWord(id, wordParams)
    }
  }

  const addLearnedWord = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
      const wordParams = { ...isUserWord }
      wordParams.difficulty = 'weak'
      wordParams.optional.learned = true
      wordParams.optional.studing = true
      await api.createUserWord(id, wordParams)
    } else {
      const wordParams = {
        difficulty: 'weak',
        optional: {
          studing: true,
          learned: true,
        },
      }
      await api.createUserWord(id, wordParams)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {words.map((word) => (
          <Grid item sm={12} key={word.id}>
            <Card>
              <DictionaryCard
                addLearnedWord={addLearnedWord}
                addDifficultWord={addDifficultWord}
                hardWord={checkHardWord(word.id)}
                learnedWord={checkLearnedWord(word.id)}
                word={word}
                key={word.id}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
