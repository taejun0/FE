export const ROUTE_PATHS = {
  MAIN: '/',
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  NOT_FOUND: '*',
  TEST: '/test',
  ROOM_DETAIL: '/room/:roomId',
};

export const buildRoomDetailPath = (roomId: string | number) => `/room/${roomId}`;
