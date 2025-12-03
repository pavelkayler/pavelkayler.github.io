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
      <Navbar
        bg="white"
        variant="light"
        expand="md"
        className="mb-2 shadow-sm app-navbar"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/topics" className="brand-icon">
            <i className="bi bi-controller text-primary" aria-hidden />
            <span className="visually-hidden">На список тем</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto gap-2">
              <Nav.Link as={Link} to="/topics" className="fw-semibold">
                <i className="bi bi-grid-3x3-gap-fill me-1" />
                Темы
              </Nav.Link>
              <Nav.Link as={Link} to="/history" className="fw-semibold">
                <i className="bi bi-clock-history me-1" />
                История
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <UserHeader />
    </>
  );
};

export { Header };
