export const ROUTE_PATHS = {
  MAIN: "/",
  HOME: "/home",
  LOGIN: "/login",
  SIGNUP: "/signup",
  NOT_FOUND: "*",
  TEST: "/test",
  ROOM_DETAIL: "/room/:roomId",
  QUIZ_DETAIL: "/quiz/:id",
  QUIZ_RESULT: "/quiz/:id/result",
  QUIZ_REVIEW: "/quiz/:resultId/review",
  QUIZ_QA: "/quiz/:quizId/qa-room",
};

export const buildRoomDetailPath = (roomId: string | number) =>
  `/room/${roomId}`;
