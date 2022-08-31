/* eslint-disable */
import { FC } from "react"
import { Alert, AlertTitle } from "@mui/material";
import Wrapper from "./Alerts.styles";
import { useTypedSelector } from "../../../../redux/hooks";

const Alerts: FC = () => {
  const { userCreationError, registeringFlag } = useTypedSelector(state => state.registration);

  const isSuccess = !userCreationError && registeringFlag;
  const isError = userCreationError && registeringFlag;

  return (
    <Wrapper>
      {isSuccess && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          A new user has been created! Please sign in.
        </Alert>)
      }
      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {userCreationError}
        </Alert>)
      }
    </Wrapper>
  )
};

export default Alerts;