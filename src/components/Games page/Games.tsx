import { useEffect } from 'react'
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
      <GameBox num={1} type='Audio Call' />
      <GameBox num={2} type='Sprint' />
    </div>
  )
}

export default Games
