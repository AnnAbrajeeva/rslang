// eslint-disable-next-line import/no-unresolved
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import Navbar from './components/Main page/Navbar';
import Home from './components/Main page/Home';
import Games from './components/Games page/Games';
import Footer from './components/Main page/Footer';
import Team from './components/Team page/Team';
import DictionaryPage from './components/dictionary-page/DictionaryPage/DictionaryPage';
import './App.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#34568B',
    },
    secondary: {
      main: '#A0DAA9',
    },
  },
  typography: {
    fontFamily: ['Ubuntu'].join(','),
  },
});

function App() {
  const [isFooter, setIsFooter] = useState(true)
  const [nav, setNav] = useState('home')

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <header>
          <Navbar value={nav} setValue={setNav} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home setIsFooter={setIsFooter} />} />
            <Route path="/book" element={<DictionaryPage setIsFooter={setIsFooter} />} />
            <Route path="/stats" element={<h2>Stats</h2>} />
            <Route path="/games" element={<Games setIsFooter={setIsFooter} />} />
            <Route path="/games/sprint" element={<h2>Sprint</h2>} />
            <Route path="/games/audio-call" element={<h2>Audio-call</h2>} />
            <Route path="/team" element={<Team setIsFooter={setIsFooter} />} />
            <Route path="/sign-in" element={<h2>Sign in</h2>} />
          </Routes>
        </main>
        {isFooter && <Footer setValue={setNav} />}
      </div>
    </ThemeProvider>
  )
}

export default App;
