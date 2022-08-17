import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Home, Leaderboard, MenuBook, SportsEsports, Groups, AccountCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const pages = ['home', 'book', 'games', 'stats', 'team', 'sign-in']

const Navbar = (props: { value: string; setValue: (arg0: string) => void }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.setValue(newValue)
  }

  useEffect(() => {
    const currentWindow = window.location.pathname.replace('/', '')
    if (currentWindow) {
      if (currentWindow.includes('/')) props.setValue(checkUrl(currentWindow))
      else props.setValue(currentWindow)
    }
  }, [props])

  return (
    <div className='navbar'>
      <BottomNavigation sx={{ width: 500 }} value={props.value} onChange={handleChange}>
        <BottomNavigationAction component={Link} to='/' label='Home' value='home' icon={<Home fontSize='large' />} />
        <BottomNavigationAction
          component={Link}
          to='/book'
          label='Book'
          value='book'
          icon={<MenuBook fontSize='large' />}
        />
        <BottomNavigationAction
          component={Link}
          to='/games'
          label='Games'
          value='games'
          icon={<SportsEsports fontSize='large' />}
        />
        <BottomNavigationAction
          component={Link}
          to='/stats'
          label='Stats'
          value='stats'
          icon={<Leaderboard fontSize='large' />}
        />
        <BottomNavigationAction
          component={Link}
          to='/team'
          label='Team'
          value='team'
          icon={<Groups fontSize='large' />}
        />
        <BottomNavigationAction
          component={Link}
          to='/sign-in'
          label='Account'
          value='sign-in'
          icon={<AccountCircle fontSize='large' />}
        />
      </BottomNavigation>
    </div>
  )
}

function checkUrl(str: string): string {
  for (let i = 0; i < pages.length; i++) {
    if (str.includes(pages[i])) {
      return pages[i]
    }
  }
  return ''
}

export default Navbar
