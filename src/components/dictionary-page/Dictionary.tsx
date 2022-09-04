/* eslint-disable react/no-unescaped-entities */
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import DictionaryCard from './DictionaryCard/DictionaryCard'
import { IUserWordParams, IWord, IUserWordWithParams } from '../../types/types'
import RslangApi from '../../api/RslangApi'
import { getCurrentDate } from '../../utils'
import { IStatistic } from '../../types/auth-audio/IStatistic'
import { updateUserStatistics } from './DictionaryPage/utils'

const api = new RslangApi()
// const auth = localStorage.getItem('authData')

function EmptyList() {
  return <h1 style={{ textAlign: 'center' }}>It's empty yet</h1>
}

interface IDictionaryProps {
  words: IWord[] | IUserWordWithParams[]
  userWords: IUserWordParams[]
  updateUserWords: () => void
  learnCardsStyle: () => string
  allLearned: boolean
  statistic: IStatistic | {}
}

export default function Dictionary({
  words,
  userWords,
  updateUserWords,
  learnCardsStyle,
  allLearned,
  statistic,
}: IDictionaryProps) {

 

  const addDifficultWord = async (id: string) => {
    const isUserWord = userWords.find((uWord) => uWord.wordId === id)
    if (isUserWord) {
      const wordParams = { ...isUserWord }
      wordParams.difficulty = 'hard'
      wordParams.optional.learned = false
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
      wordParams.optional.data = new Date().toLocaleString().split(', ')[0]
      delete wordParams.id
      delete wordParams.wordId
      await api.updateUserWord(id, wordParams)
    } else {
      const wordParams = {
        difficulty: 'weak',
        optional: {
          learned: true,
          data: new Date().toLocaleString().split(', ')[0],
        },
      }
      await api.createUserWord(id, wordParams)
      await updateUserStatistics(statistic, 'add')
    }
    updateUserWords()
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
    updateUserWords()
    await updateUserStatistics(statistic, 'remove')
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
    updateUserWords()
  }


  return (
    <Box sx={{ width: '100%' }}>
      {words.length ? (
        <Grid container spacing={2}>
          {words.map((word) => (
            <Grid
              item
              sm={12}
              key={word.id}
              sx={{ paddingRight: '16px', width: '100%' }}
            >
              <Card sx={{ border: learnCardsStyle }}>
                <DictionaryCard
                  updateUserWords={updateUserWords}
                  allLearned={allLearned}
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
