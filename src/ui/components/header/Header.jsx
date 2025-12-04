import { useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";

import { QuizContext, UserContext } from "../../../core/context/Context.jsx";

const Header = () => {
  const location = useLocation();
  const { isAuth } = useContext(UserContext);
  const {
    topic,
    timeLeft,
    isRunning,
    isQuizFinished,
    wasStarted,
    finishQuiz,
    resetTopic,
  } = useContext(QuizContext);

  const isQuizPage = location.pathname === "/quiz";
  const isTopicsPage = location.pathname === "/topics";

  const timerText = useMemo(() => {
    const safeSeconds = Math.max(0, timeLeft ?? 0);
    const minutes = Math.floor(safeSeconds / 60);
    const restSeconds = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(
      2,
      "0",
    )}`;
  }, [timeLeft]);

  if (!isAuth) {
    return null;
  }

  const handleTopicClick = () => {
    resetTopic();
  };

  const showQuizControls = isQuizPage && wasStarted && !isQuizFinished;

  return (
    <Navbar
      bg="white"
      variant="light"
      expand="md"
      className="mb-2 shadow-sm app-navbar user-header"
    >
      <Container fluid>
        {showQuizControls ? (
          <div className="quiz-top-bar">
            <div className="quiz-timer" aria-live="polite">
              <i className="bi bi-stopwatch me-2 text-warning" />
              <span className="fw-semibold">{timerText}</span>
            </div>

            <Button
              variant="outline-danger"
              className="header-finish-btn"
              type="button"
              onClick={finishQuiz}
              disabled={!isRunning}
            >
              Завершить
            </Button>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between w-100">
            <Navbar.Brand
              as={Link}
              to="/topics"
              onClick={handleTopicClick}
              className="brand-topic"
            >
              {isTopicsPage ? "Выбор темы" : topic?.title || "Тема"}
            </Navbar.Brand>

            <div className="d-flex align-items-center gap-2">
              <Button variant="outline-primary" as={Link} to="/history" type="button">
                История
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export { Header };
