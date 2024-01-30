// App.jsx
import React, { useState, useEffect } from "react";
import Landing from "./Landing";
import QuizPage from "./QuizPage";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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

    if (startQuiz) {
      fetchData();
    }
  }, [startQuiz]);

  function beginQuiz() {
    setStartQuiz(true);
  }

  return (
    <>
      {startQuiz ? (
        <QuizPage
          quizData={quizData}
          beginQuiz={beginQuiz}
          setQuizData={setQuizData}
        />
      ) : (
        <Landing beginQuiz={beginQuiz} />
      )}
    </>
  );
}
