import { Link } from 'react-router-dom'
import './games.css'

const GameBox = (props: {
  num: number
  type: string
  gameBefDic?: (arg: boolean) => void
}) => {
  return (
    <span
      className="game-box"
      onClick={() => {
        console.log('a')
        if (props.gameBefDic !== undefined) {
          console.log('b')
          if (window.location.pathname.includes('book')) {
            props.gameBefDic(true)
          } else {
            props.gameBefDic(false)
          }
        }
      }}
    >
      <img
        src={require(`./images/game${props.num}-bg.gif`)}
        alt=""
        className="game-img"
      />
      <div className="about-game">
        <h2 className="game-name">{props.type}</h2>
      </div>
    </span>
  )
}

const Games = (props: { gameBefDic?: (arg: boolean) => void }) => {
  return (
    <div className="games">
      {props.gameBefDic !== undefined && (
        <>
          <Link to="/games/audio-call">
            <GameBox num={1} type="Audio Call" gameBefDic={props.gameBefDic} />
          </Link>
          <Link to="/games/sprint">
            <GameBox num={2} type="Sprint" gameBefDic={props.gameBefDic} />
          </Link>
        </>
      )}
      {props.gameBefDic === undefined && (
        <>
          <Link to="/games/audio-call">
            <GameBox num={1} type="Audio Call" />
          </Link>
          <Link to="/games/sprint">
            <GameBox num={2} type="Sprint" />
          </Link>
        </>
      )}
    </div>
  )
}

export default Games
