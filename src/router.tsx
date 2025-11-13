import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { ROUTE_PATHS } from "@constants/RouteConstants";

import MainPage from "./pages/mainpage/MainPage";
import SplashPage from "./pages/splash/SplashPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import RoomDetailPage from "./pages/roomDetail/RoomDetailPage";
import QuizPage from "./pages/quiz/QuizPage";
import QuizResultPage from "./pages/quiz/QuizResultPage";
import QuizReviewPage from "./pages/quiz/QuizReviewPage";

import { NotFound } from "@pages/notFound/NotFound";
import QuizQaRoomPage from "./pages/QA/QuizQaRoomPage";

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
        path: ROUTE_PATHS.QUIZ_DETAIL,
        element: <QuizPage />,
      },
      {
        path: ROUTE_PATHS.QUIZ_RESULT,
        element: <QuizResultPage />,
      },
      {
        path: ROUTE_PATHS.QUIZ_REVIEW,
        element: <QuizReviewPage />,
      },
      {
        path: ROUTE_PATHS.QUIZ_QA,
        element: <QuizQaRoomPage />,
      },
      {
        path: ROUTE_PATHS.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
