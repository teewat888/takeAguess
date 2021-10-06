import React from "react";
import { Link } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";

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

export default UserButton;
