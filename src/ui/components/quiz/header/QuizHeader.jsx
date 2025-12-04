// src/ui/components/quiz/header/QuizHeader.jsx
import { useContext, useMemo } from "react";
import { Button } from "react-bootstrap";

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
  const { currentPrompt, timeLeft } = useContext(QuizContext);

  const timerText = useMemo(() => formatTime(timeLeft), [timeLeft]);

  let centerText = "";

  if (countdown !== null) {
    centerText = countdown === 0 ? "Старт!" : String(countdown);
  } else if (!hasStarted && currentPrompt) {
    centerText = currentPrompt.text;
  }

  const showIntroCard = countdown !== null || !hasStarted;

  return (
    <div className="quiz-header">
      <div className="quiz-timer" aria-live="polite">
        <i className="bi bi-stopwatch me-2 text-warning" />
        <span className="fw-semibold">{timerText}</span>
      </div>

      {showIntroCard && (
        <div className="prompt-card">
          <p className="prompt-subtitle">
            Сопоставьте вопросы по React с правильными ответами
          </p>
          <div className="prompt-word">
            {centerText || "Нажмите \"Начать\""}
          </div>

          <div className="prompt-actions">
            <Button
              variant="primary"
              size="lg"
              type="button"
              onClick={onStart}
              disabled={countdown !== null}
            >
              Начать
            </Button>
            <p className="prompt-hint text-muted mb-0">
              5 минут, чтобы собрать максимум правильных пар
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { QuizHeader };
