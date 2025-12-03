import { useContext, useMemo } from "react";

import { QuizContext } from "../../../../core/context/Context.jsx";

const QuizFooter = ({ totalWords }) => {
  const { score, errorsCount } = useContext(QuizContext);

  const answered = useMemo(
    () => score + errorsCount,
    [errorsCount, score],
  );
  const remaining = Math.max(totalWords - answered, 0);

  return (
    <div className="quiz-footer mt-4">
      <div className="footer-grid">
        <div className="footer-card">
          <div className="footer-title">Всего слов</div>
          <div className="footer-value">{totalWords}</div>
        </div>

        <div className="footer-card">
          <div className="footer-title">Отвечено</div>
          <div className="footer-value text-primary">{answered}</div>
          <div className="footer-sub">Осталось: {remaining}</div>
        </div>

        <div className="footer-card">
          <div className="footer-title">Верно</div>
          <div className="footer-value text-success">{score}</div>
        </div>

        <div className="footer-card">
          <div className="footer-title">Ошибки</div>
          <div className="footer-value text-danger">{errorsCount}</div>
        </div>
      </div>
    </div>
  );
};

export { QuizFooter };
