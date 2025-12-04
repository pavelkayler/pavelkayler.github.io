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
} from "react-bootstrap";

import { QuizContext } from "../../../core/context/Context.jsx";
import { useAuthGuard } from "../../../core/hooks/useAuthGuard.js";

const Topics = () => {
  const { initQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  useAuthGuard();

  const handleSelect = () => {
    initQuiz();
    navigate("/quiz");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-4 page-card">
            <CardBody>
              <CardTitle className="fs-4 mb-3 text-center">
                <i className="bi bi-grid-3x3-gap-fill me-2 text-primary" />
                Выбор темы
              </CardTitle>

              <Card className="mb-3 border-primary">
                <CardBody>
                  <CardTitle className="fs-5 mb-2">
                    <i className="bi bi-book-half me-2 text-primary" />
                    React: основы и практики
                  </CardTitle>
                  <CardText className="mb-3 text-muted">
                    Сопоставляйте вопросы по React с краткими
                    ответами, чтобы освежить знания по хукам,
                    состоянию и жизненному циклу.
                  </CardText>
                  <Button variant="primary" type="button" onClick={handleSelect}>
                    Выбрать тему
                  </Button>
                </CardBody>
              </Card>

              <CardText className="text-muted small mb-0">
                В будущем здесь появятся и другие темы.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { Topics };
