import React, { useState, useEffect } from "react";
import QuestionsComponent from "./QuestionsComponent";
import CalcScore from "./CalcScore";

export default function QuizPage({ quizData, setQuizData, beginQuiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [playAgainClicked, setPlayAgainClicked] = useState(false);

  useEffect(() => {
    if (playAgainClicked && quizData === null) {
      // Only fetch new questions when playAgainClicked is true and quizData is null
      fetchNewQuestions();
    }
  }, [playAgainClicked, quizData]);

  useEffect(() => {
    // Reset state when new quizData is received
    setSelectedAnswers({});
    setShowScore(false);
    setAnswersChecked(false);
  }, [quizData]);

  async function fetchNewQuestions() {
    try {
      setFetching(true);

      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );

      if (response.ok) {
        const data = await response.json();
        setQuizData(data.results); // Set new quizData
        beginQuiz(); // This will trigger the useEffect in App.jsx to update quizData
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetching(false);
    }
  }

  function handleScore() {
    setShowScore(true);
    setAnswersChecked(true); // Set answersChecked to true when the "Check answers" button is clicked
  }

  function handlePlayAgain() {
    if (!fetching) {
      setQuizData(null); // Reset quizData to null
      setPlayAgainClicked(true);
    }
  }

  const questionsComponent =
    quizData &&
    quizData.map((question, index) => (
      <QuestionsComponent
        key={index}
        question={question.question}
        wrongAnswers={question.incorrect_answers}
        correctAnswer={question.correct_answer}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
        answersChecked={answersChecked}
      />
    ));

  function calculateScore() {
    let score = 0;

    if (quizData) {
      quizData.forEach((question) => {
        const selectedAnswer = selectedAnswers[question.question];
        const correctAnswer = question.correct_answer;
        if (selectedAnswer === correctAnswer) {
          score += 1;
        }
      });
    }

    return score;
  }

  return (
    <main className="quiz-page-container">
      {questionsComponent}
      {showScore ? (
        <CalcScore
          score={calculateScore()}
          quizData={quizData}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <div className="check-answer-container">
          <button className="large-btn check-btn" onClick={handleScore}>
            Check answers
          </button>
        </div>
      )}
    </main>
  );
}
