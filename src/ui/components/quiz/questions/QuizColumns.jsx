import { useContext } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

import { QuizContext } from "../../../../core/context/Context.jsx";

const QuizColumns = ({ hasStarted }) => {
  const {
    leftItems,
    rightItems,
    currentPrompt,
    feedback,
    isRunning,
    isQuizFinished,
    handleItemClick,
  } = useContext(QuizContext);

  const getIcon = (item, side) => {
    if (!hasStarted) {
      return null;
    }

    const isFeedbackItem =
      feedback &&
      feedback.side === side &&
      feedback.itemId === item.id;

    if (isFeedbackItem) {
      if (feedback.result === "correct") {
        return <i className="bi bi-check-circle-fill text-success" />;
      }
      return <i className="bi bi-x-circle-fill text-danger" />;
    }

    return <i className="bi bi-square" />;
  };

  const renderItem = (item, side) => {
    const isPromptItem =
      currentPrompt && currentPrompt.itemId === item.id;

    const isFeedbackItem =
      feedback &&
      feedback.side === side &&
      feedback.itemId === item.id;

    let variant;

    if (isFeedbackItem) {
      variant = feedback.result === "correct" ? "success" : "danger";
    } else if (isPromptItem) {
      variant = "success";
    } else {
      variant = undefined;
    }

    const handleClick = () => {
      if (!isQuizFinished && isRunning && hasStarted) {
        handleItemClick(side, item.id);
      }
    };

    const text = hasStarted ? item.text : "";
    const textClass = hasStarted
      ? "quiz-text-visible"
      : "quiz-text-hidden";

    const icon = getIcon(item, side);

    if (side === "left") {
      return (
        <ListGroupItem
          key={item.id}
          variant={variant}
          className="quiz-item"
          onClick={handleClick}
        >
          <span className={`flex-grow-1 text-end quiz-text ${textClass}`}>
            {text}
          </span>
          <span className="ms-2">{icon}</span>
        </ListGroupItem>
      );
    }

    return (
      <ListGroupItem
        key={item.id}
        variant={variant}
        className="quiz-item"
        onClick={handleClick}
      >
        <span className="me-2">{icon}</span>
        <span className={`flex-grow-1 text-start quiz-text ${textClass}`}>
          {text}
        </span>
      </ListGroupItem>
    );
  };

  return (
    <Row className="quiz-columns g-3 row-cols-2 row-cols-md-2">
      <Col className="d-flex flex-column">
        <div className="column-title text-end">
          <span className="pill-label">Q</span>
          <h5 className="mb-0 text-accent">Вопросы по React</h5>
        </div>
        <ListGroup className="shadow-sm quiz-list">
          {leftItems.map((item) => renderItem(item, "left"))}
        </ListGroup>
      </Col>
      <Col className="d-flex flex-column">
        <div className="column-title">
          <span className="pill-label">A</span>
          <h5 className="mb-0 text-accent">Ответы</h5>
        </div>
        <ListGroup className="shadow-sm quiz-list">
          {rightItems.map((item) => renderItem(item, "right"))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export { QuizColumns };
