import React, { useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import ImageBox from "./ImageBox";
import NewGame from "./NewGame";
import Quizs from "./Quizs";

const QuizContainer = ({
  imgSrc,
  newGame,
  createGame,
  currentQuestion,
  questionIdx,
  numberOfQuestions,
  nextQuestion,
  handleScore,
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
            <Quizs
              currentQuestion={currentQuestion}
              questionIdx={questionIdx}
              createGame={createGame}
              numberOfQuestions={numberOfQuestions}
              nextQuestion={nextQuestion}
              handleScore={handleScore}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default QuizContainer;
