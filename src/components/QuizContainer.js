import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { Row, Col } from "react-bootstrap";
import ImageBox from "./ImageBox";
import NewGame from "./NewGame";
import Quizs from "./Quizs";

const QuizContainer = () => {
  const { newGame } = useContext(AppContext);
  return (
    <>
      <Row>
        <Col>
          <ImageBox />
        </Col>
      </Row>
      <Row>
        <Col>{!newGame ? <NewGame /> : <Quizs />}</Col>
      </Row>
    </>
  );
};

export default QuizContainer;
