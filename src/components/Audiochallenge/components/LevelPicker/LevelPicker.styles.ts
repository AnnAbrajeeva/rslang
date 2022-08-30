import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: -40px;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & h2 {
    color: #111827;
    text-align: center;
    font-size:32px;
  }
`;

export const StyledButtonsRow = styled.div`
  display: grid;
  grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  & div {
    text-align: center;
    font-size:16px;
    cursor: pointer;
    text-transform: none;
    color: black;
    padding: 0.8rem;
    font-weight: 300;
    transition: all 0.2s ease-out;
    &:hover {
      transform: scale(1.1);
      background-color: rgba(59, 130, 246);
    }
    &:nth-child(1) {
        background-color: #C097FF;
    }
    &:nth-child(2) {
        background-color: #C5CCFF;
    }
    &:nth-child(3) {
        background-color: #9DFF76;
    }
    &:nth-child(4) {
        background-color: #FFF86F;
    }
    &:nth-child(5) {
        background-color: #FFBE3E;
    }
    &:nth-child(6) {
        background-color: #F17D8A;
    }
  }

  @media (max-width: 768px) {
    display:flex;
    flex-direction: column;
    & div {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 0.7rem;
      padding: 0.3rem;
    }
  }

  @media (max-width: 540px) {
    flex-direction: column;
    width: 300px;
    & div {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 0.7rem;
      padding: 0.3rem;
    }
  }
`;
