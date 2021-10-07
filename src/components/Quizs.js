import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import NewGame from "./NewGame";

const MyButton = styled.button`
  width: 100%;
  border-color: darkgrey;
  color: grey;
  background-color: white;
`;

const renderHTML = (escapedHTML: string) =>
  React.createElement("div", {
    dangerouslySetInnerHTML: { __html: escapedHTML },
  });

const Quiz = ({ currentQuestion }) => {
  const [btnDisable, setBtnDisable] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [btnColor, setBtnColor] = useState([
    "white",
    "white",
    "white",
    "white",
  ]);
  //const [bgcolor, setBgcolor] = useState("white");

  const handleOnclick = (e) => {
    // e.preventDefault();
    console.log("e id ", e.currentTarget.id);
    //setBtnDisable("disabled");
    setIsSubmit(true);
    if (e.currentTarget.value === currentQuestion.answer) {
      console.log("correct answer!");
      switch (parseInt(e.currentTarget.id)) {
        case 0:
          setBtnColor(["green", "white", "white", "white"]);
          break;
        case 1:
          setBtnColor(["white", "green", "white", "white"]);
          break;
        case 2:
          setBtnColor(["white", "white", "green", "white"]);
          break;
        case 3:
          setBtnColor(["white", "white", "white", "green"]);
          break;
      }
    } else {
      console.log("wrong answer!");
      switch (parseInt(e.currentTarget.id)) {
        case 0:
          setBtnColor(["red", "white", "white", "white"]);
          break;
        case 1:
          setBtnColor(["white", "red", "white", "white"]);
          break;
        case 2:
          setBtnColor(["white", "white", "red", "white"]);
          break;
        case 3:
          setBtnColor(["white", "white", "white", "red"]);
          break;
      }
    }
  };
  useEffect(() => {
    setIsSubmit(false);
  }, [currentQuestion]);
  return (
    <>
      <Row xs={2}>
        {currentQuestion.choices.map((choice, i) => (
          <Col key={i}>
            {!isSubmit ? (
              <MyButton
                id={i}
                name={choice}
                type="submit"
                key={i}
                onClick={handleOnclick}
                value={choice}
              >
                {renderHTML(choice)}
              </MyButton>
            ) : (
              <MyButton
                id={i}
                style={{ backgroundColor: btnColor[i] }}
                name={choice}
                type="submit"
                key={i}
                disabled="disable"
              >
                {renderHTML(choice)}
              </MyButton>
            )}
          </Col>
        ))}
      </Row>
    </>
  );
};

const Quizs = ({
  createGame,
  currentQuestion,
  questionIdx,
  numberOfQuestions,
  nextQuestion,
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
        <Quiz currentQuestion={currentQuestion} />
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

export default Quizs;
