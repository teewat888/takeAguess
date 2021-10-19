import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Stars } from "react-bootstrap-icons";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

const GuestMsg = () => {
  return (
    <p>
      if you would like the game score to be recorded please
      <Link to="/user">signin / signup</Link>
    </p>
  );
};

const NewGame = () => {
  const { handleNewGame, currentUser, loggedIn, finish } =
    useContext(AppContext);
  const { username } = currentUser;
  return (
    <>
      <div style={{ textAlign: "center" }}>
        Hello {username} {!loggedIn && <GuestMsg />}
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="secondary"
          style={{ marginTop: "7px" }}
          onClick={handleNewGame}
        >
          New Game <Stars />
        </Button>
      </div>
    </>
  );
};

export default NewGame;
