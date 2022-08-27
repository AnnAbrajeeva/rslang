import Timer from './Timer'
import './sprint.css'
import SprintContainer from './SprintGameCont'
import { useState } from 'react'
import Result from './Result'
import SelectLevel from './SelectLevel'

const Sprint = () => {
  const [isEnded, setIsEnded] = useState(false)
  const [result, setResult] = useState([])
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(0)
  

  return (
    <div className="sprint">
      {level !== 0 && (
        <>
          {!isEnded && result.length !== 20 && (
            <SprintContainer
              result={result}
              setIsEnded={setIsEnded}
              level={level}
              score={score}
              setScore={setScore}
            />
          )}
          {(isEnded || result.length === 20) && (
            <Result result={result} score={score} />
          )}
        </>
      )}
      {level === 0 && <SelectLevel setLevel={setLevel} />}
    </div>
  )
}

export default Sprint
