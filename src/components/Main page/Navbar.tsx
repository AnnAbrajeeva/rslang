import {
  BottomNavigation,
  BottomNavigationAction,
  Tab,
  Tabs,
} from '@mui/material'
import {
  Home,
  Leaderboard,
  MenuBook,
  SportsEsports,
  Groups,
  AccountCircle,
} from '@mui/icons-material'
import { Link, useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const pages = ['home', 'book', 'games', 'stats', 'team', 'sign-in']

const Navbar = (props: { value: string; setValue: (arg0: string) => void }) => {
  const history = useHistory()
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.setValue(newValue)
    newValue === 'home' ? history.push(`/`) : history.push(`/${newValue}`)
  }

  useEffect(() => {
    const currentWindow = window.location.pathname.replace('/', '')
    if (currentWindow) {
      if (currentWindow.includes('/')) props.setValue(checkUrl(currentWindow))
      else props.setValue(currentWindow)
    }
  }, [props])

  return (
    <div className="navbar">
      {/* <BottomNavigation value={props.value} onChange={handleChange}> */}
      <Tabs
        value={props.value}
        onChange={handleChange}
        aria-label="icon position tabs example"
      >
        <Tab value="home" icon={<Home fontSize="large" />} />
        <Tab value="book" icon={<MenuBook fontSize="large" />} />
        <Tab value="games" icon={<SportsEsports fontSize="large" />} />
        <Tab value="stats" icon={<Leaderboard fontSize="large" />} />
        <Tab value="team" icon={<Groups fontSize="large" />} />
        <Tab value="sign-in" icon={<AccountCircle fontSize="large" />} />
      </Tabs>
      {/* </BottomNavigation> */}
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
