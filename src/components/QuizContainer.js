import React, { useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import ImageBox from "./ImageBox";
import NewGame from "./NewGame";
import Quiz from "./Quiz";

const QuizContainer = ({
  imgSrc,
  newGame,
  createGame,
  currentQuestion,
  questionIdx,
  numberOfQuestions,
  nextQuestion,
}) => {
  return (
    <>
      <Row>
        <Col>
          <ImageBox imgSrc={imgSrc} />
        </Col>
      </Row>
      <Row>
        <Col>
          {!newGame ? (
            <NewGame createGame={createGame} />
          ) : (
            <Quiz
              currentQuestion={currentQuestion}
              questionIdx={questionIdx}
              createGame={createGame}
              numberOfQuestions={numberOfQuestions}
              nextQuestion={nextQuestion}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default QuizContainer;
