import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Stars } from "react-bootstrap-icons";
import { AppContext } from "../App";

const NewGameContent = () => {
  return <div>test</div>;
};

const NewGame = () => {
  const { handleNewGame } = useContext(AppContext);
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="secondary"
        style={{ marginTop: "7px" }}
        onClick={handleNewGame}
      >
        New Game <Stars />
      </Button>
    </div>
  );
};

export default NewGame;
