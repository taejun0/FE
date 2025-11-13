import React from "react";
import * as S from "@pages/quiz/QuizPage.styles";

type Props = { text: string; selected: boolean; onClick: () => void };

export default function OptionItem({ text, selected, onClick }: Props) {
  return (
    <S.Option selected={selected} onClick={onClick}>
      {text}
    </S.Option>
  );
}
