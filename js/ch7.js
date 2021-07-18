/* Chapter 7 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "T/F: Both puTTY and WinSCP are like CyberDuck in function.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "On Windows, _______ is what we use to browse files locally on one side and server side on the other, while _______ is what we use to browse files server-side only.",
    answers: {
      a: "WinSCP/puTTY",
      b: "puTTY/WinSCP",
    },
    correct: "a",
  },
  {
    question: "Which of the following is NOT a function of puTTY?",
    answers: {
      a: "Creating Files",
      b: "Editing Files",
      c: "Uploading Files",
      d: "Deleting Files",
    },
    correct: "c",
  },
  {
    question: "In WinSCP, on the left hand side of the window, I can browse _____ while on the right hand side I can browse _____.",
    answers: {
      a: "Local Machine/Server",
      b: "Server/Local Machine",
    },
    correct: "a",
  },
  {
    question: "Which of the following do we modify when we first open puTTY?",
    answers: {
      a: "Password",
      b: "Port Number",
      c: "Username",
      d: "Hostname",
    },
    correct: "d",
  },
  {
    question: "Which of the following are correct ways to logout from puTTY?",
    answers: {
      a: "Close the window.",
      b: "the command 'logout'",
      c: "Both A & B",
      d: "Shut down my PC.",
    },
    correct: "c",
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