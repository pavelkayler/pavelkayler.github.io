// src/ui/components/quiz/header/QuizHeader.jsx
import { useContext } from "react";
import { Button } from "react-bootstrap";

import { QuizContext } from "../../../../core/context/Context.jsx";

const QuizHeader = ({ hasStarted, countdown, onStart }) => {
  const { currentPrompt } = useContext(QuizContext);

  let centerText = "";

  if (countdown !== null) {
    centerText = countdown === 0 ? "Старт!" : String(countdown);
  } else if (!hasStarted && currentPrompt) {
    centerText = currentPrompt.text;
  }

  const showIntroCard = countdown !== null || !hasStarted;

  return (
    <div className="quiz-header">
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
          </div>
        </div>
      )}
    </div>
  );
};

export { QuizHeader };
