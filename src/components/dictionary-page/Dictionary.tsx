/* eslint-disable react/no-unescaped-entities */
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import DictionaryCard from './DictionaryCard/DictionaryCard'
import { IUserWordParams, IWord } from '../../types/types'
import RslangApi from '../../api/RslangApi'

const api = new RslangApi()
// api.signInUser({ email: 'aaa@aa.ru', password: '12345678' }).then((res) => {
//   localStorage.setItem('user', JSON.stringify(res))
//   console.log(res)
// })

function EmptyList() {
  return <h1 style={{ textAlign: 'center' }}>It's empty yet</h1>
}

interface IDictionaryProps {
  words: IWord[]
  userWords: IUserWordParams[]
  updateUserWords: () => void
  learnCardsStyle: () => string
  checkLearnedPage: () => void
}

export default function Dictionary({
  words,
  userWords,
  updateUserWords,
  learnCardsStyle,
  checkLearnedPage
}: IDictionaryProps) {
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
          learned: false,
        },
      }
      await api.createUserWord(id, wordParams)
    }
    updateUserWords()
  }

  const addLearnedWord = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
      const wordParams = { ...isUserWord }
      wordParams.difficulty = 'weak'
      wordParams.optional.learned = true
      delete wordParams.id
      delete wordParams.wordId
      await api.updateUserWord(id, wordParams)
    } else {
      const wordParams = {
        difficulty: 'weak',
        optional: {
          learned: true,
        },
      }
      await api.createUserWord(id, wordParams)
    }
    updateUserWords()
  }

  const removeFromLearned = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
      api.deleteUserWord(isUserWord.wordId!)
    }
    updateUserWords()
  }

  const removeFromHard = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
      api.deleteUserWord(isUserWord.wordId!)
    }
    updateUserWords()
  }

  return (
    <Box sx={{ width: '100%'}}>
      {words.length ? (
        <Grid container spacing={2}>
          {words.map((word) => (
            <Grid item sm={12} key={word.id} sx={{ paddingRight: '16px', width: '100%' }}>
              <Card sx={{ border: learnCardsStyle}}>
                <DictionaryCard
                  updateUserWords={updateUserWords}
                  checkLearnedPage={checkLearnedPage}
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
      ) : (
        <EmptyList />
      )}
    </Box>
  )
}
