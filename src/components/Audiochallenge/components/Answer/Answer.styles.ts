/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

interface IProps {
  isCorrectAnswer: boolean;
  isWrongAnswer: boolean;
  isDisabled: boolean;
}

const StyledAnswer = styled.div`
  background-color: ${(props: IProps) =>
    props.isCorrectAnswer
      ? '#95D03A'
      : props.isWrongAnswer
      ? '#CB2027'
      : 'transparent'};
  color: ${(props: IProps) =>
    props.isCorrectAnswer || props.isWrongAnswer
      ? '#fff'
      : props.isDisabled && !props.isWrongAnswer && !props.isCorrectAnswer
      ? 'rgb(112,112,112)'
      : '#111827'};
  cursor: pointer;
  margin: 10px;
  border: 2px solid transparent;
  padding: 15px;
  font-size: 22px;
  line-height: 1;
  text-align: center;
  border-radius: 20px;
  text-transform: none;
  &:hover {
    color: ${(props: IProps) =>
      props.isDisabled && (props.isCorrectAnswer || props.isWrongAnswer)
        ? '#fff'
        : props.isDisabled && !props.isCorrectAnswer && !props.isWrongAnswer
        ? 'rgb(112,112,112)'
        : '#fff'};
    background-color: ${(props: IProps) =>
      props.isDisabled && props.isCorrectAnswer
        ? '#95D03A'
        : props.isDisabled && props.isWrongAnswer
        ? '#CB2027'
        : props.isDisabled && !props.isCorrectAnswer && !props.isWrongAnswer
        ? '#fff'
        : '#111827'};
    cursor: ${(props: IProps) => (props.isDisabled ? 'default' : 'pointer')};
  }
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 980px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;


export default StyledAnswer;