import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
const API_KEY = "cNA5TItg9wcAjyTrbiwVv52vjIZ7IUfxOavV-U6kOWI";

function App() {
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
  const questionTime = 3000; //ms
  const numberOfQuestions = 10;
  const unplashUrl =
    "https://api.unsplash.com/search/photos/?client_id=" +
    API_KEY +
    "&query=" +
    keyword;
  const triviaUrl = "https://opentdb.com/api.php?amount=" + numberOfQuestions;

  const fetchImage = () => {
    return fetch(unplashUrl)
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
    }
  }, [questionIdx, questions]);

  const handleNewGame = () => {
    console.log("handle new game");
    fetchGames();
    setNewGame(true);
  };

  const nextQuestion = () => {
    setQuestionIdx((prev) => prev + 1);
  };

  return (
    <Router>
      <Container fluid>
        <main>
          <Section>
            <Header />
            <Switch>
              <Route exact path="/">
                <QuizContainer
                  imgSrc={banner}
                  newGame={newGame}
                  createGame={handleNewGame}
                  currentQuestion={currentQuestion}
                  questionIdx={questionIdx}
                  numberOfQuestions={numberOfQuestions}
                  nextQuestion={nextQuestion}
                />
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
      </Container>
    </Router>
  );
}
export default App;
