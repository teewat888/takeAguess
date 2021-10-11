import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getPhotoUrl, extractQuestion } from "./helper";
import QuizContainer from "./components/QuizContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import User from "./components/User";

/* 
to do:
- to throw error  (fetchGames)

*/

const Section = styled.div`
  width: 780px;
  border-style: solid;
  border-width: 1;
  border-color: #999999;
  margin: auto;
  margin-top: 20px;
  border-radius: 5px;
  padding: 20px;
`;

// Create a Context
const AppContext = React.createContext();

function App() {
  const API_KEY = "cNA5TItg9wcAjyTrbiwVv52vjIZ7IUfxOavV-U6kOWI";
  const [banner, setBanner] = useState("/images/default_sml.jpg");
  const [questions, setQuestions] = useState([]);
  const [newGame, setNewGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [score, setScore] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    choices: [],
    answer: "",
    keyword: "",
    type: "",
    score: 0,
  });
  const [keyword, setKeyword] = useState("question");
  const numberOfQuestions = 10;
  const unplashUrl =
    "https://api.unsplash.com/search/photos/?client_id=" + API_KEY;
  const triviaUrl = "https://opentdb.com/api.php?amount=" + numberOfQuestions;

  const localDB = "http://localhost:3000";

  const fetchImage = () => {
    return fetch(unplashUrl + "&query=" + keyword)
      .then((resp) => resp.json())
      .then((data) => {
        setBanner(getPhotoUrl(data));
      })
      .catch((e) => console.log(e));
  };

  const fetchGames = () => {
    return fetch(triviaUrl)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.response_code === 0) {
          console.log(data.results);
          setQuestions(data.results);
          setLoading(false);
        } else {
          // to be thow error here
        }
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  };

  useEffect(() => {
    //fetchImage();
    //fetchGames();
  }, []);

  useEffect(() => {
    if (questions.length !== 0) {
      const formattedQuestion = extractQuestion(questions[questionIdx]);
      setCurrentQuestion(formattedQuestion);
      //setKeyword(formattedQuestion.question);
      //fetchImage();
    }
  }, [questionIdx, questions]);

  const handleNewGame = () => {
    console.log("handle new game");
    fetchGames();
    setQuestionIdx(0);
    setNewGame(true);
  };

  const nextQuestion = () => {
    setQuestionIdx((prev) => prev + 1);
  };

  const handleScore = (sc) => {
    console.log("sc=> ", sc);
    setScore((prev) => prev + sc);
    console.log("current score::  ", score);
  };

  const value = {
    banner,
    newGame,
    handleNewGame,
    currentQuestion,
    questionIdx,
    numberOfQuestions,
    nextQuestion,
    handleScore,
  };

  return (
    <Router>
      <AppContext.Provider value={value}>
        <main>
          <Section>
            <Header />
            <Switch>
              <Route exact path="/">
                <QuizContainer />
                <div>Current score: {score}</div>
              </Route>
              <Route path="/scoreboard">
                <Scoreboard />
              </Route>
              <Route path="/user">
                <User />
              </Route>
            </Switch>
          </Section>
        </main>
      </AppContext.Provider>
    </Router>
  );
}
export default App;
export { AppContext };
