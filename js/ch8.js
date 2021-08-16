/* Chapter 7 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "Which of the following characters is the starting symbol that comes before any command?",
    answers: {
      a: "#",
      b: "@",
      c: "*",
      d: "$",
    },
    correct: "d",
  },
  {
    question: "Which of the following is NOT able to be done in Terminal?",
    answers: {
      a: "Git Interactions",
      b: "Creating/Editing Files",
      c: "Sharing Files",
      d: "Opening SSH connections",
    },
    correct: "c",
  },
  {
    question: "In regards to commands, how many inputs are there for a given command?",
    answers: {
      a: "0",
      b: "1",
      c: "2",
      d: "Anywhere from 0 or >= 1",
    },
    correct: "d",
  },
  {
    question: "To go up a directory in Terminal, we type in ___.",
    answers: {
      a: "ls ../",
      b: "cd ../",
      c: "nano ../",
      d: "mv ../",
    },
    correct: "b",
  },
  {
    question: "T/F Commands are NOT case sensitive.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "Fill in the blanks: ___ is used to see all of the files in a directory whereas ___ is used to edit a file in a given directory.",
    answers: {
      a: "ls/nano",
      b: "nano/ls",
      c: "cat/cd",
      d: "cd/cat",
    },
    correct: "a",
  },
  {
    question: "Fill in the blanks: ___ is used to view the contents of a file whereas ___ is used to edit a file in a given directory.",
    answers: {
      a: "ls/pwd",
      b: "pwd/ls",
      c: "cat/nano",
      d: "nano/cat",
    },
    correct: "c",
  },
  {
    question: "Fill in the blanks: ___ is used to copy a file whereas ___ is used to rename or move a file.",
    answers: {
      a: "cp/mv",
      b: "mv/cp",
      c: "mkdir/grep",
      d: "grep/mkdir",
    },
    correct: "a",
  },
  {
    question: "Fill in the blanks: ___ is used to see the history of users in the system whereas ___ is used to change permissions of a file.",
    answers: {
      a: "kill/tree",
      b: "tree/kill",
      c: "chmod/who",
      d: "who/chmod",
    },
    correct: "d",
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