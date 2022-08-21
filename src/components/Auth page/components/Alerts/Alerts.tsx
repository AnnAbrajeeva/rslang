/* eslint-disable react/function-component-definition */
import { FC } from "react"
import { Alert, AlertTitle } from "@mui/material";
import { Wrapper } from "./Alerts.styles";
import { useTypedSelector } from "../../../../redux/hooks";

const Alerts: FC = () => {
  const { signingInError, enteringFlag } = useTypedSelector(state => state.auth);

  const isSuccess = !signingInError && enteringFlag;
  const isError = signingInError && enteringFlag;

  return (
    <Wrapper>
      {isSuccess && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          You are successfully logged in!
        </Alert>)
      }
      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {signingInError}
        </Alert>)
      }
    </Wrapper>
  )
};

export default Alerts;