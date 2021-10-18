import React, { useContext } from "react";
import { AppContext } from "../App";

function UserPanel({ logout }) {
  const { currentUser } = useContext(AppContext);
  return (
    <div>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default UserPanel;
