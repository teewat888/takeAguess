import React from "react";
import { Row, Col } from "react-bootstrap";
import { BarChartLine, PersonCircle, HouseDoor } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ScoreBoardButton = () => {
  return (
    <Link to="/scoreboard">
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

const HomeButton = () => {
  return (
    <Link to="/">
      <HouseDoor
        style={{
          marginLeft: "55px",
          marginTop: "16px",
          transform: "scale(2,2",
        }}
      />
    </Link>
  );
};

const UserButton = () => {
  return (
    <Link to="/user">
      <PersonCircle
        style={{
          marginLeft: "27px",
          marginTop: "15px",
          transform: "scale(2,2",
        }}
      />
    </Link>
  );
};

const Header = () => {
  return (
    <Row>
      <Col sm={3}></Col>
      <Col sm={6} style={{ textAlign: "center" }}>
        <h1>take A guess</h1>
      </Col>
      <Col sm={3}>
        <HomeButton />
        <ScoreBoardButton />
        <UserButton />
      </Col>
    </Row>
  );
};

export default Header;
