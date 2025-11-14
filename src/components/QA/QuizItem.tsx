// src/components/QuizItem.tsx (최종 수정된 전체 코드)

import React from "react";
import { QuizQuestion } from "@utils/qaTypes";
import * as S from "@pages/QA/QuizQaRoomPage.styles";

interface QuizItemProps {
  question: QuizQuestion;
  index: number;
}

const QuizItem: React.FC<QuizItemProps> = ({ question }) => {
  const isOX = question.type === "OX";
  const isMultipleChoice = question.type === "객관식";
  const isShortAnswer = question.type === "단답형";
  const correctAnswer = question.correct_answer;

  // 1. OX 문제 전용 렌더링 (정답만 파란색으로 하이라이트)
  const OXRenderer = () => {
    if (!isOX) return null;

    const optionO = "O";
    const optionX = "X";

    return (
      <>
        <S.OXAnswerContainer>
          <S.OXCard $isCorrectAnswer={correctAnswer === optionO}>
            {optionO}
          </S.OXCard>

          <S.OXCard $isCorrectAnswer={correctAnswer === optionX}>
            {optionX}
          </S.OXCard>
        </S.OXAnswerContainer>
      </>
    );
  };

  // 2. 객관식/단답형 렌더링
  const DefaultAnswerRenderer = () => {
    if (isOX) return null;

    if (isMultipleChoice) {
      // 객관식: 정답 코드를 인덱스로 변환하여 하이라이트
      const correctIndex = correctAnswer.charCodeAt(0) - "A".charCodeAt(0);

      return (
        <div style={{ marginTop: "20px" }}>
          {question.options?.map((option, index) => {
            // 현재 옵션의 인덱스가 정답 인덱스와 일치하는지 확인
            const isCorrect = index === correctIndex;

            return (
              <S.OptionItem key={option.id} $isCorrect={isCorrect}>
                {option.option_text}
              </S.OptionItem>
            );
          })}
        </div>
      );
    }

    if (isShortAnswer) {
      //단답형: correct_answer를 실제 정답 텍스트로 가정하고 직접 표시
      return (
        <S.CorrectAnswerBox>
          <S.AnswerLabel>정답:</S.AnswerLabel> {correctAnswer}
        </S.CorrectAnswerBox>
      );
    }

    return null;
  };

  return (
    <S.QuizItemWrapper>
      <S.QuestionHeader>
        <S.QuestionTitle>
          Q{question.id}. <br />
          {question.question_text}
        </S.QuestionTitle>
      </S.QuestionHeader>

      {isOX ? <OXRenderer /> : <DefaultAnswerRenderer />}

      <S.Explanation>
        <S.ExplanationLabel>해설:</S.ExplanationLabel> {question.explanation}
      </S.Explanation>
    </S.QuizItemWrapper>
  );
};

export default QuizItem;
