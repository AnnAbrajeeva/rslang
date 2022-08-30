/* eslint-disable no-unused-vars */
export interface AnswerProps {
  value: number;
  answerText: string;
  currentAnswer: string;
  correctAnswer: string;
  onSelectAnswer: (answerText: string) => void;
}
