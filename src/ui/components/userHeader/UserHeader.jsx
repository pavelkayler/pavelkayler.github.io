import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import { UserContext } from "../../../core/context/Context.jsx";

const UserHeader = () => {
  const { isAuth, userName, userStats, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!isAuth) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container fluid className="border-bottom py-2 bg-light mb-3">
      <Row className="align-items-center gx-3">
        <Col xs="auto">Пользователь: {userName}</Col>
        <Col xs="auto">Входов: {userStats.loginCount}</Col>
        <Col xs="auto">Выходов: {userStats.logoutCount}</Col>
        <Col xs="auto">
          <Button variant="outline-secondary" size="sm" type="button" onClick={handleLogout}>
            Выйти
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export { UserHeader };
