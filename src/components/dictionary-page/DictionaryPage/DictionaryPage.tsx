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
import { IWord } from '../../../types/types'

export default function DictionaryPage(props: {
  // eslint-disable-next-line no-unused-vars
  setIsFooter: (arg0: boolean) => void
}) {
  const { setIsFooter } = props
  useEffect(() => setIsFooter(true), [setIsFooter])

  const api = new RslangApi()

  const [words, setWords] = useState<IWord[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(Number(localStorage.getItem('page')) || 0)
  const [group, setGroup] = useState(Number(localStorage.getItem('group')) || 1)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await api.getAllWords(page, group)
      setWords(res)
      setLoading(false)
    }
    fetchData()    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, group])    

  const changePage = (newPage: number) => {
    setPage(newPage-1)
    localStorage.setItem('page', (newPage-1).toString())
  }

  const changeLevel = (newGroup: number) => {
    setGroup(newGroup)
    changePage(1)
    localStorage.setItem('group', (newGroup).toString())
  }

  return (
    <div className="dictionary-page">
      <CssBaseline />
      <Container sx={{ paddingBottom: 5, paddingTop: 5 }}>
        <LevelBox changeLevel={changeLevel} group={group} />
        {loading ? (
          <Loader />
        ) : (
          <DictionaryContent changePage={changePage} words={words} />
        )}
      </Container>
    </div>
  )
}

interface IDictionaryContentProps {
  words: IWord[]
  changePage: (newPage: number) => void
}

function DictionaryContent({ words, changePage }: IDictionaryContentProps) {
  return (
    <>
      <Box>
        <Dictionary words={words} />
      </Box>
      <Pagination changePage={changePage} />
      <DictionaryGames />
    </>
  )
}
