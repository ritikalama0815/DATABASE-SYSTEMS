import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import DonatePage from "../pages/DonatePage";
import ReceiverPage from '../pages/ReceiverPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/donate",
        element: <DonatePage />,
      },
      {
        path: '/receivers',
        element: <ReceiverPage />,
      },
    ],
  },
]);

export default router;
