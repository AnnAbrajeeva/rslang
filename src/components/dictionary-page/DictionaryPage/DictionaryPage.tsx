import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Dictionary from '../Dictionary'
import './DictionaryPage.css'
import LevelBox from '../LevelBox/LevelBox'
import Pagination from '../Pagination/Pagination'
import DictionaryGames from '../DictionaryGames/DictionaryGames'

// eslint-disable-next-line no-unused-vars
export default function DictionaryPage(props: { setIsFooter: (arg0: boolean) => void }) {
  const {setIsFooter} = props
  useEffect(() => setIsFooter(true), [setIsFooter])
  
  
  return (
    <div className="dictionary-page">
      <CssBaseline />
      <Container sx={{ paddingBottom: 5, paddingTop: 5}}>
        <LevelBox />
        <Box>
          <Dictionary />
        </Box>
        <Pagination />
        <DictionaryGames />
      </Container>
    </div>
  )
}
