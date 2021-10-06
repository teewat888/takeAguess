import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import NewGame from "./NewGame";

const MyButton = styled(Button)`
  width: 100%;
  border-color: darkgrey;
  color: grey;
  background-color: white;
`;

const Quiz = ({
  createGame,
  currentQuestion,
  questionIdx,
  numberOfQuestions,
  nextQuestion,
}) => {
  const renderHTML = (escapedHTML: string) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: escapedHTML },
    });

  const [remainder, setRemainder] = useState(10);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setRemainder((prevR) => prevR - 1);
    }, 1000);
    return () => clearInterval(timer.current);
  }, [questionIdx]);
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
        <Row>
          <Col>
            <MyButton>adfsfsfsfsfsfsffsfssff</MyButton>
          </Col>
          <Col>
            <MyButton>a</MyButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <MyButton>a</MyButton>
          </Col>
          <Col>
            <MyButton>a</MyButton>
          </Col>
        </Row>
        <Row style={{ paddingTop: "50px" }}>
          <Col style={{ textAlign: "center" }}>Time Left: {remainder}</Col>
        </Row>
        <Row style={{ paddingTop: "50px" }}>
          <Col style={{ textAlign: "center" }}>
            <NewGame createGame={createGame} />
            <button onClick={resetTimer}>Stop timer</button>
            <button onClick={onNextQuestion}>Next Question</button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Quiz;
