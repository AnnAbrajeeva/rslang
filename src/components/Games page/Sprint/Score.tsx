import React from 'react';
import { Typography } from '@mui/material';

const Score = (props: { score: number }) => {
  return (
    <div className="score">
      <Typography
        variant="caption"
        component="h2"
        color="text.secondary"
        style={{ fontSize: '50px' }}
      >
        {props.score}
      </Typography>
    </div>
  );
};

export default Score;
