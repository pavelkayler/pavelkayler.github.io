const ComboBurst = ({ streak }) => {
  if (streak < 3) {
    return null;
  }

  return (
    <div key={streak} className="combo-burst">
      <i className="bi bi-fire me-2" />Комбо x{streak}!
    </div>
  );
};

export { ComboBurst };
