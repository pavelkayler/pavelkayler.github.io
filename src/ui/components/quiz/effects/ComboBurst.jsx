const ComboBurst = ({ streak, visible }) => {
  if (!visible) {
    return null;
  }

  const isCritical = streak >= 10;

  const toneClass = (() => {
    if (streak >= 9) return "combo-burst--red";
    if (streak >= 7) return "combo-burst--orange";
    if (streak >= 5) return "combo-burst--yellow";
    return "combo-burst--green";
  })();

  return (
    <div
      key={streak}
      className={`combo-burst ${toneClass} ${isCritical ? "combo-burst--critical" : ""}`}
    >
      <div className="combo-burst__content">
        <i className="bi bi-fire combo-burst__icon" aria-hidden />
        <div className="combo-burst__text">
          <div className="combo-burst__label">Комбо</div>
          <div className="combo-burst__value">x{streak}</div>
        </div>
      </div>

      {isCritical && (
        <div className="combo-burst__crit" aria-hidden>
          <span className="combo-burst__crit-icon">✨</span>
          <span className="combo-burst__crit-text">Критический удар!</span>
        </div>
      )}
    </div>
  );
};

export { ComboBurst };
