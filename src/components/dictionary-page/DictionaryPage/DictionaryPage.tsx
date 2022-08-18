import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Dictionary from '../Dictionary'
import './DictionaryPage.css'
import LevelBox from '../LevelBox/LevelBox'
import Pagination from '../Pagination/Pagination'

export default function DictionaryPage() {
  return (
    <div className="dictionary-page">
      <CssBaseline />
      <Container sx={{ paddingBottom: 5, paddingTop: 5}}>
        <LevelBox />
        <Box>
          <Dictionary />
        </Box>
        <Pagination />
      </Container>
    </div>
  )
}
