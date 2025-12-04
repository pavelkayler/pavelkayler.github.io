// src/ui/components/quiz/header/QuizHeader.jsx
import { useContext } from "react";
import { Button } from "react-bootstrap";

import { QuizContext } from "../../../../core/context/Context.jsx";

const QuizHeader = ({
  hasStarted,
  countdown,
  onStart,
  isFadingOut,
  showIntroCard,
}) => {
  const { currentPrompt } = useContext(QuizContext);

  let centerText = "";

  if (!hasStarted && currentPrompt) {
    centerText = currentPrompt.text;
  }

  const shouldRender = showIntroCard && !hasStarted;

  return (
    <div className={`quiz-header ${isFadingOut ? "is-fading" : ""}`}>
      {shouldRender && (
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
          </div>
        </div>
      )}
    </div>
  );
};

export { QuizHeader };
