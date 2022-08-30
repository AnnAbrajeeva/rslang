import styled from 'styled-components';

export const StyledResultsTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 300px;
  padding: 0 1.5rem 1.5rem 1.5rem;
  margin-top: -35px;
  color: #111827;
  & h2 {
    font-size: 1.25rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 10px;
  }
  & p {
    text-transform: none;
    font-size: 1.25rem;
    &:last-child {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 980px) {
    margin-top: 0;
  }
`;

export const StyledWrongAnswers = styled.div`
  & span {
    color: #fff;
    display: inline-block;
    padding: 3px 5px;
    background-color: #cb2027;
    border-radius: 25%;
  }
  @media (max-width: 420px) {
    font-size: 1.4rem;
  }
`;

export const StyledRightAnswers = styled.div`
  & span {
    color: #fff;
    display: inline-block;
    padding: 3px 5px;
    background-color: #95d03a;
    border-radius: 25%;
  }
  @media (max-width: 420px) {
    font-size: 1.4rem;
  }
`;

export const StyledButton = styled.button`
  margin: 0;
  margin-top: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255);
  text-transform: uppercase;
  font-size: 1.25rem;
  text-align: center;
  border: 1px solid #34568B;
  background-color: #34568B;
  border-radius: 0.375rem;
  padding: 0.5rem 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  &:hover {
    border: 2px solid #34568B;
    background-color: #34568B;
  }
  @media (max-width: 420px) {
    font-size: 1.1rem;
  }
`;
