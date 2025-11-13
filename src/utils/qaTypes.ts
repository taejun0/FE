// src/utils/qaTypes.ts

// 1. 사용자 정보 타입
export type UserInfo = {
  nickname: string;
};

// 2. QA 댓글 타입 (API 응답 구조 반영)
export type QaComment = {
  id: number;
  content: string;
  user: UserInfo;
  created_at: string;
};

// 3. QA 게시글 타입 (API 응답 구조 반영)
export type QaPost = {
  id: number;
  title: string;
  content: string;
  user: UserInfo;
  created_at: string;
  comments: QaComment[];
  // 💡 API에 `question_index` 같은 정보가 없으므로,
  // 💡 프론트에서 임시 매핑을 위해 이 필드는 제외하고 로직으로 처리합니다.
};

// 4. 퀴즈 문제 타입 (API 응답의 questions 배열은 현재 비어있지만, 추후 데이터가 채워질 것을 가정)
export type QuizQuestion = {
  question_id: number;
  question_text: string;
  type: "OX" | "객관식" | "단답형";
  explanation: string;
  options?: { id: number; option_text: string }[];
  user_answer: string | null;
  correct_answer: string;
  is_correct: boolean;

  // 💡 프론트엔드에서 매핑 후 사용할 QA 게시글 필드 (API 응답에는 없음)
  qa_board: QaPost[];
};

// 5. API 응답 데이터 구조 정의
export type QuizMeta = {
  id: number;
  title: string;
  difficulty: string;
  round: number;
  total_questions: number;
  group_name: string;
  questions: QuizQuestion[];
};

export type QaBoardMeta = {
  board_id: number;
  board_title: string;
  board_type: string;
  posts: QaPost[];
};

export type QaRoomResponseData = {
  quiz: QuizMeta;
  qa_board: QaBoardMeta;
};

// 6. API 통합 조회 응답 타입 (최상위 구조)
export type QaRoomResponse = {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: QaRoomResponseData;
};

// 7. 목데이터 (API의 questions 필드가 비어있으므로, 임시 문제 목록을 유지합니다.)
export const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    question_id: 1,
    question_text: "Q1. 자료구조 1차 시험지에서 자료구조의 정의를 논하시오.",
    type: "OX" as const,
    explanation: "자료구조는 데이터를 효율적으로 관리 및 접근하는 방법입니다.",
    options: [
      { id: 1, option_text: "O" },
      { id: 2, option_text: "X" },
    ],
    user_answer: "O",
    correct_answer: "O",
    is_correct: true,
    qa_board: [], // API 응답으로 대체될 예정
  },
  {
    question_id: 2,
    question_text: "Q2. 큐(Queue)와 스택(Stack)의 차이점은 무엇인가? (객관식)",
    type: "객관식" as const,
    explanation: "큐는 FIFO, 스택은 LIFO 방식입니다.",
    options: [
      { id: 1, option_text: "1. FIFO vs LIFO" },
      { id: 2, option_text: "2. LIFO vs FIFO" },
      { id: 3, option_text: "3. 모두 FIFO" },
      { id: 4, option_text: "4. 모두 LIFO" },
    ],
    user_answer: "1",
    correct_answer: "1",
    is_correct: true,
    qa_board: [],
  },
  {
    question_id: 3,
    question_text: "Q3. 이진 탐색 트리의 장점을 3가지 서술하시오. (서술형)",
    type: "단답형" as const,
    explanation: "탐색 속도가 빠르고, 정렬된 순서를 유지합니다.",
    options: [],
    user_answer: "탐색속도 빠름",
    correct_answer: "탐색속도 빠름, 삽입 용이, 메모리 효율적",
    is_correct: false,
    qa_board: [],
  },
];
