import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { renderHTML } from "../helper";

const MyButton = styled.button`
  width: 100%;
  border: none;
  margin-bottom: 5px;
  color: grey;
  background-color: #eeeeee;
  border-radius: 4px;
  &:hover {
    background: #aaaaaa;
    color: white;
  }
`;

const Quiz = ({ currentQuestion, handleScore, remainder }) => {
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
      handleScore(currentQuestion.score + remainder);
      switch (parseInt(e.currentTarget.id)) {
        case 0:
          setBtnColor(["green", "#eeeeee", "#eeeeee", "#eeeeee"]);
          break;
        case 1:
          setBtnColor(["#eeeeee", "green", "#eeeeee", "#eeeeee"]);
          break;
        case 2:
          setBtnColor(["#eeeeee", "#eeeeee", "green", "#eeeeee"]);
          break;
        case 3:
          setBtnColor(["#eeeeee", "#eeeeee", "#eeeeee", "green"]);
          break;
      }
    } else {
      console.log("wrong answer!");
      switch (parseInt(e.currentTarget.id)) {
        case 0:
          setBtnColor(["red", "#eeeeee", "#eeeeee", "#eeeeee"]);
          break;
        case 1:
          setBtnColor(["#eeeeee", "red", "#eeeeee", "#eeeeee"]);
          break;
        case 2:
          setBtnColor(["#eeeeee", "#eeeeee", "red", "#eeeeee"]);
          break;
        case 3:
          setBtnColor(["#eeeeee", "#eeeeee", "#eeeeee", "red"]);
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
                style={{ backgroundColor: btnColor[i], color: "white" }}
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
export default Quiz;