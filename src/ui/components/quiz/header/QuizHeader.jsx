// src/ui/components/quiz/header/QuizHeader.jsx
import { useContext, useMemo } from "react";
import { Button } from "react-bootstrap";

import { QuizContext } from "../../../../core/context/Context.jsx";
import { ComboBurst } from "../effects/ComboBurst.jsx";

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const restSeconds = safeSeconds % 60;

  const minutesText = String(minutes).padStart(2, "0");
  const secondsText = String(restSeconds).padStart(2, "0");

  return `${minutesText}:${secondsText}`;
};

const QuizHeader = ({ streak, hasStarted, countdown, onStart }) => {
  const {
    questions,
    currentPrompt,
    timeLeft,
    isRunning,
    isQuizFinished,
    finishQuiz,
    score,
    errorsCount,
  } = useContext(QuizContext);

  const timerText = useMemo(() => formatTime(timeLeft), [timeLeft]);
  const totalWords = useMemo(() => questions.length * 2, [questions]);
  const totalAnswered = score + errorsCount;
  const remaining = Math.max(totalWords - totalAnswered, 0);

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

  const comboText = streak >= 3 ? `Комбо x${streak}` : "Комбо готовится";

  return (
    <div className="quiz-header">
      <div className="quiz-meta-strip">
        <div className="meta-chip">
          <i className="bi bi-stopwatch me-2 text-warning" />
          <span className="text-muted">Время</span>
          <strong className="ms-2">{timerText}</strong>
        </div>

        <div className="meta-chip">
          <i className="bi bi-check-circle-fill me-2 text-success" />
          <span className="text-muted">Верно</span>
          <strong className="ms-2">{score}</strong>
        </div>

        <div className="meta-chip">
          <i className="bi bi-x-circle-fill me-2 text-danger" />
          <span className="text-muted">Ошибки</span>
          <strong className="ms-2">{errorsCount}</strong>
        </div>

        <div className="meta-chip">
          <i className="bi bi-fire me-2 text-danger" />
          <span className="text-muted">Комбо</span>
          <strong className="ms-2">{comboText}</strong>
        </div>
      </div>

      <div className="prompt-card">
        <ComboBurst streak={streak} />

        <p className="prompt-subtitle">
          Сопоставьте вопросы по React с правильными ответами
        </p>
        <div className="prompt-word">
          {centerText || "Нажмите \"Начать\""}
        </div>

        <div className="prompt-actions">
          <Button
            variant={primaryVariant}
            size="lg"
            type="button"
            onClick={handlePrimaryClick}
            disabled={primaryDisabled}
          >
            {primaryLabel}
          </Button>
            <div className="prompt-progress">
              <div className="progress" role="progressbar" aria-valuenow={totalAnswered} aria-valuemin="0" aria-valuemax={totalWords}>
                <div
                  className="progress-bar bg-primary"
                  style={{ width: `${(totalAnswered / totalWords) * 100}%` }}
                >
                  {totalAnswered} / {totalWords}
                </div>
              </div>
              <div className="prompt-progress-text text-muted">
                Осталось карточек: {remaining}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export { QuizHeader };
