// src/ui/components/quiz/header/QuizHeader.jsx
import { useContext, useMemo } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";

import { QuizContext } from "../../../../core/context/Context.jsx";

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const restSeconds = safeSeconds % 60;

  const minutesText = String(minutes).padStart(2, "0");
  const secondsText = String(restSeconds).padStart(2, "0");

  return `${minutesText}:${secondsText}`;
};

const QuizHeader = ({ hasStarted, countdown, onStart }) => {
  const {
    currentPrompt,
    timeLeft,
    isRunning,
    isQuizFinished,
    finishQuiz,
  } = useContext(QuizContext);

  const timerText = useMemo(
    () => formatTime(timeLeft),
    [timeLeft],
  );

  // ВАЖНО: без "—" по умолчанию
  let centerText = "";

  if (countdown !== null) {
    centerText = countdown === 0 ? "Старт!" : String(countdown);
  } else if (currentPrompt) {
    centerText = currentPrompt.text;
  }

  const showStartButton = !hasStarted;
  const primaryLabel = showStartButton ? "Начать" : "Завершить";
  const primaryVariant = showStartButton ? "primary" : "outline-primary";

  const handlePrimaryClick = () => {
    if (showStartButton) {
      onStart();
    } else {
      finishQuiz();
    }
  };

  const primaryDisabled =
    !showStartButton && (!isRunning && isQuizFinished);

  return (
    <>
      <h2 className="fs-4 mb-3 text-center">
        Сопоставьте английские и русские слова
      </h2>

      <Row className="align-items-center mb-4">
        <Col xs={4} className="d-flex justify-content-start mb-2 mb-md-0">
          <div className="quiz-timer">
            Время:{" "}
            <span className="fw-semibold">
              {timerText}
            </span>
          </div>
        </Col>
        <Col xs={4}>
          <ListGroup>
            <ListGroupItem className="text-center fw-semibold prompt-word">
              {centerText}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={4} className="d-flex justify-content-end mt-2 mt-md-0">
          <Button
            variant={primaryVariant}
            size="sm"
            type="button"
            onClick={handlePrimaryClick}
            disabled={primaryDisabled}
          >
            {primaryLabel}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export { QuizHeader };
