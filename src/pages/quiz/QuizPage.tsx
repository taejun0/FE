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
const token = localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";

// 응답 타입
type SubmitResponse = {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    result: {
      quiz_result_id: number;
      score: number;
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

// 보기 인덱스(0, 1, 2, 3...)를 'A', 'B', 'C', 'D'... 문자로 변환하는 헬퍼 함수
const indexToLetter = (index: number): string => {
  return String.fromCharCode(65 + index);
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

  // 제출
  const onSubmit = async () => {
    try {
      const current_quiz_result_id = Number(
        localStorage.getItem("quiz_result_id") || 0
      );
      // 모든 문항 답변 체크
      if (questions.length === 0) return;
      const answeredCount = Object.keys(answers).length;
      if (answeredCount !== questions.length) {
        alert("모든 문항에 답변을 완료해 주세요.");
        return;
      }

      if (current_quiz_result_id === 0) {
        alert("퀴즈 결과 ID가 유효하지 않습니다. 퀴즈를 다시 시작해 주세요.");
        return;
      }

      const transformedAnswers = questions.map((question, i) => {
        const answer = answers[question.id];
        const question_number = i + 1; // 1부터 시작하는 문제 번호

        let user_answer: string = answer.value as string;

        if (question.type === "객관식" && answer.value) {
          const options = question.options;

          if (options && options.length > 0) {
            const selectedIndex = options.findIndex((opt) => {
              return opt.text.trim() === (answer.value as string).trim();
            });

            if (selectedIndex !== -1) {
              user_answer = indexToLetter(selectedIndex);
            } else {
              console.error(
                `Error: Could not map answer value to option letter for question ID ${question.id}`
              );
              const trimmedValue = (answer.value as string).trim();
              const match = trimmedValue.match(/^\((.)\)/);
              user_answer = match ? match[1] : trimmedValue;
            }
          }
        }

        return {
          question_number: question_number,
          user_answer: user_answer,
        };
      });

      const payload: {
        quiz_result_id: number;
        answers: { question_number: number; user_answer: string }[];
      } = {
        quiz_result_id: current_quiz_result_id,
        answers: transformedAnswers,
      };

      const url = `${baseURL}quiz/submit`;

      const res = await axios.post<SubmitResponse>(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data?.isSuccess) {
        throw new Error(res.data?.message || "제출에 실패했습니다.");
      }

      navigate(`/quiz/${quizId}/result`);
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
