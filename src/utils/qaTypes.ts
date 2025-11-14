// src/utils/qaTypes.ts (최종 수정된 전체 코드)

// 1. 사용자 정보 타입
export type UserInfo = {
  nickname: string;
};

// 2. QA 댓글 타입
export type QaComment = {
  id: number;
  content: string;
  user: UserInfo;
  created_at: string;
};

// 3. QA 게시글 타입
export type QaPost = {
  id: number;
  title: string;
  content: string;
  user: UserInfo;
  created_at: string;
  comments: QaComment[];
};

// 4. 객관식 옵션 타입
export type Option = {
  id: number;
  option_text: string;
};

// 5. 퀴즈 문제 타입
export type QuizQuestion = {
  id: number;
  type: "OX" | "객관식" | "단답형";
  //   type: string;
  question_text: string;
  correct_answer: string;
  explanation: string;
  options?: Option[];

  // 💡 프론트에서 필요한 추가 필드
  question_id?: number;
  user_answer?: string | null;
  is_correct?: boolean;
};

// 6. 퀴즈 메타 정보 타입 (API 응답의 "quiz" 필드)
export type QuizMeta = {
  id: number;
  title: string;
  difficulty: string;
  round: number;
  total_questions: number;
  group_name: string;
  questions: QuizQuestion[]; // 💡 문제 배열이 quiz 객체 안에 있습니다.
};

// 7. QA 게시판 메타 정보 타입 (API 응답의 "qa_board" 필드)
export type QaBoardMeta = {
  board_id: number;
  board_title: string;
  board_type: string;
  posts: QaPost[];
};

// 8. API 응답 데이터 구조 정의 (최상위 "data" 내부)
export type QaRoomResponseData = {
  quiz: QuizMeta; // 💡 quiz 안에 questions가 포함되어 있습니다.
  qa_board: QaBoardMeta;
};

// 9. API 통합 조회 응답 타입 (최상위 구조)
export type QaRoomResponse = {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: QaRoomResponseData;
};

// 10. MOCK_QUESTIONS 제거 (API 연동을 위해)
// export const MOCK_QUESTIONS = [...] <-- 제거됨
