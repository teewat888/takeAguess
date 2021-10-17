import styled, { css } from "styled-components/macro";

export const ErrorText = styled.h6`
  color: red;
  font-weight: bold;
`;

export const Button = styled.button.attrs((props) => {
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

export const BasicInput = styled.input.attrs((props) => {
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

export const FormArea = styled.div`
  width: 400px;
  background: #eee;
  margin: auto;
  margin-top: 25px;
  padding: 20px;
`;
