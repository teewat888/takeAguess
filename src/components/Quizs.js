import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Quiz from "./Quiz";
import { renderHTML } from "../helper";
import { AppContext } from "../App";

import NewGame from "./NewGame";

const Quizs = () => {
  const timeToPlay = 20;
  const [remainder, setRemainder] = useState(timeToPlay);
  const timer = useRef();
  const { currentQuestion, questionIdx, numberOfQuestions, nextQuestion } =
    useContext(AppContext);

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
    setRemainder(timeToPlay);
    console.log("question indx ", questionIdx);
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
        <Quiz remainder={remainder} />
        <Row style={{ paddingTop: "50px" }}>
          <Col style={{ textAlign: "center" }}>Time Left: {remainder}</Col>
        </Row>
        <Row style={{ paddingTop: "50px" }}>
          <Col style={{ textAlign: "center" }}>
            {questionIdx + 1 < numberOfQuestions ? (
              <button onClick={onNextQuestion}>Next Question</button>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Quizs;
