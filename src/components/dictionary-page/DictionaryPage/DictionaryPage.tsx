/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Dictionary from '../Dictionary'
import LevelBox from '../LevelBox/LevelBox'
import Pagination from '../Pagination/Pagination'
import DictionaryGames from '../DictionaryGames/DictionaryGames'
import Loader from '../../Loader/Loader'
import './DictionaryPage.css'
import RslangApi from '../../../api/RslangApi'
import { IUserWordParams, IWord } from '../../../types/types'
import { useTypedSelector } from '../../../redux/hooks'

export default function DictionaryPage(props: {
  // eslint-disable-next-line no-unused-vars
  setIsFooter: (arg0: boolean) => void
}) {
  const { setIsFooter } = props
  useEffect(() => setIsFooter(true), [setIsFooter])

  const api = new RslangApi()
  const { authData } = useTypedSelector((state) => state.auth)

  const [words, setWords] = useState<IWord[]>([])
  const [userWords, setUserWords] = useState<IUserWordParams[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(Number(localStorage.getItem('page')) || 0)
  const [group, setGroup] = useState(Number(localStorage.getItem('group')) || 0)
  const [allLearned, setAllLearned] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await api.getAllWords(page, group)
      if (authData || localStorage.getItem('authData')) {
        const uWords = await api.getAllUserWords()
        setUserWords(uWords)
        if (group === 6) {
          const hardWords = await api.getAllHardWords()
          setWords(hardWords)
        } else {
          setWords(res)
        }
      } else {
        setWords(res)
      }    
      setLoading(false)
    }
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, group])

  useEffect(() => {
    setAllLearned(checkLearnedPage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWords])

  const checkLearnedPage = () => {
    const userWordsId = userWords.map((word) => word.wordId)
    const wordsId = words.map((word) => word.id)
    return wordsId.every((id) => userWordsId.includes(id))
  }

  const updateUserWords = async () => {
    if (group === 6) {
      const hardWords = await api.getAllHardWords()
      setWords(hardWords)
    } else {
      const uWords = await api.getAllUserWords()
      setUserWords(uWords)
      setAllLearned(checkLearnedPage())
    }
  }

  const changePage = (newPage: number) => {
    setPage(newPage - 1)
    localStorage.setItem('page', (newPage - 1).toString())
  }

  const changeLevel = (newGroup: number) => {
    setGroup(newGroup-1)
    changePage(1)
    localStorage.setItem('group', (newGroup-1).toString())
  }

  const learnedPageColor = () => {
    const color = allLearned ? '8px solid green' : ''
    return color
  }

  return (
    <div className="dictionary-page">
      <CssBaseline />
      <Container sx={{ paddingBottom: 5, paddingTop: 5}}>
        <LevelBox changeLevel={changeLevel} group={group} />
        {loading ? (
          <Loader />
        ) : (
          <DictionaryContent
            learnCardsStyle={learnedPageColor}
            group={group}
            changePage={changePage}
            words={words}
            userWords={userWords}
            updateUserWords={updateUserWords}
            checkLearnedPage={checkLearnedPage}
          />
        )}
      </Container>
    </div>
  )
}

interface DictionaryGamesWrapperProps {
  disabled: boolean
}

function DictionaryGamesWrapper({disabled}: DictionaryGamesWrapperProps) {

  

  return (
    <div className={disabled ? 'disabled' : ''}>
      <DictionaryGames />
    </div>
  )
}

interface IDictionaryContentProps {
  words: IWord[]
  userWords: IUserWordParams[]
  changePage: (newPage: number) => void
  group: number
  updateUserWords: () => void
  learnCardsStyle: () => string
  checkLearnedPage: () => void
}

function DictionaryContent({
  words,
  changePage,
  userWords,
  group,
  updateUserWords,
  learnCardsStyle,
  checkLearnedPage
}: IDictionaryContentProps) {
  return (
    <>
      <Box>
        <Dictionary
          updateUserWords={updateUserWords}
          words={words}
          userWords={userWords}
          learnCardsStyle={learnCardsStyle}
          checkLearnedPage={checkLearnedPage}
        />
      </Box>
      {group !== 6 && <Pagination changePage={changePage} />}
      {words.length > 0 && <DictionaryGamesWrapper disabled={false} />}
    </>
  )
}
