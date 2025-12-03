const ComboBurst = ({ streak }) => {
  if (streak < 3) {
    return null;
  }

  return (
    <div key={streak} className="combo-burst">
      Комбо x{streak}!
    </div>
  );
};

export { ComboBurst };
