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

    const isLeft = side === "left";

    return (
      <ListGroupItem
        key={item.id}
        variant={variant}
        className={`quiz-item ${isLeft ? "quiz-item-left" : "quiz-item-right"}`}
        onClick={handleClick}
      >
        {isLeft ? (
          <>
            <span className={`quiz-text text-end ${textClass}`}>{text}</span>
            <span className="quiz-icon-cell">{icon}</span>
          </>
        ) : (
          <>
            <span className="quiz-icon-cell">{icon}</span>
            <span className={`quiz-text text-start ${textClass}`}>{text}</span>
          </>
        )}
      </ListGroupItem>
    );
  };

  return (
    <Row
      className={`quiz-columns g-3 row-cols-2 row-cols-md-2 ${hasStarted ? "is-visible" : ""}`}
    >
      <Col className="d-flex flex-column">
        <div className="column-title text-end justify-content-end">
          <span className="pill-label">q</span>
        </div>
        <ListGroup className="shadow-sm quiz-list">
          {leftItems.map((item) => renderItem(item, "left"))}
        </ListGroup>
      </Col>
      <Col className="d-flex flex-column">
        <div className="column-title">
          <span className="pill-label">a</span>
        </div>
        <ListGroup className="shadow-sm quiz-list">
          {rightItems.map((item) => renderItem(item, "right"))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export { QuizColumns };
