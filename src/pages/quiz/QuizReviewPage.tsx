import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoQroomText from "../../assets/images/Logo.png";
import axios from "axios";
import * as S from "./QuizReviewPage.styles";

type ReviewAnswer = {
  quiz_result_id: number;
  question_id: number;
  question_text: string;
  type: "OX" | "객관식" | "단답형";
  explanation: string;
  options: { id: number; option_text: string }[];
  user_answer: string | null;
  correct_answer: string;
  is_correct: boolean;
};

type ReviewHead = {
  quiz_id: number;
  score: number;
  correct_count: number;
  total_questions: number;
  created_at: string | null;
};

type ReviewResponse = {
  isSuccess: boolean;
  data: {
    quiz_result: ReviewHead;
    answers: ReviewAnswer[];
  };
};

export default function QuizReviewPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [head, setHead] = useState<ReviewHead | null>(null);
  const [items, setItems] = useState<ReviewAnswer[]>([]);

  // 실제 연동 시 아래 주석을 풀고 mock useEffect를 제거하면 됨
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get<ReviewResponse>(`/api/quiz-results/${resultId}`);
  //       setHead(data.data.quiz_result);
  //       setItems(data.data.answers);
  //     } catch (e) {
  //       console.error(e);
  //       alert("정답/오답 데이터를 불러오지 못했어요.");
  //       navigate(-1);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [resultId, navigate]);

  useEffect(() => {
    // 목데이터
    const mockData = {
      quiz_result: {
        quiz_id: 19,
        score: 60,
        correct_count: 3,
        total_questions: 5,
        created_at: null,
      },
      answers: [
        {
          quiz_result_id: 5,
          question_id: 6,
          question_text: "회원은 여러 상품을 주문할 수 있다. (O/X)",
          type: "OX" as const,
          explanation: "회원과 주문은 일대다 관계다.",
          options: [
            { id: 1, option_text: "O" },
            { id: 2, option_text: "X" },
          ],
          user_answer: "O",
          correct_answer: "X",
          is_correct: false,
        },
        {
          quiz_result_id: 5,
          question_id: 7,
          question_text: "주문과 상품의 관계는?",
          type: "객관식" as const,
          explanation:
            "주문과 상품은 다대다 관계이며, 이를 주문상품 엔티티로 풀었다.",
          options: [
            { id: 3, option_text: "1. 일대다" },
            { id: 4, option_text: "2. 다대다" },
            { id: 5, option_text: "3. 일대일" },
            { id: 6, option_text: "4. 다대일" },
          ],
          user_answer: "3",
          correct_answer: "3",
          is_correct: true,
        },
        {
          quiz_result_id: 5,
          question_id: 8,
          question_text: "상품의 종류는?",
          type: "단답형" as const,
          explanation: "상품은 세 가지 종류로 구분된다.",
          options: [],
          user_answer: "도메인 모델",
          correct_answer: "도서, 음반, 영화",
          is_correct: false,
        },
        {
          quiz_result_id: 5,
          question_id: 8,
          question_text: "상품의 종류는?",
          type: "단답형" as const,
          explanation: "상품은 세 가지 종류로 구분된다.",
          options: [],
          user_answer: "도메인 모델",
          correct_answer: "도서, 음반, 영화",
          is_correct: false,
        },
      ],
    };

    setHead(mockData.quiz_result);
    setItems(mockData.answers);
    setLoading(false);
  }, []);

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
            <S.Group>그룹명</S.Group>
            <S.Title>챕터 1~3 질문</S.Title>
          </S.NameBox>
          <S.ScoreBox>
            <p>총평 </p>
            <b>
              {head?.correct_count}/{head?.total_questions}
            </b>
          </S.ScoreBox>
        </S.Header>

        {items.map((q, idx) => {
          const num = idx + 1;

          return (
            <S.Block key={q.question_id}>
              <S.QTitle>
                Q{num}. {q.question_text}
              </S.QTitle>

              {/* ✅ OX: 선택한 보기에만 색 표시 (맞으면 파랑, 틀리면 빨강) */}
              {q.type === "OX" && (
                <>
                  <S.OXRow>
                    {["O", "X"].map((mark) => {
                      const isUserSelected = q.user_answer === mark;
                      return (
                        <S.OXOption
                          key={mark}
                          correct={
                            isUserSelected
                              ? q.is_correct
                                ? "correct"
                                : "wrong"
                              : undefined
                          }
                        >
                          {mark}
                        </S.OXOption>
                      );
                    })}
                  </S.OXRow>
                  <S.Explain>{q.explanation}</S.Explain>
                </>
              )}

              {/* ✅ 객관식: 선택한 보기에만 색 표시 (맞으면 파랑, 틀리면 빨강) */}
              {q.type === "객관식" && (
                <>
                  {q.options.map((opt) => {
                    const isUserSelected =
                      q.user_answer === String(opt.id) ||
                      q.user_answer === opt.option_text;

                    return (
                      <S.OptionRow
                        key={opt.id}
                        correct={
                          isUserSelected
                            ? q.is_correct
                              ? "correct"
                              : "wrong"
                            : undefined
                        }
                      >
                        {opt.option_text}
                      </S.OptionRow>
                    );
                  })}
                  <S.Explain>{q.explanation}</S.Explain>
                </>
              )}

              {/* 단답형: 내 답은 정오에 따라, 정답 배지는 항상 파랑 */}
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
        <S.PrimaryButton onClick={() => navigate(`/qa`)}>
          QA 게시판 이동
        </S.PrimaryButton>
        <S.Button onClick={() => navigate("/home")}>나가기</S.Button>
      </S.Actions>
    </S.Page>
  );
}
