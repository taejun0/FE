import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import { ROUTE_PATHS } from '@constants/RouteConstants';

import MainPage from './pages/mainpage/MainPage';
import SplashPage from './pages/splash/SplashPage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import RoomDetailPage from './pages/roomDetail/RoomDetailPage';

import { NotFound } from '@pages/notFound/NotFound';

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.MAIN,
    element: <App />,
    children: [
      {
        path: ROUTE_PATHS.MAIN,
        element: <SplashPage />,
      },
      {
        path: ROUTE_PATHS.HOME,
        element: <MainPage />,
      },
      {
        path: ROUTE_PATHS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTE_PATHS.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTE_PATHS.ROOM_DETAIL,
        element: <RoomDetailPage />,
      },
      {
        path: ROUTE_PATHS.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
