import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPhotoUrl, extractQuestion } from "./helper";
import QuizContainer from "./components/QuizContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import User from "./components/User";
import NoMatch from "./components/NoMatch";
import "./App.css";
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
  const [finish, setFinish] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    choices: [],
    answer: "",
    keyword: "",
    type: "",
    score: 0,
  });
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    username: "guest",
    password: "",
    highestScore: 0,
    numberPlays: 0,
  });
  const [keyword, setKeyword] = useState("question"); //for unsplash image query
  const [loggedIn, setLoggedIn] = useState(false);
  const numberOfQuestions = 3;
  const playTime = 10;
  const [timeToPlay, setTimeToPlay] = useState(playTime);
  const [remainder, setRemainder] = useState(timeToPlay);
  const unplashUrl =
    "https://api.unsplash.com/search/photos/?client_id=" + API_KEY;
  const triviaUrl = "https://opentdb.com/api.php?amount=" + numberOfQuestions;

  const localDB = "http://localhost:5000";
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
    console.log("useeffect=> question here? ");
    if (questions.length !== 0 && questionIdx < numberOfQuestions) {
      const formattedQuestion = extractQuestion(questions[questionIdx]);
      setCurrentQuestion(formattedQuestion);
      //setKeyword(formattedQuestion.question);
      //fetchImage();
    } else {
      questions.length !== 0 ? setFinish(true) : setFinish(false); //to make sure if no question/initial state not finish yet
      setNewGame(false);

      //record play times
      console.log(
        "we have current raw data here  ",
        currentUser.numberPlays,
        score
      );
      setCurrentUser((prev) => {
        return {
          ...prev,
          numberPlays: prev.numberPlays + 1,
        };
      });
      if (score > currentUser.highestScore) {
        setCurrentUser({ ...currentUser, highestScore: score });
      }
      if (questions.length !== 0) {
        recordScore();
      }
    }
  }, [questionIdx, questions]);

  const addNumberPlays = () => {
    setCurrentUser((prev) => {
      return {
        ...prev,
        numberPlays: prev.numberPlays + 1,
      };
    });
    console.log(currentUser);
  };

  const handleNewGame = () => {
    fetchGames();
    setQuestionIdx(0);
    setNewGame(true);
    setFinish(false);
    setScore(0);
  };
  /*
  const nextQuestion = () => {
    setQuestionIdx((prev) => prev + 1);
  };
*/
  const handleScore = (sc) => {
    console.log("sc=> ", sc);
    setScore((prev) => prev + sc);
    console.log("current score::  ", score);
  };

  const fetchUpdateUser = () => {
    const confObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(currentUser),
    };
    console.log("confOBj =>  ", confObj);
    return fetch(localDB + "/users/" + currentUser.id, confObj)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("current user after fetch ", data);
      })
      .catch((e) => console.log(e));
  };

  const recordScore = () => {
    fetchUpdateUser();
  };

  const value = {
    banner,
    newGame,
    setNewGame,
    handleNewGame,
    currentQuestion,
    questionIdx,
    setQuestionIdx,
    numberOfQuestions,
    handleScore,
    score,
    localDB,
    loggedIn,
    setLoggedIn,
    currentUser,
    setCurrentUser,
    recordScore,
    finish,
    setFinish,
    playTime,
    timeToPlay,
    setTimeToPlay,
    remainder,
    setRemainder,
  };
  return (
    <Router forceRefresh={false}>
      <AppContext.Provider value={value}>
        <main>
          <Section>
            <Header />
            <Switch>
              <Route exact path="/">
                <QuizContainer />
              </Route>
              <Route path="/scoreboard">
                <Scoreboard />
              </Route>
              <Route path="/user">
                <User />
              </Route>
              <Route path="*">
                <NoMatch />
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
