import { useState, useEffect } from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const normalise = (value: number) => ((value - 0) * 100) / (60 - 0)

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        margin: '0 50px',
      }}
    >
      <CircularProgress
        variant="determinate"
        style={{ width: '120px', height: '120px' }}
        {...props}
        value={normalise(props.value)}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="h2"
          color="text.secondary"
          style={{ fontSize: '25px' }}
        >{`${
          props.value ? Math.round(props.value) : 'Time is up!'
        }`}</Typography>
      </Box>
    </Box>
  )
}

export default function Timer(props: { setIsEnded: (arg0: boolean) => void }) {
  const [progress, setProgress] = useState(60)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0))
    }, 1000)
    if (progress === 0) props.setIsEnded(true)
    return () => {
      clearInterval(timer)
    }
  }, [progress, props])

  return <CircularProgressWithLabel value={progress} />
}
