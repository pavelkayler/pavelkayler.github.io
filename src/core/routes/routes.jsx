import { createBrowserRouter } from "react-router-dom";

import AuthPage from "../../ui/pages/authPage/AuthPage.jsx";
import QuizPage from "../../ui/pages/quizPage/QuizPage.jsx";
import ResultPage from "../../ui/pages/resultPage/ResultPage.jsx";
import HistoryPage from "../../ui/pages/historyPage/HistoryPage.jsx";
import TopicsPage from "../../ui/pages/topicsPage/TopicsPage.jsx";

const routes = createBrowserRouter([
  { path: "/", element: <AuthPage /> },
  { path: "/topics", element: <TopicsPage /> },   // выбор темы
  { path: "/quiz", element: <QuizPage /> },
  { path: "/result", element: <ResultPage /> },
  { path: "/history", element: <HistoryPage /> },
  { path: "*", element: <AuthPage /> },
]);

export { routes };
