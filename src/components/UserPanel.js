import React, { useContext } from "react";
import { AppContext } from "../App";
import { FormArea } from "./MyStyles";
import { Button } from "react-bootstrap";
import { Stars } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

function UserPanel({ logout }) {
  let history = useHistory();
  const { currentUser, handleNewGame } = useContext(AppContext);
  const { username, highestScore, numberPlays } = currentUser;

  const handleClick = () => {
    history.push("/");
    handleNewGame();
  };

  return (
    <FormArea>
      <div>
        <Button variant="secondary" onClick={handleClick}>
          Play Now! <Stars />
        </Button>
        <h4>username : {username}</h4>
        <h4>highest score: {highestScore}</h4>
        <h4>number of plays: {numberPlays}</h4>
        <Button variant="secondary" onClick={logout}>
          Log out
        </Button>
      </div>
    </FormArea>
  );
}

export default UserPanel;
