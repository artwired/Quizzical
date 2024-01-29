import React from "react";
import Landing from "./Landing";
import QuizPage from "./QuizPage";

export default function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);

  function beginQuiz() {
    setStartQuiz(true);
  }

  return <>{startQuiz ? <QuizPage /> : <Landing beginQuiz={beginQuiz} />}</>;
}
