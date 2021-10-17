import React from "react";

const CorrectMsg = () => {
  return <div>Correct !</div>;
};

const WrongMsg = () => {
  return <div>Oops .. !</div>;
};

const ShowResult = ({ correct }) => {
  return <>{correct ? <CorrectMsg /> : <WrongMsg />}</>;
};

export default ShowResult;
