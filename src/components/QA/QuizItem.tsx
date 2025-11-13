// src/components/QuizItem.tsx
import React from "react";
import { QuizQuestion } from "@utils/qaTypes";
import QaPostList from "./QaPostList";
import {
  QuizQaPairContainer,
  LeftColumn,
  RightColumn,
  QuizItemWrapper,
  AnswerBox,
} from "@pages/QA/QuizQaRoomPage.styles";

interface QuizItemProps {
  question: QuizQuestion;
  index: number;
}

const QuizItem: React.FC<QuizItemProps> = ({ question, index }) => {
  return (
    <QuizQaPairContainer>
      {/* 1. 좌측 영역: 퀴즈 문제 */}
      <LeftColumn>
        <h1
          style={{ marginBottom: "30px", fontSize: "24px", color: "#111827" }}
        >
          문제 {index + 1}
        </h1>

        <QuizItemWrapper $isDone={true}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>
              Q{index + 1}. {question.question_text}
            </h3>
          </div>

          <AnswerBox>
            **내 답변:** {question.user_answer ?? "미응답"} (정답:{" "}
            {question.correct_answer})
          </AnswerBox>

          <div style={{ marginTop: "15px", color: "#666", fontSize: "14px" }}>
            **해설:** {question.explanation}
          </div>
        </QuizItemWrapper>
      </LeftColumn>

      {/* 2. 우측 영역: 현재 문제의 QA 게시판 */}
      <RightColumn>
        <QaPostList
          questionId={question.question_id}
          qaPosts={question.qa_board}
          questionTitle={question.question_text}
        />
      </RightColumn>
    </QuizQaPairContainer>
  );
};

export default QuizItem;
