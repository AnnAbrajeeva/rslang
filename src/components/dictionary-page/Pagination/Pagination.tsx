import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import './pagination.css'

export default function PaginationRounded() {
  return (
    <Box sx={{marginTop: 5, marginBottom: 5, paddingTop: 3, paddingBottom: 3, backgroundColor: 'white', borderRadius: '5px', boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;'}}>
      <Stack spacing={4}>
        <Pagination className='pagination' count={10} variant="outlined" color="secondary" shape="rounded" size="large" />
      </Stack>
    </Box>
  )
}
