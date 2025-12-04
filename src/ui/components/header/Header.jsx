import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import { QuizContext, UserContext } from "../../../core/context/Context.jsx";

const Header = () => {
  const { isAuth, userName } = useContext(UserContext);
  const { topic } = useContext(QuizContext);

  if (!isAuth) {
    return null;
  }

  return (
    <Navbar
      bg="white"
      variant="light"
      expand="md"
      className="mb-2 shadow-sm app-navbar user-header"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/topics" className="brand-topic">
          {topic?.title || "Выбор темы"}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-2 align-items-center">
            <Nav.Link as={Link} to="/topics" className="fw-semibold">
              <i className="bi bi-grid-3x3-gap-fill me-1" />
              Темы
            </Nav.Link>
            <Nav.Link as={Link} to="/history" className="fw-semibold">
              <i className="bi bi-clock-history me-1" />
              История
            </Nav.Link>
            <span className="user-chip compact">
              <i className="bi bi-person-circle me-2" />
              <span className="fw-semibold">{userName}</span>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { Header };
