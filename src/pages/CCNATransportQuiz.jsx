import React from "react";
import Quiz from "../components/Quiz";
import questionsData from "../data/ccna-transport-questions.json";

const CCNATransportQuiz = () => {
  return (
    <Quiz
      questions={questionsData}
      title="CCNA: Transport & Application Layer"
      description="TCP/UDP fundamentals, application protocols, and port numbers"
    />
  );
};

export default CCNATransportQuiz;
