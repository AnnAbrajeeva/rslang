import Box from '@mui/material/Box'
import LevelOne from './LevelOne'
import './LevelBox.css'

interface LevelBoxProps {
  changeLevel: (newGroup: number) => void;
  group: number
}

export default function LevelBox({changeLevel, group}: LevelBoxProps) {
  const levels = [
    { number: 1, text: 'Beginner', color: '#C097FF' },
    { number: 2, text: 'Pre-Intermediate', color: '#C5CCFF' },
    { number: 3, text: 'Intermediate', color: '#9DFF76' },
    { number: 4, text: 'Upper-Intermediate', color: '#FFF86F' },
    { number: 5, text: 'Advanced', color: '#FFBE3E' },
    { number: 6, text: 'Profiency', color: '#F17D8A' },
    { number: 7, text: 'Difficult Words', color: '#FF2700' },
  ]

  return (
    <Box sx={{ marginBottom: 5, marginTop: 5 }}>
      <h1 className="level-box__title">Choose your English level:</h1>
      <div className="level-box">
        <div className="level-box__wrapper">
          {levels.map((level) => (
            <LevelOne
              activeId={group}
              change={changeLevel}
              level={level}
              key={level.number}
            />
          ))}
        </div>
      </div>
    </Box>
  )
}
