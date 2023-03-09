import React from 'react';

import './LevelOne.css';

interface LevelOneProps {
  level: {
    number: number;
    text: string;
    color: string;
  };
  activeId: number | null;
  change: (number: number) => void;
}

export default function LevelOne({
  level: { number, text, color },
  activeId,
  change,
}: LevelOneProps) {
  const activeClass = activeId === number ? 'active' : '';

  const classes = ['level', activeClass];

  return (
    <div
      className={classes.join(' ')}
      style={{ backgroundColor: color }}
      onClick={() => change(number)}
    >
      <div className="level__wrapper">
        <p>{number}</p>
      </div>
      <p className="level__text">{text}</p>
    </div>
  );
}
