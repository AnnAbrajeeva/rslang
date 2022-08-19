import { useEffect } from 'react'

const Home = (props: { setIsFooter: (arg0: boolean) => void }) => {
  useEffect(() => props.setIsFooter(true), [props])

  return (
    <div className='home'>
      <img className='home-img' alt='img' src={require('./images/main-bg.png')} />
      <div className='about'>
        <h1>RS Lang</h1>
        <h2>
          The free, fun, and effective way to learn a language! Play mini-games, learn and memorize words. All the best
          techniques in one place.
        </h2>
      </div>
    </div>
  )
}

export default Home
