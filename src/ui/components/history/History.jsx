import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table,
} from "react-bootstrap";

import { UserContext, HistoryContext } from "../../../core/context/Context.jsx";

const History = () => {
  const { isAuth } = useContext(UserContext);
  const { quizHistory } = useContext(HistoryContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

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
                <Table striped bordered hover responsive className="mb-0">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Дата</th>
                    <th>Пользователь</th>
                    <th>Правильных</th>
                    <th>Неправильных</th>
                    <th>Время, сек</th>
                    <th>Стрик</th>
                  </tr>
                  </thead>
                  <tbody>
                  {quizHistory.map((attempt, index) => (
                    <tr key={attempt.id ?? index}>
                      <td>{index + 1}</td>
                      <td>{new Date(attempt.date).toLocaleString()}</td>
                      <td>{attempt.userName}</td>
                      <td>{attempt.correct}</td>
                      <td>{attempt.wrong}</td>
                      <td>{attempt.durationSec ?? "-"}</td>
                      <td>{attempt.streak ?? "-"}</td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { History };
