import React from "react";
import type { Question } from "@utils/quizTypes";
import * as S from "@pages/quiz/QuizPage.styles";
import OptionItem from "./OptionItem";

type Props = {
  question: Question;
  answerValue?: string | null;
  onAnswer: (value: string) => void;
};

export default function QuestionCard({
  question,
  answerValue,
  onAnswer,
}: Props) {
  const { type, text, options, question_number } = question;

  return (
    <S.QuestionBox>
      <h1>Q{question_number}.</h1>
      <h2>{text}</h2>

      {type === "OX" && (
        <S.OXGrid>
          <S.OXBox
            selected={answerValue === "O" || answerValue === options?.[0]?.text}
            onClick={() => onAnswer(options?.[0]?.text ?? "O")}
          >
            <span>O</span>
          </S.OXBox>
          <S.OXBox
            selected={answerValue === "X" || answerValue === options?.[1]?.text}
            onClick={() => onAnswer(options?.[1]?.text ?? "X")}
          >
            <span>X</span>
          </S.OXBox>
        </S.OXGrid>
      )}

      {/* 객관식 */}
      {type === "객관식" &&
        options?.map((opt) => (
          <OptionItem
            key={opt.id}
            text={opt.text}
            selected={answerValue === opt.text}
            onClick={() => onAnswer(opt.text)}
          />
        ))}

      {/* 단답형 */}
      {type === "단답형" && (
        <S.Input
          placeholder="정답을 입력하세요"
          value={answerValue ?? ""}
          onChange={(e) => onAnswer(e.target.value)}
        />
      )}
    </S.QuestionBox>
  );
}
