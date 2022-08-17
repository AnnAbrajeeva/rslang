import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './games.css'

const GameBox = (props: { num: number; type: string }) => {
  return (
    <div className='game-box'>
      <img src={require(`./images/game${props.num}-bg.gif`)} alt='' className='game-img' />
      <div className='about-game'>
        <h2 className='game-name'>{props.type}</h2>
      </div>
    </div>
  )
}

const Games = (props: { setIsFooter: (arg0: boolean) => void }) => {
  useEffect(() => props.setIsFooter(false), [props])

  return (
    <div className='games'>
      <Link to='/games/audio-call'>
        <GameBox num={1} type='Audio Call' />
      </Link>
      <Link to='/games/sprint'>
        <GameBox num={2} type='Sprint' />
      </Link>
    </div>
  )
}

export default Games
