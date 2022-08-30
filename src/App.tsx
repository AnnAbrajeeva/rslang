import { Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTypedDispatch } from './redux/hooks'
import { setAuthUserData } from './redux/features/authSlice'
import Home from './components/Main page/Home'
import Header from './components/Main page/Header';
import Games from './components/Games page/Games'
import Footer from './components/Main page/Footer'
import Team from './components/Team page/Team'
import DictionaryPage from './components/dictionary-page/DictionaryPage/DictionaryPage'
import Auth from './components/Auth page/Auth'
import Registration from './components/Registration'
import './App.css'
import { BASE_URL, fetchAllWords } from './redux/thunks'
import Sprint from './components/Games page/Sprint/Sprint'
import Audiochallenge from './components/Audiochallenge'
import Statistics from './components/Statistics/StatisticsPage/Statistics';


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
})

function App() {
  const [nav, setNav] = useState('home')
  const [isGameBeforeDic, setIsGameBeforeDic] = useState(false)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    const authUserDataLS = localStorage.getItem('authData');
    if (authUserDataLS) dispatch(setAuthUserData(JSON.parse(authUserDataLS)));
    const group = localStorage.getItem('group');
    const page = localStorage.getItem('page');
    if (!group) localStorage.setItem('group', String(0));
    if (!page) localStorage.setItem('page', String(0));
    dispatch(fetchAllWords());

    if (authUserDataLS) {
      const parsedAuthData = JSON.parse(authUserDataLS);
      const { refreshToken, userId } = parsedAuthData;

      (async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/users/${userId}/tokens`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            }
          );
          const newAuthData = {
            ...parsedAuthData,
            token: response.data.token,
            refreshToken: response.data.refreshToken,
          };
          localStorage.removeItem('authData');
          localStorage.setItem('authData', JSON.stringify(newAuthData));
          dispatch(setAuthUserData(newAuthData));

        } catch (e) {
          // dispatch(setAuthUserData(null));
          // localStorage.removeItem('authData');
          // navigate('/sign-in');
        }
      })();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <header>
        <Header value={nav} setValue={setNav} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<DictionaryPage />} />
            <Route path="/stats" element={<Statistics />} />
            <Route
              path="/games"
              element={<Games gameBefDic={setIsGameBeforeDic} />}
            />
            <Route
              path="/games/sprint"
              element={<Sprint gameBefDic={isGameBeforeDic} />}
            />
            <Route path="/games/sprint" element={<Sprint />} />
            <Route path="/games/audio-call" element={<Audiochallenge/>} />
            <Route path="/games/audio-calll" element={<Audiochallenge/>} />
            <Route path="/team" element={<Team />} />
            <Route path="/sign-in" element={<Auth />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
        {!window.location.href.includes('games') && (
          <Footer setValue={setNav} />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App;
