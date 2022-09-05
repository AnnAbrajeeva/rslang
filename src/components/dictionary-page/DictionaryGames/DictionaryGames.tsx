/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import '../../Games page/games.css'
import Game1 from '../../Games page/images/game1-bg.gif'
import Game2 from '../../Games page/images/game2-bg.gif'
import { setGameFromTextbook } from '../../../redux/features/audioChallengeSlice'
import { useTypedDispatch } from '../../../redux/hooks'
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
  const dispatch = useTypedDispatch()
  const games = [
    { num: 1, type: 'Audio Call', link: '/games/audio-calll', img: Game1 },
    { num: 2, type: 'Sprint', link: '/games/sprint', img: Game2 },
  ]
  const handleAudiochallengeClick = () => {
    dispatch(setGameFromTextbook())
  }
  return (
    <div className="dic-games">
      <h2 className="dic-games__title">Try out our games:</h2>
      <div className="games" onClick={handleAudiochallengeClick}>
        {games.map((game) => (
          <Link to={game.link} key={game.type}>
            <Games img={game.img} type={game.type} />
          </Link>
        ))}
      </div>
    </div>
  )
}
