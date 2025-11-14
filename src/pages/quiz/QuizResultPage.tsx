import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logoQroomText from "../../assets/images/Logo.png";
import ggoom1 from "../../assets/images/ggoom/ggoom1.png";
import * as S from "./QuizResultPage.styles";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";

type QuizResultDetail = {
  quiz_id: number;
  quiz_title: string;
  group_name: string;
  score: number;
  correct_count: number;
  total_questions: number;
  created_at: string;
};

type QuizResultAnswer = {
  quiz_result_id: number;
  question_id: number;
  question_number: number;
  question_text: string;
  type: string;
  explanation: string;
  options: { id: number; option_text: string }[];
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
};

type SubmitResponse = {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    quiz_result: QuizResultDetail;
    answers: QuizResultAnswer[];
  };
  timeStamp: string;
};

export default function QuizResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [correct, setCorrect] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [scorePercent, setScorePercent] = useState<number | null>(null);
  const [quizResultId, setQuizResultId] = useState<number | null>(null);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const current_quiz_result_id = Number(
      localStorage.getItem("quiz_result_id") || 0
    );

    if (!current_quiz_result_id) {
      alert("퀴즈 결과 ID를 찾을 수 없습니다.");
      navigate("/", { replace: true });
      return;
    }

    setQuizResultId(current_quiz_result_id);

    (async () => {
      try {
        const url = `${baseURL}quiz/result/${current_quiz_result_id}`;

        const { data } = await axios.get<SubmitResponse>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const r = data.data.quiz_result;

        setCorrect(r.correct_count);
        setTotal(r.total_questions);
        setScorePercent(r.score);
        setQuizTitle(r.quiz_title);
        setGroupName(r.group_name);

        setIsLoading(false);
      } catch (e) {
        console.error(e);
        alert("결과를 불러오지 못했습니다.");
        navigate("/", { replace: true });
      }
    })();
  }, [navigate]);

  // 로딩 상태 처리
  if (isLoading || correct == null || total == null || scorePercent == null) {
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
        <S.Group>{groupName}</S.Group>
        <S.Title>{quizTitle}</S.Title>

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
                state: { correct, total, scorePercent, quizResultId },
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
