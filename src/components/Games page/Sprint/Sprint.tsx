import Timer from './Timer'
import './sprint.css'
import SprintContainer from './SprintGameCont'
import { useState } from 'react'
import Result from './Result'
import SelectLevel from './SelectLevel'
import LevelBox from '../../dictionary-page/LevelBox/LevelBox'

const Sprint = () => {
  const [isEnded, setIsEnded] = useState(false)
  const [result, setResult] = useState([])
  const [level, setLevel] = useState(-1)
  const [score, setScore] = useState(0)

  return (
    <div className="sprint">
      {level !== -1 && (
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
      {level === -1 && (
        <div className="levels">
          <LevelBox changeLevel={setLevel} group={level} />
        </div>
      )}
    </div>
  )
}

export default Sprint
