import React from "react";
import Button from "react-bootstrap/Button";
import { BarChartLine } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ScoreBoardButton = () => {
  return (
    <Link to="/scoreboard">
      {/*<Button variant="secondary" style={{ marginTop: "7px" }} href="/scoreboard">
      Scoreboard <BarChartLine />
  </Button> */}
      <BarChartLine
        style={{
          marginLeft: "25px",
          marginTop: "15px",
          transform: "scale(2,2",
        }}
      />
    </Link>
  );
};

export default ScoreBoardButton;
