import { useContext } from "react";
import { Button } from "react-bootstrap";

import { QuizContext } from "../../../../core/context/Context.jsx";

const QuizFooter = ({ totalWords }) => {
  const { score, errorsCount, resetCounters } = useContext(QuizContext);

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div>
        <span className="me-3">
          Правильных:{" "}
          <span className="fw-semibold text-success">
            {score}
          </span>
        </span>
        <span>
          Неправильных:{" "}
          <span className="fw-semibold text-danger">
            {errorsCount}
          </span>
        </span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">
          Всего слов в сессии: {totalWords}
        </span>
        <Button
          variant="outline-secondary"
          size="sm"
          type="button"
          onClick={resetCounters}
        >
          Сбросить счётчики
        </Button>
      </div>
    </div>
  );
};

export { QuizFooter };
