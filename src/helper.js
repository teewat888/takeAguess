import React from "react";

export function getPhotoUrl(data) {
  //unsplashed endpoint   /search/photos

  const randomPhotoIdx = Math.floor(
    Math.random() * (Math.round(data.total / data.total_pages) - 1)
  );

  const url = data.results[randomPhotoIdx].urls.raw + "&w=700&dpr=1";
  return url;
}

export function uniqueID() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

export function extractQuestion(data) {
  //extract question / prepare to generate question
  console.log("unformatted data ", data);
  const newData = JSON.parse(JSON.stringify(data)); //clone
  const {
    category,
    correct_answer,
    difficulty,
    incorrect_answers,
    question,
    type,
  } = newData;
  let score;
  switch (difficulty) {
    case "easy":
      score = 1;
      break;
    case "medium":
      score = 5;
      break;
    case "hard":
      score = 10;
      break;
    default: {
      score = 0;
    }
  }

  // add the correct answer and shuffle
  let allChoices = incorrect_answers;
  allChoices.push(correct_answer);

  if (type === "multiple") {
    allChoices.sort(() => 0.5 - Math.random());
  } else {
    allChoices = ["True", "False"];
  }

  const formattedQuestion = {
    question: question,
    choices: [...allChoices],
    answer: correct_answer,
    keyword: category,
    type: type,
    score: score,
  };
  console.log("formatted data ", formattedQuestion);
  return formattedQuestion;
}

export function renderHTML(escapedHTML: string) {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: escapedHTML },
  });
}
