import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './pagination.css';

interface PaginationRoundedProps {
  changePage: (newPage: number) => void;
  allLearned: boolean;
}

export default function PaginationRounded({ changePage, allLearned }: PaginationRoundedProps) {
  return (
    <Box
      sx={{
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow:
          'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;',
      }}
    >
      <Stack spacing={4}>
        <Pagination
          page={Number(localStorage.getItem('page')) + 1}
          onChange={(e, page) => changePage(page)}
          className="pagination"
          count={30}
          variant="outlined"
          color={allLearned ? 'primary' : 'secondary'}
          shape="rounded"
          size="large"
        />
      </Stack>
    </Box>
  );
}
