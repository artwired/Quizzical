// CalcScore.jsx
import React from "react";

export default function CalcScore({ score, quizData, onPlayAgain }) {
  return (
    <div className="score-container">
      <p>{`You scored ${score}/5 correct answers`}</p>
      <button className="large-btn" onClick={onPlayAgain}>
        Play again
      </button>
    </div>
  );
}
