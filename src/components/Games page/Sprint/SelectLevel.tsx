import React from 'react';

import { Button } from '@mui/material';

const SelectLevel = (props: { setLevel: (arg0: number) => void }) => {
  const select = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.setLevel(Number((e.target as HTMLButtonElement).value));
  };

  return (
    <div className="levels">
      <h2>Choose your English level:</h2>
      <div>
        <Button onClick={select} variant="contained" color="secondary" value="1">
          1
        </Button>
        <Button onClick={select} variant="contained" color="secondary" value="2">
          2
        </Button>
        <Button onClick={select} variant="contained" color="secondary" value="3">
          3
        </Button>
        <Button onClick={select} variant="contained" color="secondary" value="4">
          4
        </Button>
        <Button onClick={select} variant="contained" color="secondary" value="5">
          5
        </Button>
        <Button onClick={select} variant="contained" color="secondary" value="6">
          6
        </Button>
      </div>
    </div>
  );
};

export default SelectLevel;
