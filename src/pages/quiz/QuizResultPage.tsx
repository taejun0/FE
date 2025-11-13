import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logoQroomText from "../../assets/images/Logo.png";
import ggoom1 from "../../assets/images/ggoom/ggoom1.png";
import * as S from "./QuizResultPage.styles";

type SubmitResult = {
  quiz_result_id: number;
  score: number; // 퍼센트(%)
  correct_count: number; // 맞힌 개수
  total_questions: number; // 총 문항
  status: string;
};

type SubmitResponse = {
  isSuccess: boolean;
  data: { result: SubmitResult; message?: string };
};

type ResultState = {
  resultId: number;
  correct: number;
  total: number;
  scorePercent: number;
  message?: string;
};

export default function QuizResultPage() {
  const { id } = useParams(); // /quizzes/:id/result
  const navigate = useNavigate();
  const state = (useLocation().state || {}) as Partial<ResultState>;

  // 1) 제출 직후엔 navigate(state)로 값이 들어오고,
  // 2) 새로고침 등으로 state가 없으면 서버에서 재조회
  const [correct, setCorrect] = useState<number | null>(state.correct ?? null);
  const [total, setTotal] = useState<number | null>(state.total ?? null);
  const [scorePercent, setScorePercent] = useState<number | null>(
    state.scorePercent ?? null
  );
  const [message, setMessage] = useState<string>(state.message ?? "");

  useEffect(() => {
    if (correct != null && total != null && scorePercent != null) return;

    (async () => {
      // 결과 재조회 API (엔드포인트만 조정)
      const { data } = await axios.get<SubmitResponse>(
        `/api/quizzes/${id}/result`
      );
      const r = data.data.result;
      setCorrect(r.correct_count);
      setTotal(r.total_questions);
      setScorePercent(r.score);
      setMessage(data.data.message ?? "");
    })().catch((e) => {
      console.error(e);
      alert("결과를 불러오지 못했습니다.");
      navigate("/", { replace: true });
    });
  }, [correct, total, scorePercent, id, navigate]);

  if (correct == null || total == null || scorePercent == null) {
    return (
      <S.Page>
        <S.Wrapper>결과 계산 중...</S.Wrapper>
      </S.Page>
    );
  }

  return (
    <S.Page>
      <S.Logo src={logoQroomText} alt="Qroom" />

      <S.Wrapper>
        <S.Group>그룹명</S.Group>
        <S.Title>챕터 1~3 질문</S.Title>

        <S.Circle>
          <S.CircleText>총평</S.CircleText>
          <S.Score>
            {correct}/{total}
          </S.Score>
          <S.Mascot src={ggoom1} alt="mascot" />
        </S.Circle>

        <S.Comment>훌륭합니다!</S.Comment>

        <S.Actions>
          <S.Button onClick={() => navigate("/home")}>나가기</S.Button>
          <S.PrimaryButton
            onClick={() =>
              navigate(`/quiz/${id}/review`, {
                state: { correct, total, scorePercent },
              })
            }
          >
            정답 및 오답 풀이
          </S.PrimaryButton>
        </S.Actions>
      </S.Wrapper>
    </S.Page>
  );
}
