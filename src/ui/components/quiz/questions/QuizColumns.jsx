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
          <span className={`flex-grow-1 text-end ${textClass}`}>
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
        <span className={`flex-grow-1 text-start ${textClass}`}>
          {text}
        </span>
      </ListGroupItem>
    );
  };

  return (
    <Row>
      <Col md={6} className="mb-4 mb-md-0">
        <h5 className="mb-3 text-end text-accent">
          Английские слова
        </h5>
        <ListGroup>
          {leftItems.map((item) => renderItem(item, "left"))}
        </ListGroup>
      </Col>
      <Col md={6}>
        <h5 className="mb-3 text-accent">Русские слова</h5>
        <ListGroup>
          {rightItems.map((item) => renderItem(item, "right"))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export { QuizColumns };
