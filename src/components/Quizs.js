import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Quiz from "./Quiz";
import { renderHTML } from "../helper";

import NewGame from "./NewGame";

const Quizs = ({
  createGame,
  currentQuestion,
  questionIdx,
  numberOfQuestions,
  nextQuestion,
  handleScore,
}) => {
  const [remainder, setRemainder] = useState(10);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setRemainder((prevR) => prevR - 1);
    }, 1000);
    return () => clearInterval(timer.current);
  }, [questionIdx]);

  useEffect(() => {
    if (remainder < 1) {
      clearInterval(timer.current);
    }
  }, [remainder]);

  const resetTimer = () => {
    clearInterval(timer.current);
    setRemainder(10);
  };

  const onNextQuestion = () => {
    nextQuestion();
    setRemainder(10);
  };

  return (
    <>
      <h4 style={{ textAlign: "center", paddingTop: "35px" }}>
        Question {questionIdx + 1} of {numberOfQuestions}
      </h4>
      <h5 style={{ paddingTop: "15px" }}>
        {renderHTML(currentQuestion.question)}
      </h5>
      <Container style={{ paddingTop: "50px" }}>
        <Quiz
          currentQuestion={currentQuestion}
          handleScore={handleScore}
          remainder={remainder}
        />
        <Row style={{ paddingTop: "50px" }}>
          <Col style={{ textAlign: "center" }}>Time Left: {remainder}</Col>
        </Row>
        <Row style={{ paddingTop: "50px" }}>
          <Col style={{ textAlign: "center" }}>
            <NewGame createGame={createGame} />
            <button onClick={onNextQuestion}>Next Question</button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Quizs;
