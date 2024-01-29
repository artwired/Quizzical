import React from "react";

export default function Landing({ beginQuiz }) {
  return (
    <div className="landing-page-container">
      <h1>Quizzical</h1>
      <p className="description-txt">
        Answer quiz questions, test your knowledge, have fun!
      </p>
      <button onClick={beginQuiz} className="large-btn">
        Start quiz
      </button>
    </div>
  );
}
