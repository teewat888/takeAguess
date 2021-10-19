import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import ImageBox from "./ImageBox";
import data from "../dummyScore";
import { FormArea } from "./MyStyles";
import { Row, Col } from "react-bootstrap";
import { uniqueID } from "../helper";

const Scoreboard = () => {
  const { localDB } = useContext(AppContext);
  const [topScores, setTopScores] = useState(data.users);
  const fetchScores = () => {
    return fetch(localDB + "/users")
      .then((resp) => resp.json())
      .then((data) => {
        setTopScores(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const getTopFive = () => {
    const topElements = topScores
      .sort((a, b) => b.highestScore - a.highestScore)
      .slice(0, 5);

    return topElements;
  };

  return (
    <>
      <ImageBox />
      <FormArea>
        <div style={{ textAlign: "center" }}>Top 5</div>
        {getTopFive().map((el, i) => {
          return (
            <Row key={uniqueID()} style={{ textAlign: "center" }}>
              <Col key={uniqueID()}>{el.username}</Col>
              <Col key={uniqueID()}>{el.highestScore}</Col>
            </Row>
          );
        })}
      </FormArea>
    </>
  );
};

export default Scoreboard;
