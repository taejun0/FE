import { useEffect, useState } from "react";
import axios from "axios";
import type { QuestionResponse, Question, QuizMeta } from "@utils/quizTypes";

const baseURL = import.meta.env.VITE_BASE_URL;

type ApiEnvelope = {
  isSuccess: boolean;
  message?: string;
  data: {
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

        setQuiz({
          id: quiz.id,
          title: quiz.title,
          total_questions: quiz.total_questions,
          groupName: quiz.group_name,
        });

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
