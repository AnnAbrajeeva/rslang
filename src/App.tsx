import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import { useTypedDispatch } from "./redux/hooks";
import { setAuthUserData } from "./redux/features/authSlice";
import Navbar from './components/Main page/Navbar';
import Home from './components/Main page/Home';
import Games from './components/Games page/Games';
import Footer from './components/Main page/Footer';
import Team from './components/Team page/Team';
import DictionaryPage from './components/dictionary-page/DictionaryPage/DictionaryPage';
import Auth from './components/Auth page/Auth';
import Registration from './components/Registration';
import './App.css';
import { BASE_URL } from "./redux/thunks";

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
  const [isFooter, setIsFooter] = useState(true);
  const [nav, setNav] = useState('home');
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const authUserDataLS = localStorage.authData;

    if (authUserDataLS) dispatch(setAuthUserData(JSON.parse(authUserDataLS)));

    if (authUserDataLS) {
      const parsedAuthData = JSON.parse(authUserDataLS);
      const userID = parsedAuthData.userId;
      const { refreshToken } = parsedAuthData;
      (async () => {
          const response = await axios.get(
            `${BASE_URL}/users/${userID}/tokens`,
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

      })();
    }
  }, []);

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
            <Route path="/sign-in" element={<Auth />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
        {isFooter && <Footer setValue={setNav} />}
      </div>
    </ThemeProvider>
  )
}

export default App;
