import { Link } from 'react-router-dom'
import { setGameFromTextbook } from '../../redux/features/audioChallengeSlice';
import { useTypedDispatch } from '../../redux/hooks';
import './games.css'
export let isGameBeforeDic = false

const GameBox = (props: { num: number; type: string }) => {
  return (
    <span
      className="game-box"
      onClick={() => {
        console.log('a')
        if (window.location.pathname.includes('book')) isGameBeforeDic = true
        else isGameBeforeDic = false
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
    <div className="games" >
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
