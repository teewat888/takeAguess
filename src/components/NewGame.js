import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Stars } from "react-bootstrap-icons";
import { AppContext } from "../App";

const GuestMsg = () => {
  return (
    <p>
      if you would like the game score to be recorded please
      <a href="/user">signin / signup</a>
    </p>
  );
};

const NewGame = () => {
  const { handleNewGame, currentUser, loggedIn } = useContext(AppContext);
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
