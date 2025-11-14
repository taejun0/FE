import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoQroomText from "../../assets/images/Logo.png";
import axios from "axios";
import * as S from "./QuizReviewPage.styles";

// API 설정 (환경 변수 및 토큰 사용)
const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";
const quiz_result_id =
  localStorage.getItem("quiz_result_id") || "FALLBACK_TOKEN";

// 로컬 스토리지에서 퀴즈 결과 ID를 가져올 키 정의
// const LAST_QUIZ_RESULT_ID_KEY = "qroom_last_quiz_result_id";

// API 명세서에 맞춰 타입 정의 업데이트
type ReviewHead = {
  quiz_id: number;
  group_name: string; // API에 새로 추가된 필드
  score: number;
  correct_count: number;
  total_questions: number;
  created_at: string | null;
};

// API 명세서에 맞춰 타입 정의 업데이트
type ReviewAnswer = {
  quiz_result_id: number;
  question_id: number;
  question_number: number; // API에 새로 추가된 필드 (문제 번호)
  question_text: string;
  type: "OX" | "객관식" | "단답형";
  explanation: string;
  options: { id: number; option_text: string }[];
  user_answer: string | null;
  correct_answer: string;
  is_correct: boolean;
};

// API 응답 전체 구조
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
  //   const { resultId: paramResultId } = useParams(); // URL 파라미터에서 resultId를 가져옴 (백업)
  const navigate = useNavigate();

  // 로컬 스토리지에서 ID를 우선적으로 가져오고, 없으면 URL 파라미터 사용
  //   const storedId = localStorage.getItem(LAST_QUIZ_RESULT_ID_KEY);
  //   const quizResultId = storedId || paramResultId; // 이 변수를 API 호출에 사용

  const [loading, setLoading] = useState(true);
  const [head, setHead] = useState<ReviewHead | null>(null);
  const [items, setItems] = useState<ReviewAnswer[]>([]);

  useEffect(() => {
    // 퀴즈 결과 ID 유효성 검사: ID가 로컬 스토리지나 URL에서 모두 발견되지 않으면 에러 처리
    if (!quiz_result_id) {
      console.error(
        "퀴즈 결과 ID가 로컬 스토리지나 URL에서 발견되지 않았습니다."
      );
      alert("퀴즈 결과 ID를 찾을 수 없습니다.");
      setLoading(false);
      navigate("/home");
      return;
    }

    const fetchReviewData = async () => {
      // API 설정 확인
      if (!baseURL || token === "FALLBACK_TOKEN") {
        console.error("API baseURL 또는 인증 토큰이 설정되지 않았습니다.");
        setLoading(false);
        return;
      }

      try {
        const url = `${baseURL}quiz/result/${quiz_result_id}`; // local storage/param ID 사용
        console.log(`API 호출: ${url}`);

        // 실제 API 호출
        const { data: response } = await axios.get<ReviewResponse>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.isSuccess) {
          setHead(response.data.quiz_result);
          setItems(response.data.answers);
        } else {
          // API 호출은 성공했으나 isSuccess가 false인 경우 (서버 비즈니스 로직 오류)
          console.error("API 응답 오류:", response.message);
          alert(`정답/오답 데이터를 불러오지 못했어요: ${response.message}`);
          navigate(-1);
        }
      } catch (e) {
        console.error("API 요청 중 오류 발생:", e);
        // 네트워크 또는 서버 오류
        alert("정답/오답 데이터를 불러오지 못했어요. (네트워크/서버 오류)");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [quiz_result_id, navigate]); // quizResultId를 의존성 배열에 추가

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
            {/* API에서 받은 group_name을 사용하여 그룹명을 표시 */}
            <S.Group>{head?.group_name}</S.Group>
            <S.Title>퀴즈 결과 리뷰</S.Title> {/* 퀴즈 제목은 임시로 표시 */}
          </S.NameBox>
          <S.ScoreBox>
            <p>총평 </p>
            <b>
              {head?.correct_count}/{head?.total_questions}
            </b>
          </S.ScoreBox>
        </S.Header>

        {items.map((q) => {
          // API에서 받은 question_number를 사용하여 문제 번호 표시
          const num = q.question_number;

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

                      // 정답 표시 로직 개선: 선택한 답이 정답인 경우 'correct', 오답인 경우 'wrong'
                      let correctness: "correct" | "wrong" | undefined =
                        undefined;
                      if (isUserSelected) {
                        correctness = q.is_correct ? "correct" : "wrong";
                      } else if (mark === q.correct_answer) {
                        // 사용자가 선택하지 않았더라도 정답 자체는 파란색으로 표시 (추가 피드백)
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

              {/* ✅ 객관식: 선택한 보기에만 색 표시 (맞으면 파랑, 틀리면 빨강) */}
              {q.type === "객관식" && (
                <>
                  {q.options.map((opt) => {
                    // user_answer가 opt.id 또는 opt.option_text와 일치하는지 확인
                    const isUserSelected =
                      String(opt.id) === q.user_answer ||
                      opt.option_text === q.user_answer;
                    const isCorrectAnswer =
                      String(opt.id) === q.correct_answer ||
                      opt.option_text === q.correct_answer;

                    // 정답 표시 로직 개선:
                    let correctness: "correct" | "wrong" | undefined =
                      undefined;

                    if (isUserSelected) {
                      // 사용자가 선택한 경우
                      correctness = q.is_correct ? "correct" : "wrong";
                    } else if (isCorrectAnswer) {
                      // 사용자가 선택하지 않았더라도 정답인 경우 (파란색으로 표시)
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

              {/* 단답형: 내 답은 정오에 따라, 정답 배지는 항상 파랑 */}
              {q.type === "단답형" && (
                <>
                  {/* 내 답 표시 */}
                  <S.AnswerBadge ok={q.is_correct}>
                    내 답: {q.user_answer ?? "미응답"}
                  </S.AnswerBadge>

                  {/* 정답과 오답이 다를 경우에만 정답 표시 */}
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
        {/* URL 파라미터를 사용하여 QA 게시판으로 이동 (quiz_id를 사용한다고 가정) */}
        <S.PrimaryButton
          onClick={() => navigate(`/quiz/${head?.quiz_id}/qa-room`)}
        >
          QA 게시판 이동
        </S.PrimaryButton>
        <S.Button onClick={() => navigate("/home")}>나가기</S.Button>
      </S.Actions>
    </S.Page>
  );
}
