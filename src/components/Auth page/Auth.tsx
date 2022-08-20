/* eslint-disable react/function-component-definition */
import { FC } from "react";
import { Link } from "react-router-dom";

const Auth: FC = () => (
  <div>
    Auth
    <div>
    New to RS Lang? <span><Link to='/registration'>Sign up now!</Link></span>
    </div>
  </div>

);

export default Auth;
