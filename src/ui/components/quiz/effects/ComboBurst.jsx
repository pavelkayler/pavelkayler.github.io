const ComboBurst = ({ streak, visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div key={streak} className="combo-burst">
      <div className="combo-burst__content">
        <i className="bi bi-fire combo-burst__icon" aria-hidden />
        <div className="combo-burst__text">
          <div className="combo-burst__label">Комбо</div>
          <div className="combo-burst__value">x{streak}</div>
        </div>
      </div>
    </div>
  );
};

export { ComboBurst };
