const ScoreBurst = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="score-burst">
      <span className="score-burst__spark" aria-hidden>
        ✦
      </span>
      <span className="score-burst__value">+1</span>
    </div>
  );
};

export { ScoreBurst };
