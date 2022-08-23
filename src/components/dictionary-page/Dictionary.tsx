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
  updateUserWords: () => void
}

export default function Dictionary({ words, userWords, updateUserWords }: IDictionaryProps) {
  const addDifficultWord = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
      const wordParams = { ...isUserWord }
      wordParams.difficulty = 'hard'
      wordParams.optional.learned = false
      wordParams.optional.studing = true
      delete wordParams.id
      delete wordParams.wordId
      await api.updateUserWord(id, wordParams)
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
      delete wordParams.id
      delete wordParams.wordId
      await api.updateUserWord(id, wordParams)
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

  const removeFromLearned = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
    const wordParams = { ...isUserWord }
      wordParams.optional.learned = false
      delete wordParams.id
      delete wordParams.wordId
      await api.updateUserWord(id, wordParams)
    }
  }

  const removeFromHard = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
    const wordParams = { ...isUserWord }
      wordParams.difficulty = 'weak'
      delete wordParams.id
      delete wordParams.wordId
      await api.updateUserWord(id, wordParams)
    }
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {words.map((word) => (
          <Grid item sm={12} key={word.id}>
            <Card>
              <DictionaryCard
                updateUserWords={updateUserWords}
                infoWord={userWords}
                addLearnedWord={addLearnedWord}
                removeFromLearned={removeFromLearned}
                removeFromHard={removeFromHard}
                addDifficultWord={addDifficultWord}
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
