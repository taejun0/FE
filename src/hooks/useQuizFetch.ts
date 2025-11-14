import { useEffect, useState } from "react";
import axios from "axios";
// QusetionResponse는 백엔드 응답 타입으로 사용
import type { QuestionResponse, Question, QuizMeta } from "@utils/quizTypes";
import { quizDetailMock } from "../mocks/quizDetail.mock"; // 목 데이터 파일 경로는 주석 처리

// .env에 VITE_USE_MOCK=true 이면 목 사용
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const baseURL = import.meta.env.VITE_BASE_URL;

type ApiEnvelope = {
  isSuccess: boolean;
  message?: string;
  data: {
    // 💡 group_name 필드 추가
    quiz: {
      id: number;
      title: string;
      total_questions: number;
      group_name: string;
    };
    questions: QuestionResponse[];
  };
};

export function useQuizFetch(quizId: number) {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<QuizMeta | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const token =
      localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";
    console.log(token);
    (async () => {
      try {
        let envelope: ApiEnvelope;

        // if (USE_MOCK) {
        //   envelope = quizDetailMock;
        // } else {

        // envelope = (await axios.get<ApiEnvelope>(`${baseURL}quiz/${quizId}`))
        //   .data;
        envelope = (
          await axios.get<ApiEnvelope>(`${baseURL}quiz/${quizId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).data;

        // }
        console.log(envelope);

        if (!envelope.isSuccess) {
          console.error("API Error:", envelope);
          throw new Error(envelope.message || "API 호출 실패");
        }

        const { quiz, questions } = envelope.data;

        // 💡 groupName 매핑 추가
        setQuiz({
          id: quiz.id,
          title: quiz.title,
          total_questions: quiz.total_questions,
          groupName: quiz.group_name,
        });

        // QuestionResponse에서 필요한 필드(id, type, question_text, options)만 Question 타입으로 변환
        // correct_answer와 explanation은 퀴즈 응시 단계에서는 제외됩니다.
        const formatted: Question[] = questions.map((q) => ({
          id: q.id,
          type: q.type as Question["type"],
          question_number: q.question_number,
          text: q.question_text,
          options: q.options?.map((o) => ({ id: o.id, text: o.option_text })),
        }));

        setQuestions(formatted);
      } catch (e) {
        console.error("Failed to fetch quiz data:", e);
        setQuiz(null);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [quizId]);

  return { loading, quiz, questions };
}
