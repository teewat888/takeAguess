import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../App";
import { Row, Col, Button } from "react-bootstrap";
import { renderHTML } from "../helper";
import ImageBox from "./ImageBox";
import NewGame from "./NewGame";
import Quiz from "./Quiz";
import { H4Q, H5Q, ContainerQ, RowQ, ColQ } from "./QuizStyles";
import FinishBox from "./FinishBox";
import ShowResult from "./ShowResult";
import { CaretRight } from "react-bootstrap-icons";

const QuizContainer = () => {
  const [correct, setCorrect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const timer = useRef();
  const {
    currentQuestion,
    questionIdx,
    setQuestionIdx,
    numberOfQuestions,
    newGame,
    finish,
    setFinish,
    timeToPlay,
    setTimeToPlay,
    remainder,
    setRemainder,
    playTime,
    loading,
  } = useContext(AppContext);

  useEffect(() => {
    if (newGame && !loading) {
      timer.current = setInterval(() => {
        setRemainder((prevR) => prevR - 1);
      }, 1000);
      return () => clearInterval(timer.current);
    }
  }, [questionIdx, newGame, loading]);

  useEffect(() => {
    if (remainder) {
      if (remainder < 1) {
        clearInterval(timer.current);
        onNextQuestion();
      }
    }
  }, [remainder]);

  const onNextQuestion = (skip = false) => {
    if (questionIdx < numberOfQuestions) {
      if (!skip) {
        setTimeout(() => {
          setTimeToPlay(playTime);
          setQuestionIdx((prev) => prev + 1);
          setRemainder(timeToPlay);
        }, 2000);
      } else {
        setTimeToPlay(playTime);
        setQuestionIdx((prev) => prev + 1);
        setRemainder(timeToPlay);
      }
    } else {
      clearInterval(timer.current);
      setFinish(true);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <ImageBox />
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          {finish && <FinishBox />}
          {!newGame ? (
            <NewGame />
          ) : (
            <>
              <H4Q>
                Question {questionIdx + 1} of {numberOfQuestions}
              </H4Q>
              <H5Q>{renderHTML(currentQuestion.question)}</H5Q>
              <ContainerQ>
                <Quiz
                  remainder={remainder}
                  onNextQuestion={onNextQuestion}
                  isSubmit={isSubmit}
                  setIsSubmit={setIsSubmit}
                  setCorrect={setCorrect}
                />
                <RowQ>
                  {!isSubmit && (
                    <ColQ>
                      {remainder < 1 ? "Time Up" : `Time Left ${remainder}`}
                    </ColQ>
                  )}
                  {isSubmit && (
                    <ColQ>
                      <ShowResult correct={correct} />
                    </ColQ>
                  )}
                </RowQ>
                <RowQ>
                  <ColQ>
                    <Button
                      variant="secondary"
                      onClick={() => onNextQuestion(true)}
                    >
                      Skip <CaretRight />
                    </Button>
                  </ColQ>
                </RowQ>
              </ContainerQ>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default QuizContainer;
