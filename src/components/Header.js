import React from "react";
import { Row, Col } from "react-bootstrap";
import HomeButton from "./HomeButton";
import ScoreBoardButton from "./ScoreBoardButton";
import UserButton from "./UserButton";

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
