import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import ImageBox from "./ImageBox";
import data from "../dummyScore";

const Scoreboard = () => {
  const { localDB } = useContext(AppContext);
  const [topScores, setTopScores] = useState(data.users);
  const fetchScores = () => {
    return fetch(localDB + "/users")
      .then((resp) => resp.json())
      .then((data) => {
        setTopScores(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const getTopFive = () => {
    const topElements = topScores
      .sort((a, b) => b.highestScore - a.highestScore)
      .slice(0, 5);
    //console.log("top 5 element ", topElements);
    return topElements;
  };

  return (
    <>
      <ImageBox />
      <div>Top 5</div>
      <ul>
        {getTopFive().map((el, i) => {
          return (
            <li key={i}>
              {el.username} --- {el.highestScore}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Scoreboard;
