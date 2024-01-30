// QuestionsComponent.jsx
import React, { useState, useEffect } from "react";

export default function QuestionsComponent({
  question,
  wrongAnswers,
  correctAnswer,
  selectedAnswers,
  setSelectedAnswers,
  answersChecked,
}) {
  const [shuffledAnswerOptions, setShuffledAnswerOptions] = useState([]);

  useEffect(() => {
    const allAnswerOptions = [correctAnswer, ...wrongAnswers];
    setShuffledAnswerOptions(shuffleArray(allAnswerOptions));
  }, [correctAnswer, wrongAnswers]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleAnswer(answer) {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = { ...prevSelectedAnswers, [question]: answer };
      return updatedAnswers;
    });
  }

  return (
    <div className="question-container">
      <p className="question">{question}</p>
      {shuffledAnswerOptions.map((answer, index) => (
        <div className="answers-container" key={index}>
          <button
            onClick={() => handleAnswer(answer)}
            className={`answer-btn ${
              selectedAnswers[question] === answer ? "clicked" : ""
            } ${
              answersChecked && answer === correctAnswer
                ? "correct"
                : answersChecked &&
                  selectedAnswers[question] === answer &&
                  answer !== correctAnswer
                ? "wrong"
                : ""
            }`}
          >
            {answer}
          </button>
        </div>
      ))}
    </div>
  );
}
