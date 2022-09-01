/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Dictionary from '../Dictionary'
import LevelBox from '../LevelBox/LevelBox'
import Pagination from '../Pagination/Pagination'
import Loader from '../../Loader/Loader'
import './DictionaryPage.css'
import RslangApi from '../../../api/RslangApi'
import {
  IUserWordParams,
  IUserWordWithParams,
  IWord,
} from '../../../types/types'
import { useTypedSelector } from '../../../redux/hooks'
import Games from '../../Games page/Games'

const api = new RslangApi()
const auth = localStorage.getItem('authData')

export default function DictionaryPage() {
  const { authData } = useTypedSelector((state) => state.auth)

  const [words, setWords] = useState<IWord[] | IUserWordWithParams[]>([])
  // eslint-disable-next-line no-unused-vars
  const [userWords, setUserWords] = useState<IUserWordWithParams[]>([])
  const [wordsParams, setWordsParams] = useState<IUserWordParams[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(Number(localStorage.getItem('page')) || 0)
  const [group, setGroup] = useState(Number(localStorage.getItem('group')) || 0)
  const [allLearned, setAllLearned] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (!auth && !authData) {
        const res = await api.getAllWords(page, group)
        setWords(res)
      } else {
        const uWords = await api.getAllUserWordsWithParams(page, group)
        setWords(uWords)
        const response = await api.getAllUserWords()
        setWordsParams(response)
      }

      if (authData && group === 6) {
        const hardWords = await api.getAllHardWords()
        setWords(hardWords)
      }
      setLoading(false)
    }
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, group])

  const checkLearnedPage = (): boolean => 
  // eslint-disable-next-line consistent-return, array-callback-return
     (words as IUserWordWithParams[]).every((word) => {
      if (word.userWord) {
        return (
          word.userWord.difficulty === 'hard' ||
          word.userWord.optional.learned === true
        )
      }
    })
  

  useEffect(() => {
    if (auth) {
      setAllLearned(checkLearnedPage())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(words as IUserWordWithParams[])])

  // eslint-disable-next-line array-callback-return , consistent-return

  const updateUserWords = async () => {
    if (group === 6) {
      const hardWords = await api.getAllHardWords()
      setWords(hardWords)
    } else {
      const uWords = await api.getAllUserWordsWithParams(page, group)
      setWords(uWords)
      setAllLearned(checkLearnedPage())
    }
  }

  const changePage = (newPage: number) => {
    setPage(newPage - 1)
    localStorage.setItem('page', (newPage - 1).toString())
  }

  const changeLevel = (newGroup: number) => {
    setGroup(newGroup - 1)
    changePage(1)
    localStorage.setItem('group', (newGroup - 1).toString())
  }

  const learnedPageColor = () => {
    const color = allLearned && authData && group !== 6 ? '8px solid green' : ''
    return color
  }

  return (
    <div className="dictionary-page">
      <CssBaseline />
      <Container sx={{ paddingBottom: 5, paddingTop: 5 }}>
        <LevelBox changeLevel={changeLevel} group={group} />
        {loading ? (
          <Loader />
        ) : (
          <DictionaryContent
            learnCardsStyle={learnedPageColor}
            group={group}
            changePage={changePage}
            words={words}
            updateUserWords={updateUserWords}
            allLearned={allLearned}
            userWords={wordsParams}
          />
        )}
      </Container>
    </div>
  )
}

interface DictionaryGamesWrapperProps {
  disabled: boolean
  group: number
}

function DictionaryGamesWrapper({ disabled, group }: DictionaryGamesWrapperProps) {
  return (
    <div className={disabled && group !== 6 ? 'disabled' : ''}>
      <Games />
    </div>
  )
}

interface IDictionaryContentProps {
  words: IWord[] | IUserWordWithParams[]
  userWords: IUserWordParams[]
  changePage: (newPage: number) => void
  group: number
  updateUserWords: () => void
  learnCardsStyle: () => string
  allLearned: boolean
}

function DictionaryContent({
  words,
  changePage,
  group,
  updateUserWords,
  learnCardsStyle,
  allLearned,
  userWords,
}: IDictionaryContentProps) {
  return (
    <>
      <Box>
        <Dictionary
          updateUserWords={updateUserWords}
          words={words}
          userWords={userWords}
          learnCardsStyle={learnCardsStyle}
          allLearned={allLearned}
        />
      </Box>
      {group !== 6 && (
        <Pagination allLearned={allLearned} changePage={changePage} />
      )}
      {words.length > 0 && <DictionaryGamesWrapper group={group} disabled={allLearned} />}
    </>
  )
}
