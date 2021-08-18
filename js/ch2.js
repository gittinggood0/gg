/* Chapter 2 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "How many people need to install the repository on their local machine(s)?",
    answers: {
      a: "As many people as they want.",
      b: "Only one person has to setup the repository.",
      c: "Everyone who is a collaborator on the repository must clone it.",
    },
    correct: "c",
  },
  {
    question: "T/F You can setup a repository on GitHub Desktop and terminal",
    answers: {
      a: "True",
      b: "False",
      // c: "goo goo gaga",
    },
    correct: "a",
  },
  {
    question: "Which of the following is NOT a part of setting up a repository?",
    answers: {
      a: "Repository Name",
      b: "Description",
      c: "testing.txt file",
      d: "Privacy",
    },
    correct: "c",
  },
  /*{
    question: "Joe works for a multi-billion dollar coding firm. They just got a new client, and the team of 4 programmers asks Joe to make a new repository. Which privacy setting should Joe use, and why?",
    answers: {
      a: "Public, so that the client can view the steps of the development process as Joe's company does the work.",
      b: "Public, so that people who google similar issues can find Joe's repository and get answers from there.",
      c: "Private, so that only Joe and authorized collaborators can view the work in the repository.",
      d: "Private, so that only Joe can view the work he has done.",
    },
    correct: "c",
  },*/
  {
    question: "Eric is a student at Indiana University in Bloomington, IN (GO HOOSIERS!). He is taking a intro level coding course which asks him to store his code on GitHub. Which privacy setting should Eric use, and why?",
    answers: {
      a: "Public, so that he can share his work with other students in his class.",
      b: "Public, so that people who google similar issues can find Eric's repository and get answers from there.",
      c: "Private, so that only Eric and authorized collaborators (like TAs and instructors) can view the work in the repository.",
      d: "Private, so that only Eric can view the work he has done. No need to share code with others",
    },
    correct: "c",
  },
  {
    question: "What is the main difference between a ReadMe and a description?",
    answers: {
      a: "READMEs are only viewable on GitHub.com, descriptions are in a MD file in the repository.",
      b: "Descriptions are only viewable on GitHub.com, READMEs are in a MD file in the repository.",
      c: "READMEs are helpful for someone to get a better idea of what a project is about, descriptions are filler fields.",
      d: "Descriptions are helpful for someone to get a better idea of what a project is about, READMEs are filler fields.",
    },
    correct: "b",
  },
  {
    question: "T/F A readme in a PRIVATE repository is useless to have.",
    answers: {
      a: "True, beacause only you will see the readme.",
      b: "False, it is helpful to have in case someone else wants to see what the repo is about.",
    },
    correct: "b",
  },
];
function createQuiz() {
  const quiz = document.querySelector("#h2q");
  const button = document.querySelector("#submit");
  let quizCode = "<ol type=\"1\">";

  for (let [index, question] of questions.entries()) { //for each question in our json
    quizCode += `<h2 class="quizH2">${question.question}</h2>`; // make an h2 for the question
    for (const item in question.answers) { // for each answer choice in answers of our json
      quizCode += `<p>
                  <input type="radio" name="Q${index}" id="choice_${item}" value="${item}">
                  <label for="choice_${item}">${question.answers[item]}</label>
              </p>`; // make a p tag for the answer choice, as well as a radio button so that we can select the choice
    }
  }

  // stick it into our html page
  quiz.insertAdjacentHTML("afterend", quizCode);
}

createQuiz(); // so that we can see our quiz

const form = document.forms[0];

/* when the user completes the quiz, they click the submit button.
lets listen for that event so that we know we need to grade their quiz */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(form);
});


// we want to disable the submit button after they click it - lets grab it for later 
let submitButton = document.querySelector('#submit');


// grabs user selected input from radio buttons
form.addEventListener("formdata", (event) => {
 

  const data = event.formData;
  const entries = [...data.entries()];
  let h2 = ''; // selector for each question that we want to grade
  let totalScore = 0; // keeps track of their score out of 10

  entries.forEach((current, index) => {

    h2 = document.querySelector(`h2:nth-of-type(${index + 1})`);
    console.log(h2,index);
    if (current[1] === questions[index].correct) {
      // yay they got it correct
      totalScore += 1;
      h2.style.color = 'lightgreen';
    } else {
      // incorrect answer
      h2.style.color = "red";
    }

  });
  // show the user their score
  document.querySelector('span').innerHTML = `${totalScore}/${questions.length}`;

  // lets show the user a reset button 
  let resetButtonCode = "<div id=\"qrb\"><button value=\"reset\" type=\"reset\" id=\"quizReset\"> Reset </button></div>";
  
  // show button on html
  submitButton.insertAdjacentHTML('afterend', resetButtonCode);

  // listening for a reset button to be clicked
form.addEventListener("reset", (event) =>{
  location.reload(); 
});
});