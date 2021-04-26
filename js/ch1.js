/* Chapter 1 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "What is Version Control Software?",
    answers: {
      a: "Sends changes to the GitHub Cloud.",
      b: "Stages Changes to be sent to the GitHub Cloud.",
      c: "Retrieves changes from a newer version(s) of a file in the GitHub Cloud.",
    },
    correct: "b",
  },
  {
    question: "T/F Web Development teams use GitHub to help enhance code run time.",
    answers: {
      a: "Sends changes to the GitHub Cloud.",
      b: "Stages Changes to be sent to the GitHub Cloud.",
      c: "Retrieves changes from a newer version(s) of a file in the GitHub Cloud.",
    },
    correct: "c",
  },
  {
    question: "Which of the following is Git not useful for?",
    answers: {
      a: "Sends changes to the GitHub Cloud.",
      b: "Stages Changes to be sent to the GitHub Cloud.",
      c: "Retrieves changes from a newer version(s) of a file in the GitHub Cloud.",
    },
    correct: "a",
  },
  {
    question: "T/F The relationship between the server you work on and your machine is bi-directional.",
    answers: {
      a: "Terminal/puTTY",
      b: "Terminal/CyberDuck",
      c: "winSCP/puTTY",
    },
    correct: "c",
  },
  {
    question: "If I am on a Mac, I need to use ______ for accessing a server and ______ for file management on that same server.",
    answers: {
      a: "Terminal/puTTY",
      b: "Terminal/CyberDuck",
      c: "winSCP/puTTY",
    },
    correct: "b",
  },
];
function createQuiz() {
    const quiz = document.querySelector("#h2q");
    const button = document.querySelector("#submit");
    let quizCode = "";
  
    for (let [index, question] of questions.entries()) { //for each question in our json
      quizCode += `<h2>${question.question}</h2>`; // make an h2 for the question
      for (const item in question.answers) { // for each answer choice in answers of our json
        quizCode += `<p>
                  <input type="radio" name="Q${index}" id="choice_${item}" value="${item}">
                  <label for="choice_${item}">${question.answers[item]}</label>
              </p>`; // make a p tag for the answer choice, as well as a radio button so that we can select the choice
      }
    }
    // stick it into our html page
    quiz.insertAdjacentHTML("afterbegin", quizCode);
  }
  
  createQuiz(); // so that we can see our quiz