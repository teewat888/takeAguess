import React, { useState, useEffect, useContext } from "react";
import { Button, ErrorText, BasicInput, FormArea } from "./MyStyles";
import { AppContext } from "../App";
import ImageBox from "./ImageBox";
import UserPanel from "./UserPanel";
import { useHistory } from "react-router-dom";

const User = () => {
  const history = useHistory();
  const [toggleForm, setToggleForm] = useState(false);
  const [signForm, setSignForm] = useState({
    user: "",
    password: "",
    newUser: "",
    newPassword: "",
  });
  const { localDB, loggedIn, setLoggedIn, currentUser, setCurrentUser } =
    useContext(AppContext);

  const md5 = require("md5"); // md5 module

  const [errorSignin, setErrorSignin] = useState({
    eStatus: false,
    eMessage: "",
  });
  const [errorSignup, setErrorSignup] = useState({
    eStatus: false,
    eMessage: "",
  });
  const [findUser, setFindUser] = useState(null);

  const toggleSignup = () => {
    setToggleForm(!toggleForm);
  };

  const doSignin = (username, password) => {
    return fetch(localDB + "/users")
      .then((resp) => resp.json())
      .then((data) => {
        const found = data.find(
          (el) => el.username === username && el.password === password
        );
        if (!found) {
          setErrorSignin({
            ...errorSignin,
            eStatus: true,
            eMessage: "Invalid user name / password",
          });
          setSignForm({
            user: "",
            password: "",
            newUser: "",
            newPassword: "",
          });
        } else {
          setLoggedIn(true);
          setCurrentUser({
            id: found.id,
            username: found.username,
            password: found.password,
            highestScore: found.highestScore,
            numberPlays: found.numberPlays,
          });
          setErrorSignin({
            ...errorSignin,
            eStatus: false,
            eMessage: "",
          });
        }
      })
      .catch((e) =>
        setErrorSignin({
          ...errorSignin,
          eStatus: true,
          eMessage: e,
        })
      );
  };

  const logout = () => {
    setLoggedIn(false);
    setCurrentUser({
      id: 0,
      username: "guest",
      password: "",
      highestScore: 0,
      numberPlays: 0,
    });
    setSignForm({
      user: "",
      password: "",
      newUser: "",
      newPassword: "",
    });
  };

  const checkUsername = (username) => {
    return fetch(localDB + "/users")
      .then((resp) => resp.json())
      .then((data) => {
        const found = data.find((el) => el.username === username);
        if (found === undefined) {
          setFindUser(false);
        } else {
          setFindUser(true);
        }
      })
      .catch((e) =>
        setErrorSignup({
          ...errorSignup,
          eStatus: true,
          eMessage: e,
        })
      );
  };

  const addUser = (username, password) => {
    const newUser = {
      username: username,
      password: password,
      highestScore: 0,
      numberPlays: 0,
    };
    const confObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(newUser),
    };
    return fetch(localDB + "/users", confObj)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("sign up success");
        setLoggedIn(true);
        history.push("/");
      })
      .catch((e) => {
        setErrorSignup({
          ...errorSignup,
          eStatus: true,
          eMessage: e,
        });
      });
  };

  useEffect(() => {
    if (findUser) {
      setErrorSignup({
        ...errorSignup,
        eStatus: true,
        eMessage: "username already existed",
      });
    } else {
      if ((signForm.newPassword && signForm.newPassword) != "") {
        addUser(signForm.newUser, md5(signForm.newPassword));
      }
    }
  }, [findUser]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorSignup({
      ...errorSignup,
      eStatus: false,
      eMessage: "",
    });
    if ((signForm.newPassword || signForm.newPassword) === "") {
      return setErrorSignup({
        ...errorSignup,
        eStatus: true,
        eMessage: "username & password must NOT empty",
      });
    }

    checkUsername(signForm.newUser);
  };

  const handleOnchange = (e) => {
    setSignForm({ ...signForm, [e.target.id]: e.target.value });
    console.log(signForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    doSignin(signForm.user, md5(signForm.password));
  };

  return (
    <>
      <ImageBox />
      {!loggedIn && (
        <FormArea>
          <form id="signin" onSubmit={handleSubmit}>
            <BasicInput
              id="user"
              placeholder="user name"
              onChange={handleOnchange}
              value={signForm.user}
            />
            {errorSignin.eStatus ? (
              <ErrorText>{errorSignin.eMessage}</ErrorText>
            ) : (
              ""
            )}
            <BasicInput
              id="password"
              type="password"
              placeholder="enter password"
              onChange={handleOnchange}
              value={signForm.password}
            />

            <Button type="submit" id="signin-btn">
              Sign In
            </Button>
          </form>
          <Button type="button" onClick={toggleSignup}>
            New user? Sign Up here
          </Button>
          {toggleForm ? (
            <form id="signup" onSubmit={handleSignupSubmit}>
              <BasicInput
                id="newUser"
                placeholder="user name"
                onChange={handleOnchange}
                value={signForm.newUser}
              />
              {errorSignup.eStatus ? (
                <ErrorText>{errorSignup.eMessage}</ErrorText>
              ) : (
                ""
              )}
              <BasicInput
                id="newPassword"
                type="password"
                placeholder="enter password"
                onChange={handleOnchange}
                value={signForm.newPassword}
              />
              <Button type="submit" id="signup-btn">
                Sign Up
              </Button>
            </form>
          ) : (
            ""
          )}
        </FormArea>
      )}
      {loggedIn && <UserPanel logout={logout} />}
    </>
  );
};

export default User;
