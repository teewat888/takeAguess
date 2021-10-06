import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Stars } from "react-bootstrap-icons";

const NewGameContent = () => {
  return <div>test</div>;
};

const NewGame = ({ createGame }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="secondary"
        style={{ marginTop: "7px" }}
        onClick={createGame}
      >
        New Game <Stars />
      </Button>
    </div>
  );
};

export default NewGame;
