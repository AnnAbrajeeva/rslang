import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import DictionaryCard from './DictionaryCard/DictionaryCard'
import { IWord } from '../../types/types'
// import RslangApi from '../../api/RslangApi'
// import Loader from '../Loader/Loader'

// const api = new RslangApi()
// api.signInUser({ email: 'aaa@aa.ru', password: '12345678' }).then((res) => {
//   localStorage.setItem('user', JSON.stringify(res))
// })

interface IDictionaryProps {
  words: IWord[]
}

export default function Dictionary({ words }: IDictionaryProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {words.map((word) => (
          <Grid item sm={12} key={word.id}>
            <Card>
              <DictionaryCard word={word} key={word.id} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
