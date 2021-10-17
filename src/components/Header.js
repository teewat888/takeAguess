import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import {
  BarChartLine,
  Person,
  PersonCheck,
  HouseDoor,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "./Header.css";

const ScoreBoardButton = () => {
  return (
    <Link to="/scoreboard" className="link">
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
    <Link to="/" className="link">
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

const UserButton = ({ loggedIn, currentUser }) => {
  return (
    <Link to="/user" className="link">
      {!loggedIn && (
        <Person
          style={{
            marginLeft: "27px",
            marginTop: "15px",
            transform: "scale(2,2",
          }}
        />
      )}
      {loggedIn && (
        <PersonCheck
          style={{
            marginLeft: "27px",
            marginTop: "15px",
            transform: "scale(2,2",
          }}
        />
      )}
    </Link>
  );
};

const Header = () => {
  const { loggedIn, currentUser } = useContext(AppContext);
  return (
    <Row>
      <Col sm={3}></Col>
      <Col sm={6} style={{ textAlign: "center" }}>
        <h1>take A guess</h1>
      </Col>
      <Col sm={3}>
        <HomeButton />
        <ScoreBoardButton />
        <UserButton loggedIn={loggedIn} currentUser={currentUser} />
      </Col>
    </Row>
  );
};

export default Header;
