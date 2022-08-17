import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Main page/Navbar'
import Home from './components/Main page/Home'
import Games from './components/Games page/Games'
import Footer from './components/Main page/Footer'
import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'
import Team from './components/Team page/Team'

const theme = createTheme({
  palette: {
    primary: {
      main: '#8AAAE5',
    },
    secondary: {
      main: '#A0DAA9',
    },
  },
  typography: {
    fontFamily: ['Ubuntu'].join(','),
  },
})

function App() {
  const [isFooter, setIsFooter] = useState(true)
  const [nav, setNav] = useState('home')

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className='wrapper'>
          <header>
            <Navbar value={nav} setValue={setNav} />
          </header>
          <main>
            <Switch>
              <Route exact path='/'>
                <Home setIsFooter={setIsFooter} />
              </Route>
              <Route path='/book'>
                <h2>Book</h2>
              </Route>
              <Route path='/stats'>
                <h2>Stats</h2>
              </Route>
              <Route path='/games'>
                <Games setIsFooter={setIsFooter} />
              </Route>
              <Route path='/team'>
                <Team setIsFooter={setIsFooter} />
              </Route>
              <Route path='/sign-in'>
                <h2>Sign in</h2>
              </Route>
            </Switch>
          </main>
          {isFooter && <Footer setValue={setNav} />}
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
