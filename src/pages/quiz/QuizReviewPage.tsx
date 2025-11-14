import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoQroomText from "../../assets/images/Logo.png";
import axios from "axios";
import * as S from "./QuizReviewPage.styles";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";

const indexToLetter = (index: number): string => {
  return String.fromCharCode(65 + index);
};

type ReviewHead = {
  quiz_id: number;
  group_name: string;
  score: number;
  correct_count: number;
  total_questions: number;
  created_at: string | null;
};

type ReviewAnswer = {
  quiz_result_id: number;
  question_id: number;
  question_number: number;
  question_text: string;
  type: "OX" | "객관식" | "단답형";
  explanation: string;
  options: { id: number; option_text: string }[];
  user_answer: string | null; // 'A', 'B', 'C', 'D' 또는 'O', 'X' 또는 단답형 텍스트
  correct_answer: string; // 'A', 'B', 'C', 'D' 또는 'O', 'X' 또는 단답형 텍스트
  is_correct: boolean;
};

type ReviewResponse = {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    quiz_result: ReviewHead;
    answers: ReviewAnswer[];
  };
};

export default function QuizReviewPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [head, setHead] = useState<ReviewHead | null>(null);
  const [items, setItems] = useState<ReviewAnswer[]>([]);

  const quizResultId = Number(localStorage.getItem("quiz_result_id") || 0);

  useEffect(() => {
    if (!quizResultId) {
      console.error("퀴즈 결과 ID가 로컬 스토리지에서 발견되지 않았습니다.");
      alert("퀴즈 결과 ID를 찾을 수 없습니다.");
      setLoading(false);
      navigate("/home");
      return;
    }

    const fetchReviewData = async () => {
      if (!baseURL || token === "FALLBACK_TOKEN") {
        console.error("API baseURL 또는 인증 토큰이 설정되지 않았습니다.");
        setLoading(false);
        return;
      }

      try {
        const url = `${baseURL}quiz/result/${quizResultId}`;
        console.log(`API 호출: ${url}`);

        const { data: response } = await axios.get<ReviewResponse>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(`요청에 대한 응답:`, response.data.answers);

        if (response.isSuccess) {
          setHead(response.data.quiz_result);
          setItems(response.data.answers);
        } else {
          console.error("API 응답 오류:", response.message);
          alert(`정답/오답 데이터를 불러오지 못했어요: ${response.message}`);
          navigate(-1);
        }
      } catch (e) {
        console.error("API 요청 중 오류 발생:", e);
        alert("정답/오답 데이터를 불러오지 못했어요. (네트워크/서버 오류)");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [navigate, quizResultId]);

  if (loading) {
    return (
      <S.Page>
        <S.Wrapper>불러오는 중...</S.Wrapper>
      </S.Page>
    );
  }

  return (
    <S.Page>
      <S.Logo src={logoQroomText} alt="Qroom" />
      <S.Wrapper>
        <S.Header>
          <S.NameBox>
            <S.Group>{head?.group_name}</S.Group>
            <S.Title>퀴즈 결과 리뷰</S.Title>
          </S.NameBox>
          <S.ScoreBox>
            <p>총평 </p>
            <b>
              {head?.correct_count}/{head?.total_questions}
            </b>
          </S.ScoreBox>
        </S.Header>

        {items.map((q) => {
          const num = q.question_number;

          return (
            <S.Block key={q.question_id}>
              <S.QTitle>
                Q{num}. {q.question_text}
              </S.QTitle>
              {/* OX 로직 */}
              {q.type === "OX" && (
                <>
                  <S.OXRow>
                    {["O", "X"].map((mark) => {
                      const isUserSelected = q.user_answer === mark;
                      let correctness: "correct" | "wrong" | undefined =
                        undefined;
                      if (isUserSelected) {
                        correctness = q.is_correct ? "correct" : "wrong";
                      } else if (mark === q.correct_answer) {
                        correctness = "correct";
                      }
                      return (
                        <S.OXOption key={mark} correct={correctness}>
                          {mark}
                        </S.OXOption>
                      );
                    })}
                  </S.OXRow>
                  <S.Explain>{q.explanation}</S.Explain>
                </>
              )}
              {q.type === "객관식" && (
                <>
                  {q.options.map((opt, index) => {
                    const currentLetter = indexToLetter(index);
                    const isUserSelected = currentLetter === q.user_answer;
                    const isCorrectAnswer = currentLetter === q.correct_answer;

                    let correctness: "correct" | "wrong" | undefined =
                      undefined;

                    if (isUserSelected) {
                      correctness = q.is_correct ? "correct" : "wrong";
                    } else if (isCorrectAnswer) {
                      correctness = "correct";
                    }

                    return (
                      <S.OptionRow key={opt.id} correct={correctness}>
                        {opt.option_text}
                      </S.OptionRow>
                    );
                  })}
                  <S.Explain>{q.explanation}</S.Explain>
                </>
              )}
              {q.type === "단답형" && (
                <>
                  <S.AnswerBadge ok={q.is_correct}>
                    내 답: {q.user_answer ?? "미응답"}
                  </S.AnswerBadge>
                  {!q.is_correct && (
                    <S.CorrectBadge>정답: {q.correct_answer}</S.CorrectBadge>
                  )}
                  <S.Explain>{q.explanation}</S.Explain>
                </>
              )}
            </S.Block>
          );
        })}
      </S.Wrapper>
      <S.Actions>
        <S.PrimaryButton
          onClick={() => navigate(`/quiz/${head?.quiz_id}/qa-room`)}
        >
          QA 게시판 이동
        </S.PrimaryButton>
        <S.Button onClick={() => navigate(`/home`)}>나가기</S.Button>
      </S.Actions>
    </S.Page>
  );
}
