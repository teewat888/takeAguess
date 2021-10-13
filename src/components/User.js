import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components/macro";
import { AppContext } from "../App";
import ImageBox from "./ImageBox";

const Button = styled.button.attrs((props) => {
  return { type: props.type || "button" };
})`
  background-color: #add8e6;
  border: 2px solid #f2f4f8;
  width: 80%;
  color: red;
  padding: 0.25rem;
  cursor: pointer;
  ${({ type }) => {
    return (
      type === "submit" &&
      css`
        display: block;
        width: 80%;
        margin-top: 20px;
        border-radius: 5px;
      `
    );
  }}
`;

const BasicInput = styled.input.attrs((props) => {
  return {
    type: props.type || "text",
    placeholder: props.placeholder || "please enter value",
  };
})`
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid #f2f4f8;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
`;

const FormArea = styled.div`
  width: 400px;
  background: #eee;
  margin: auto;
  margin-top: 25px;
  padding: 20px;
`;

const User = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [signForm, setSignForm] = useState({
    user: "",
    password: "",
    newUser: "",
    newPassword: "",
  });
  const { localDB } = useContext(AppContext);

  const md5 = require("md5"); // md5 module

  const toggleSignup = () => {
    setToggleForm(!toggleForm);
  };

  const checkSignin = (username, password) => {
    return fetch(localDB + "users")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.find((el) => el.username === username)) {
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log("sigin form  ", signForm);
    return () => {};
  }, [signForm]);

  const handleOnchange = (e) => {
    if (e.target.type === "password") {
      setSignForm({ ...signForm, [e.target.id]: md5(e.target.value) });
    } else {
      setSignForm({ ...signForm, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ImageBox />
      <FormArea>
        <form id="signin" onSubmit={handleSubmit}>
          <BasicInput
            id="user"
            placeholder="user name"
            onChange={handleOnchange}
          />
          <BasicInput
            id="password"
            type="password"
            placeholder="enter password"
            onChange={handleOnchange}
          />
          <Button type="submit" id="signin-btn">
            Sign In
          </Button>
        </form>
        <Button type="button" onClick={toggleSignup}>
          New user? Sign Up here
        </Button>
        {toggleForm ? (
          <form id="signup">
            <BasicInput
              id="newUser"
              placeholder="user name"
              onChange={handleOnchange}
            />
            <BasicInput
              id="newPassword"
              type="password"
              placeholder="enter password"
              onChange={handleOnchange}
            />
            <Button type="submit" id="signup-btn">
              Sign Up
            </Button>
          </form>
        ) : (
          ""
        )}
      </FormArea>
    </>
  );
};

export default User;
