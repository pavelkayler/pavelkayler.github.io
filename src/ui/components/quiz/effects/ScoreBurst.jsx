const ScoreBurst = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return <div className="score-burst">+1</div>;
};

export { ScoreBurst };
