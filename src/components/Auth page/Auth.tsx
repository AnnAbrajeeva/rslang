/* eslint-disable */
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setEnteringFlag, setSigningInError } from "../../redux/features/authSlice";
import { useTypedDispatch, useTypedSelector } from "../../redux/hooks";
import Wrapper from "./Auth.styles";
import Alerts from "./components/Alerts";
import AuthForm from "./components/AuthForm";

const Auth: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { signingInError, enteringFlag } = useTypedSelector((state) => state.auth);

  const isUserAuthorized = !signingInError && enteringFlag;

  useEffect(() => {
    if (isUserAuthorized) {
      const delay = () => {
        navigate('/');
        dispatch(setEnteringFlag(false));
      };
      const timeoutID = setTimeout(delay, 3500);
      return () => clearTimeout(timeoutID);
    } else {
      const delay = () => {
        dispatch(setEnteringFlag(false));
        dispatch(setSigningInError(null));
      };
      const timeoutID = setTimeout(delay, 3500);
      return () => clearTimeout(timeoutID);
    }
  }, [signingInError, enteringFlag]);

  return (
    <Wrapper>
      <Alerts />
      {!isUserAuthorized && (
        <div>
          <AuthForm />
          <h3>
            New to RS Lang? <span><Link to='/registration'>Sign up now!</Link></span>
          </h3>
        </div>
      )}
    </Wrapper>
  );
};

export default Auth;
