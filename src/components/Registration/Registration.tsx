/* eslint-disable react/function-component-definition */
/* eslint-disable no-else-return */
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setRegisteringFlag, setUserCreationError } from "../../redux/features/registrationSlice";
import { useTypedDispatch, useTypedSelector } from "../../redux/hooks";
import Alerts from "./components/Alerts";
import RegistrationForm from "./components/RegistrationFrom";
import { Wrapper } from "./Registration.styles";

const Registration: FC = () => {
  const {
    userCreationError,
    registeringFlag,
  } = useTypedSelector(state => state.registration);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const isUserCreated = !userCreationError && registeringFlag;

  useEffect(() => {
    if (isUserCreated) {
      const delay = () => {
        navigate('/sign-in');
        dispatch(setRegisteringFlag(false));
      };
      const timeoutID = setTimeout(delay, 2000);
      return () => clearTimeout(timeoutID);
    } else {
      const delay = () => {
        dispatch(setUserCreationError(null));
        dispatch(setRegisteringFlag(false));
      };
      const timeoutID = setTimeout(delay, 2000);
      return () => clearTimeout(timeoutID);
    }
  }, [userCreationError, registeringFlag]);

  return (
    <Wrapper>
      <Alerts />
      {!isUserCreated && (
        <div>
          <RegistrationForm />
          <h3>
            Signed up already? <span><Link to='/sign-in'>Sign in to the app</Link></span>
          </h3>
        </div>
      )}
    </Wrapper>
  );
};

export default Registration;
