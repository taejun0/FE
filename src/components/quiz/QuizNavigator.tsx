import React from "react";
import * as S from "@pages/quiz/QuizPage.styles";

type Props = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canNext?: boolean;
};

export default function QuizNavigator({
  index,
  total,
  onPrev,
  onNext,
  onSubmit,
  canNext = true,
}: Props) {
  const isLast = index === total - 1;
  return (
    <S.ButtonArea>
      <S.Button onClick={onPrev} disabled={index === 0}>
        이전
      </S.Button>
      {!isLast ? (
        <S.Button primary onClick={onNext} disabled={!canNext}>
          다음
        </S.Button>
      ) : (
        <S.Button primary onClick={onSubmit}>
          제출하기
        </S.Button>
      )}
    </S.ButtonArea>
  );
}
