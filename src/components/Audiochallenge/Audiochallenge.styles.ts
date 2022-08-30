import { Alert } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  color: black;
  text-transform: none;
  & > div {
    font-weight: 700;
    font-size: 2rem;
  }
  @media (max-width: 980px) {
    padding-top: 0;
  }
`;

export const StyledAlert = styled(Alert)`
  width: 75%;
  min-width: 300px;
  text-transform: none;
  color: black;
  font-weight: 400;
  font-size: 0.5rem;
  border-radius: 10px;
`;
