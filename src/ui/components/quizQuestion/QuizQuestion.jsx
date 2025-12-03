import { Row, Col, Form, FormGroup, FormLabel, FormSelect } from "react-bootstrap";

const QuizQuestion = ({ question, rightOptions, selectedRightId, onSelect }) => {
  if (!question) {
    return null;
  }

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === "") {
      onSelect(question.id, undefined);
      return;
    }

    const parsed = Number(value);
    onSelect(question.id, Number.isNaN(parsed) ? undefined : parsed);
  };

  return (
    <Row className="align-items-center mb-3">
      <Col md={6}>{question.left}</Col>
      <Col md={6}>
        <Form>
          <FormGroup className="mb-0">
            <FormLabel className="mb-1">Выберите соответствие</FormLabel>
            <FormSelect value={selectedRightId ?? ""} onChange={handleChange}>
              <option value="">— не выбрано —</option>
              {rightOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.text}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

export { QuizQuestion };
