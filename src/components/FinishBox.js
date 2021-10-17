import React, { useContext } from "react";
import { AppContext } from "../App";

const FinishBox = () => {
  const { score, currentUser } = useContext(AppContext);
  const { username } = currentUser;
  return (
    <div style={{ textAlign: "center" }}>
      <h6>Well done {username}!</h6>
      <h5>You earn {score} PTS from this game</h5>
    </div>
  );
};

export default FinishBox;
