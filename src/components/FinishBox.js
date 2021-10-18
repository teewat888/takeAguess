import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const FinishBox = () => {
  const {
    score,
    currentUser,
    setCurrentUser,
    finish,
    recordScore,
    userUpdate,
    setUserUpdate,
    loggedIn,
  } = useContext(AppContext);
  const { username, highestScore } = currentUser;

  const addNumberPlays = () => {
    setCurrentUser((prev) => {
      return {
        ...prev,
        numberPlays: prev.numberPlays + 1,
      };
    });
  };
  useEffect(() => {
    console.log("the finsih box useeffect loaded");
    if (finish) {
      addNumberPlays();
      if (score > highestScore) {
        setCurrentUser({ ...currentUser, highestScore: score });
      }
      //recordScore();
      setUserUpdate(true);
    }
    return () => {};
  }, [finish]);

  useEffect(() => {
    if (userUpdate && loggedIn) {
      recordScore();
    }
    return () => {};
  }, [userUpdate]);

  return (
    <div style={{ textAlign: "center" }}>
      <h6>{score === 0 ? "Try again" : "Well done "}!</h6>
      <h5>You earn {score} PTS from this game</h5>
    </div>
  );
};

export default FinishBox;
