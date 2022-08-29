import { Link } from 'react-router-dom'
import './games.css'

const GameBox = (props: { num: number; type: string }) => {
  return (
    <span
      className="game-box"
      onClick={() => {
        console.log(window.location.href)
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

const Games = (props: { dicLevel?: number; dicPage?: number }) => {
  return (
    <div className="games">
      <Link to="/games/audio-call">
        <GameBox num={1} type="Audio Call" />
      </Link>
      <Link to="/games/sprint">
        <GameBox num={2} type="Sprint" />
      </Link>
    </div>
  )
}

export default Games
