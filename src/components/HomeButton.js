import React from "react";
import { HouseDoor } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

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

export default HomeButton;
