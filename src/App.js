import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPhotoUrl, extractQuestion } from "./helper";
import QuizContainer from "./components/QuizContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
  //const [banner, setBanner] = useState("/takeaguess/images/default_sml.jpg");
  const [questions, setQuestions] = useState([]);
  const [newGame, setNewGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  const [userUpdate, setUserUpdate] = useState(false);
  const [keyword, setKeyword] = useState("question"); //for unsplash image query
  const [loggedIn, setLoggedIn] = useState(false);
  const numberOfQuestions = 5;
  const playTime = 30;
  const [timeToPlay, setTimeToPlay] = useState(playTime);
  const [remainder, setRemainder] = useState(timeToPlay);
  const unplashUrl =
    "https://api.unsplash.com/search/photos/?client_id=" + API_KEY;
  const triviaUrl = "https://opentdb.com/api.php?amount=" + numberOfQuestions;

  //const localDB = "http://localhost:5000";
  const localDB = "https://616d759f6dacbb001794ca7c.mockapi.io"; // for internet hosting
  const fetchImage = () => {
    return fetch(unplashUrl + "&query=" + keyword)
      .then((resp) => resp.json())
      .then((data) => {
        setBanner(getPhotoUrl(data));
        console.log("banner ---> ", banner);
      })
      .catch((e) => setError(e));
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
        setError(e);
      });
  };

  useEffect(() => {
    //fetchImage();
    //fetchGames();
  }, []);

  useEffect(() => {
    if (questions.length !== 0) {
      if (questionIdx < numberOfQuestions) {
        const formattedQuestion = extractQuestion(questions[questionIdx]);
        setCurrentQuestion(formattedQuestion);
        //setKeyword(formattedQuestion.question); //comment this out if you dont want the random images from unsplash
        //fetchImage();
      } else {
        setFinish(true);
        setNewGame(false);
        //recordScore();
      }

      //setKeyword(formattedQuestion.question);
      //fetchImage();
    }
  }, [questionIdx, questions]);

  const handleNewGame = () => {
    setLoading(true);
    fetchGames();
    setQuestionIdx(0);
    setNewGame(true);
    setFinish(false);
    setScore(0);
    setUserUpdate(false);
  };

  const handleScore = (sc) => {
    setScore((prev) => prev + sc);
  };

  const fetchUpdateUser = () => {
    const confObj = {
      method: "PUT",
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
      .catch((e) => setError(e));
  };

  const recordScore = () => {
    fetchUpdateUser();
    setTimeout(() => {
      setFinish(false);
    }, 5000);
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
    recordScore,
    setCurrentUser,
    finish,
    setFinish,
    playTime,
    timeToPlay,
    setTimeToPlay,
    remainder,
    setRemainder,
    loading,
    userUpdate,
    setUserUpdate,
    error,
    setError,
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
