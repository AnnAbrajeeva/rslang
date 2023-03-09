import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { setAuthUserData } from '../../redux/features/authSlice';
import Navbar from './Navbar';
import { BASE_URL } from '../../redux/thunks';

function Header(props: { value: string; setValue: (arg0: string) => void }) {
  const { value, setValue } = props;
  const { authData } = useTypedSelector((state) => state.auth);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(setAuthUserData(null));
    localStorage.removeItem('authData');
    navigate('/sign-in');
  }

  useEffect(() => {
    const authDataLS = localStorage.getItem('authData');
    let intervalID: NodeJS.Timer;

    if (authDataLS) {
      const parsedAuthData = JSON.parse(authDataLS);

      const { refreshToken, userId } = parsedAuthData;

      intervalID = setInterval(() => {
        (async () => {
          try {
            const response = await axios.get(`${BASE_URL}/users/${userId}/tokens`, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });
            const newAuthData = {
              ...parsedAuthData,
              token: response.data.token,
              refreshToken: response.data.refreshToken,
            };
            localStorage.removeItem('authData');
            localStorage.setItem('authData', JSON.stringify(newAuthData));
            dispatch(setAuthUserData(newAuthData));
          } catch (e) {
            if (e instanceof Error) {
              logoutHandler();
            }
          }
        })();
      }, 30000);
    }

    return () => clearInterval(intervalID);
  }, [authData]);

  return (
    <div>
      <Navbar value={value} setValue={setValue} />
    </div>
  );
}

export default Header;
