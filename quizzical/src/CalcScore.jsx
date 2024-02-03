import React from "react";

export default function CalcScore({ score, onPlayAgain }) {
  return (
    <div className="score-container">
      <p className="answer-txt">{`You scored ${score}/5 correct answers`}</p>
      <button className="large-btn" onClick={onPlayAgain}>
        Play again
      </button>
    </div>
  );
}
