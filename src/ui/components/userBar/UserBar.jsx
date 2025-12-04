import { useContext } from "react";
import { Button, Container } from "react-bootstrap";

import { UserContext } from "../../../core/context/Context.jsx";

const UserBar = () => {
  const { isAuth, userName, logout } = useContext(UserContext);

  if (!isAuth) {
    return null;
  }

  const displayName = userName?.trim() || "Пользователь";

  return (
    <footer className="user-footer mt-auto" aria-label="Панель пользователя">
      <Container fluid className="user-footer__container">
        <div className="user-footer__content">
          <div className="user-footer__identity" aria-live="polite">
            <i className="bi bi-person-circle text-primary" aria-hidden="true" />
            <span className="fw-semibold">{displayName}</span>
          </div>

          <Button
            variant="outline-danger"
            type="button"
            className="user-footer__logout"
            onClick={logout}
          >
            Выйти
          </Button>
        </div>
      </Container>
    </footer>
  );
};

export { UserBar };
