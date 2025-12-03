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
    navigate("/", { replace: true });
  };

  return (
    <div className="user-header border-bottom bg-light mb-3">
      <Container fluid className="py-3">
        <Row className="align-items-center gy-3 justify-content-between flex-column flex-md-row">
          <Col className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
            <div className="user-chip">
              <i className="bi bi-person-circle me-2" />
              <span className="fw-semibold">{userName}</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <span className="stat-chip">
                <i className="bi bi-box-arrow-in-right me-1 text-success" />
                Входов: {userStats.loginCount}
              </span>
              <span className="stat-chip">
                <i className="bi bi-box-arrow-right me-1 text-secondary" />
                Выходов: {userStats.logoutCount}
              </span>
            </div>
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              size="sm"
              type="button"
              onClick={handleLogout}
            >
              <i className="bi bi-door-closed me-2" />
              Выйти
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export { UserHeader };
