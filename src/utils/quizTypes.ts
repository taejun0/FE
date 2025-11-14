export type QuestionResponse = {
  id: number;
  type: string; // "OX" | "객관식" | "단답형"
  question_number: number;
  question_text: string;
  correct_answer: string;
  explanation: string;
  options: { id: number; option_text: string }[];
};

export type QuizMeta = {
  id: number;
  title: string;
  total_questions: number;
  groupName: string; // 💡 그룹명 추가
};

export type Question = {
  id: number;
  type: "OX" | "객관식" | "단답형";
  question_number: number;
  text: string;
  options?: { id: number; text: string }[];
};

export type Answer = {
  questionId: number;
  type: Question["type"];
  value: string | null;
};

export type SubmitPayload = {
  quizId: number;
  answers: { questionId: number; answer: string | null }[];
};
