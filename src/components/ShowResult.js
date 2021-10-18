import React from "react";

const CorrectMsg = () => {
  const correctWords = [
    "Correct !",
    "Well done!",
    "You are so clever",
    "Good Job!",
  ];
  const randomIdx = Math.floor(Math.random() * correctWords.length);
  return <div>{correctWords[randomIdx]}</div>;
};

const WrongMsg = () => {
  const wrongWords = ["Oops !", "Try again!", "Don't give up", "Next time!"];
  const randomIdx = Math.floor(Math.random() * wrongWords.length);
  return <div>{wrongWords[randomIdx]}</div>;
};

const ShowResult = ({ correct }) => {
  return <>{correct ? <CorrectMsg /> : <WrongMsg />}</>;
};

export default ShowResult;
