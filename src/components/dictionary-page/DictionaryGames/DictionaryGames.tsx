import { Link } from 'react-router-dom'
import '../../Games page/games.css'
import Game1 from '../../Games page/images/game1-bg.gif'
import Game2 from '../../Games page/images/game2-bg.gif'
import './DictionaryGames.css'

interface GamesProps {
  img: string
  type: string
}

function Games({ img, type }: GamesProps) {
  return (
    <div className="game-box">
      <img src={img} alt="" className="game-img" />
      <div className="about-game">
        <h2 className="game-name">{type}</h2>
      </div>
    </div>
  )
}

export default function DictionaryGames() {
  const games = [
    { num: 1, type: 'Audio Call', link: '/games/audio-call', img: Game1 },
    { num: 2, type: 'Sprint', link: '/games/sprint', img: Game2 },
  ]
  return (
    <div className="dic-games">
      <h2 className='dic-games__title'>Try out our games:</h2>
      <div className="games">
        {games.map((game) => (
          <Link to={game.link} key={game.type}>
            <Games img={game.img} type={game.type} />
          </Link>
        ))}
      </div>
    </div>
  )
}
