export const ROUTE_PATHS = {
  MAIN: '/',
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  NOT_FOUND: '*',
  TEST: '/test',
  ROOM_DETAIL: '/room/:roomId',
  QUIZ: '/quiz/:quizId',
  QUIZ_QA: '/quiz/:quizId/qa-room',
};

export const buildRoomDetailPath = (roomId: string | number) => `/room/${roomId}`;

export const buildQuizPath = (quizId: string | number) => `/quiz/${quizId}`;

export const buildQuizQaPath = (quizId: string | number) => `/quiz/${quizId}/qa-room`;
