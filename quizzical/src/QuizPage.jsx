// QuizPage.jsx
import React, { useState, useEffect } from "react";
import QuestionsComponent from "./QuestionsComponent";
import CalcScore from "./CalcScore";

export default function QuizPage({ resetQuiz }) {
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [newQuiz, setNewQuiz] = useState(false);
  const [answersChecked, setAnswersChecked] = useState(false);

  useEffect(() => {
    fetchQuestionData(); // Fetch questions when the component mounts
  }, []);

  function resetQuiz() {
    setNewQuiz(true);
  }
  const fetchQuestionData = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();
      setQuizData(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  function handleScore() {
    setShowScore(true);
    setAnswersChecked(true); // Set answersChecked to true when the "Check answers" button is clicked
  }

  function handlePlayAgain() {
    setShowScore(false);
    setAnswersChecked(false); // Reset answersChecked
    setSelectedAnswers({}); // Reset selected answers
    fetchQuestionData(); // Fetch new questions
  }

  const questionsComponent = quizData.map((question, index) => (
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
    quizData.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.question];
      const correctAnswer = question.correct_answer;
      if (selectedAnswer === correctAnswer) {
        score += 1;
      }
    });
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
