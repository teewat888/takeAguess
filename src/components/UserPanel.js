import React, { useContext } from "react";
import { AppContext } from "../App";

function UserPanel({ logout }) {
  const { currentUser } = useContext(AppContext);
  console.log("current user: u panel", currentUser);
  return (
    <div>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default UserPanel;
