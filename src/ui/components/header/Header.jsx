import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";

import { QuizContext, UserContext } from "../../../core/context/Context.jsx";

const Header = () => {
  const location = useLocation();
  const { isAuth, userName, logout } = useContext(UserContext);
  const {
    topic,
    timeLeft,
    isRunning,
    isQuizFinished,
    wasStarted,
    countdown,
    finishQuiz,
    resetTopic,
  } = useContext(QuizContext);

  const isQuizPage = location.pathname === "/quiz";
  const isTopicsPage = location.pathname === "/topics";
  const isHistoryPage = location.pathname === "/history";

  const timerText = useMemo(() => {
    const safeSeconds = Math.max(0, timeLeft ?? 0);
    const minutes = Math.floor(safeSeconds / 60);
    const restSeconds = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(
      2,
      "0",
    )}`;
  }, [timeLeft]);

  const countdownText = useMemo(() => {
    if (countdown === null) {
      return null;
    }

    return countdown === 0 ? "Старт" : String(countdown);
  }, [countdown]);

  const [isLogoutMode, setIsLogoutMode] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLogoutMode(false);
  }, [location.pathname, userName]);

  if (!isAuth) {
    return null;
  }

  const handleTopicClick = () => {
    resetTopic();
  };

  const showQuizControls = isQuizPage && wasStarted && !isQuizFinished;
  const isCountdownActive = countdownText !== null;
  const displayName = userName?.trim() || "Пользователь";

  const handleAuthToggle = () => {
    if (isLogoutMode) {
      logout();
      setIsLogoutMode(false);
      return;
    }

    setIsLogoutMode(true);
  };

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
            <div className={`quiz-timer ${isCountdownActive ? "is-counting" : ""}`} aria-live="polite">
              <i className="bi bi-stopwatch me-2 text-warning" />
              <span className="fw-semibold">{isCountdownActive ? countdownText : timerText}</span>
            </div>

            <Button
              variant="outline-danger"
              className="header-finish-btn ms-auto"
              type="button"
              onClick={finishQuiz}
              disabled={!isRunning}
            >
              Завершить
            </Button>
          </div>
        ) : (
          <div className="header-grid">
            <Navbar.Brand
              as={Link}
              to="/topics"
              onClick={handleTopicClick}
              className="brand-topic header-grid__brand"
            >
              {isTopicsPage || isHistoryPage ? "Выбор темы" : topic?.title || "Тема"}
            </Navbar.Brand>

            <div className="header-grid__center">
              <button
                type="button"
                className={`auth-status-pill ${isLogoutMode ? "is-logout" : ""}`}
                aria-live="polite"
                aria-pressed={isLogoutMode}
                onClick={handleAuthToggle}
              >
                <span className="status-dot" aria-hidden="true" />
                <span className="fw-semibold">{isLogoutMode ? "Выйти" : displayName}</span>
              </button>
            </div>

            <div className="header-grid__actions">
              <Button
                variant="outline-primary"
                className="nav-pill-btn"
                as={Link}
                to={isHistoryPage ? "/topics" : "/history"}
                type="button"
              >
                {isHistoryPage ? "Пройти тест" : "История"}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export { Header };
