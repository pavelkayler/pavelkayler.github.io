import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import { UserContext } from "../../../core/context/Context.jsx";
import { UserHeader } from "../userHeader/UserHeader.jsx";

const Header = () => {
  const { isAuth } = useContext(UserContext);

  if (!isAuth) {
    return null;
  }

  return (
    <>
      <Navbar bg="white" variant="light" expand="md" className="mb-2 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/topics" className="fw-bold">
            <i className="bi bi-controller me-2 text-primary" />
            Викторина
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/topics">
              <i className="bi bi-grid-3x3-gap-fill me-1" />
              Темы
            </Nav.Link>
            <Nav.Link as={Link} to="/history">
              <i className="bi bi-clock-history me-1" />
              История
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <UserHeader />
    </>
  );
};

export { Header };
