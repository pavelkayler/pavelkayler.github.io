import { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "react-bootstrap";

import { HistoryContext } from "../../../core/context/Context.jsx";
import { useAuthGuard } from "../../../core/hooks/useAuthGuard.js";

const History = () => {
  const { quizHistory } = useContext(HistoryContext);

  useAuthGuard();

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds = 0) => {
    const safeSeconds = Math.max(0, seconds ?? 0);
    const minutes = Math.floor(safeSeconds / 60);
    const restSeconds = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm page-card">
            <CardBody>
              <CardTitle className="fs-3 mb-3"><i className="bi bi-table me-2 text-primary" />
                Журнал прохождений викторины
              </CardTitle>

              {quizHistory.length === 0 ? (
                <p className="mb-0">Пока нет ни одной попытки.</p>
              ) : (
                <div className="history-grid">
                  {quizHistory.map((attempt, index) => (
                    <div className="history-card" key={attempt.id ?? index}>
                      <div className="history-card__header">
                        <span className="history-topic">
                          {attempt.topicTitle || "Выбранная тема"}
                        </span>
                        <span className="history-date">{formatDate(attempt.date)}</span>
                      </div>

                      <div className="history-stats">
                        <div className="history-main-row">
                          <span className="history-pill">
                            <i className="bi bi-person-circle text-primary" />
                            {attempt.userName}
                          </span>
                          <span className="history-pill">
                            <i className="bi bi-stopwatch text-warning" />
                            {formatDuration(attempt.durationSec)}
                          </span>
                        </div>

                        <div className="history-secondary-row">
                          <span className="history-pill">
                            <i className="bi bi-check-circle-fill text-success" />
                            {attempt.correct} верно
                          </span>
                          <span className="history-pill">
                            <i className="bi bi-x-circle-fill text-danger" />
                            {attempt.wrong} ошибок
                          </span>
                          <span className="history-pill">
                            <i className="bi bi-fire text-danger" />
                            Комбо {attempt.streak ?? "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { History };
