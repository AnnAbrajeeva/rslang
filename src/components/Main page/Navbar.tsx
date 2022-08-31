import {
  BottomNavigation,
  BottomNavigationAction,
  Tab,
  Tabs,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import {
  Home,
  Leaderboard,
  MenuBook,
  SportsEsports,
  Groups,
  AccountCircle,
} from '@mui/icons-material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setAuthUserData } from '../../redux/features/authSlice'
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks'
import avatar from '../../assets/avatar.jpg'
import './main.css'

const pages = ['home', 'book', 'games', 'stats', 'team', 'sign-in']
const settings = ['Exit']

const Navbar = (props: { value: string; setValue: (arg0: string) => void }) => {
  const history = useNavigate()
  const { authData } = useTypedSelector((state) => state.auth)
  const dispatch = useTypedDispatch()
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.setValue(newValue)
    newValue === 'home' ? history(`/`) : history(`/${newValue}`)
  }
  const [anchorElUser, setAnchorElUser] = useState(null)
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const logout = () => {
    dispatch(setAuthUserData(null))
    localStorage.removeItem('authData')
    history('/sign-in')
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

        {authData && (
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt="User" src={avatar} />
                <Box sx={{ ml: 1, fontSize: 14, fontWeight: 500 }}>
                  {authData.name.toUpperCase()}
                </Box>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logout}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
        {!authData && (
          <Tab value="sign-in" icon={<AccountCircle fontSize="large" />} />
        )}
      </Tabs>
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
