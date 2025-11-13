import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useQuizFetch } from "@hooks/useQuizFetch";
import type { Answer } from "@utils/quizTypes";
import QuestionCard from "@components/quiz/QuestionCard";
import QuizNavigator from "@components/quiz/QuizNavigator";
import logoQroomText from "../../assets/images/Logo.png";
import * as S from "./QuizPage.styles";

const STORAGE = "quiz_answers_v1";
const baseURL = import.meta.env.VITE_BASE_URL;

// 응답 타입(명세 기반)
type SubmitResponse = {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    result: {
      quiz_result_id: number;
      score: number; // 퍼센트
      correct_count: number;
      total_questions: number;
      status: "completed" | string;
    };
    message?: string;
    timeStamp?: string;
  };
};

// 에러 메시지 안전 추출
const getErrorMessage = (e: unknown): string => {
  if (typeof e === "string") return e;
  if (e && typeof e === "object") {
    const anyErr = e as { message?: string; response?: unknown };
    const resData = (anyErr.response as { data?: { message?: string } })?.data
      ?.message;
    return resData || anyErr?.message || "제출 중 오류가 발생했습니다.";
  }
  return "제출 중 오류가 발생했습니다.";
};

export default function QuizPage() {
  const { id } = useParams();
  const quizId = Number(id);
  const { loading, quiz, questions } = useQuizFetch(quizId);
  const navigate = useNavigate();
  const location = useLocation() as unknown as {
    state?: { resultId?: number | null };
  };

  // 복구(로컬스토리지)
  const [answers, setAnswers] = useState<Record<number, Answer>>(() => {
    const raw = localStorage.getItem(`${STORAGE}:${quizId}`);
    return raw ? JSON.parse(raw) : {};
  });
  const [index, setIndex] = useState(0);
  const current = questions[index];

  // 자동 저장
  useEffect(() => {
    localStorage.setItem(`${STORAGE}:${quizId}`, JSON.stringify(answers));
  }, [answers, quizId]);

  const handleAnswer = (value: string) => {
    if (!current) return;
    setAnswers((prev) => ({
      ...prev,
      [current.id]: { questionId: current.id, type: current.type, value },
    }));
  };

  const canNext = useMemo(() => {
    if (!current) return false;
    const v = answers[current.id]?.value ?? null;
    if (current.type === "단답형") return (v ?? "").trim().length > 0;
    return v !== null;
  }, [current, answers]);

  const onPrev = () => setIndex((i) => Math.max(0, i - 1));
  const onNext = () => setIndex((i) => Math.min(questions.length - 1, i + 1));

  // 공통: 토큰 찾기(프로젝트마다 키가 다를 수 있어 널리 쓰는 키들을 확인)
  const getAuthToken = () =>
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("Authorization") ||
    "";

  // 제출
  const onSubmit = async () => {
    try {
      // 모든 문항 답변 체크
      if (questions.length === 0) return;
      const answeredCount = Object.keys(answers).length;
      if (answeredCount !== questions.length) {
        alert("모든 문항에 답변을 완료해 주세요.");
        return;
      }

      // 명세에 맞춘 payload 변환
      const payload: {
        quiz_result_id?: number;
        quiz_id: number;
        answers: { question_id: number; type: string; user_answer: string }[];
      } = {
        quiz_id: quizId,
        answers: Object.values(answers).map((a) => ({
          question_id: a.questionId,
          type: a.type, // "OX" | "객관식" | "단답형"
          user_answer: a.value as string, // <-- 타입 에러 해결
        })),
      };

      // (선택) 기존에 생성된 resultId가 있으면 포함
      const existingResultId =
        location?.state?.resultId ??
        (Number(localStorage.getItem(`quiz_result_id:${quizId}`)) || undefined);
      if (existingResultId) payload.quiz_result_id = existingResultId;

      const token = getAuthToken();
      const url = `${baseURL.replace(/\/$/, "")}/quiz/submit`;

      const res = await axios.post<SubmitResponse>(url, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        withCredentials: true,
      });

      if (!res.data?.isSuccess) {
        throw new Error(res.data?.message || "제출에 실패했습니다.");
      }

      const r = res.data.data.result;

      // resultId를 저장(추후 재시도/리뷰 등에 활용 가능)
      localStorage.setItem(
        `quiz_result_id:${quizId}`,
        String(r.quiz_result_id)
      );
      // 필요 시 답안 캐시 제거
      // localStorage.removeItem(`${STORAGE}:${quizId}`);

      // 결과 페이지로 이동(기존 네비게이션 포맷 유지)
      navigate(`/quiz/${quizId}/result`, {
        state: {
          resultId: r.quiz_result_id,
          correct: r.correct_count,
          total: r.total_questions,
          scorePercent: r.score, // 명세에서 score가 60처럼 %로 옴
          message: res.data.data.message ?? "채점이 완료되었습니다.",
        },
        replace: true,
      });
    } catch (err: unknown) {
      console.error(err);
      alert(getErrorMessage(err));
    }
  };

  if (loading) return <S.Wrapper>로딩 중...</S.Wrapper>;
  if (!quiz || questions.length === 0)
    return <S.Wrapper>문제를 불러올 수 없습니다.</S.Wrapper>;

  const progress = ((index + 1) / quiz.total_questions) * 100;

  return (
    <S.Page>
      <S.Logo src={logoQroomText} alt="Qroom" />
      <S.Wrapper>
        <S.Header>
          <h3>{quiz.groupName}</h3>
          <h1>{quiz.title}</h1>
          <p>
            {index + 1} <span> / {quiz.total_questions}</span>
          </p>
          <S.Progress>
            <S.Bar w={progress} />
          </S.Progress>
        </S.Header>

        <QuestionCard
          question={current}
          answerValue={answers[current.id]?.value ?? null}
          onAnswer={handleAnswer}
        />

        <QuizNavigator
          index={index}
          total={questions.length}
          onPrev={onPrev}
          onNext={onNext}
          onSubmit={onSubmit}
          canNext={canNext}
        />
      </S.Wrapper>
    </S.Page>
  );
}
