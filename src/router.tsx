import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import { ROUTE_PATHS } from '@constants/RouteConstants';

import { MainPage } from './pages/mainpage/MainPage';

import { NotFound } from '@pages/notFound/NotFound';

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.MAIN,
    element: <App />,
    children: [
      {
        path: ROUTE_PATHS.MAIN,
        element: <MainPage />,
      },
      {
        path: ROUTE_PATHS.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
