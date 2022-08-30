/* eslint-disable */

import Timer from './Timer'
import './sprint.css'
import SprintContainer from './SprintGameCont'
import { useState } from 'react'
import Result from './Result'
import SelectLevel from './SelectLevel'
import LevelBox from '../../dictionary-page/LevelBox/LevelBox'
import { isGameBeforeDic } from '../Games'
import { useEffect } from 'react'

const Sprint = () => {
  const [isEnded, setIsEnded] = useState(false)
  const [result, setResult] = useState([])
  const [level, setLevel] = useState(-1)
  const [page, setPage] = useState(-1)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (isGameBeforeDic) {
      setLevel(Number(localStorage.group) + 1)
      setPage(Number(localStorage.page))
    }
  }, [])

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
              page={page}
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
