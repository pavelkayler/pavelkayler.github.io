import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { QuizContext } from "../../../core/context/Context.jsx";
import { useAuthGuard } from "../../../core/hooks/useAuthGuard.js";

const Result = () => {
  const { questions, score, errorsCount, initQuiz } = useContext(QuizContext);

  const navigate = useNavigate();

  useAuthGuard();

  const handleRestart = () => {
    initQuiz();
    navigate("/quiz");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Card className="p-4 shadow-sm page-card text-center">
            <CardBody>
              <CardTitle className="fs-3 mb-3"><i className="bi bi-trophy-fill me-2 text-warning" />Результат</CardTitle>
              <CardText className="fs-5 mb-2">
                Правильных ответов: {score}
              </CardText>
              <CardText className="mb-4">
                Неправильных ответов: {errorsCount}
              </CardText>
              <Button
                variant="success"
                type="button"
                onClick={handleRestart}
              >
                Пройти снова
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <CardBody>
              <CardTitle className="fs-4 mb-3">
                Вопросы и ответы викторины
              </CardTitle>

              <ListGroup>
                {questions.map((pair) => (
                  <ListGroupItem key={pair.id} className="mb-2">
                    <div className="fw-semibold mb-1">
                      {pair.left}
                    </div>
                    <div>{pair.right}</div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { Result };
