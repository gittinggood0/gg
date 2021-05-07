/* Chapter 1 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "What is Version Control Software?",
    answers: {
      a: "Software used to track changes in code throughout the development process.",
      b: "Stages of the project that are used in beta testing.",
      c: "A system that automatically increments an app's version number based on new changes.",
    },
    correct: "a",
  },
  {
    question: "T/F Web Development teams use GitHub to help enhance code run time.",
    answers: {
      a: "True",
      b: "False",
      // c: "goo goo gaga",
    },
    correct: "b",
  },
  {
    question: "Which of the following is Git not useful for?",
    answers: {
      a: "Collaborating with teammates to create a project from start to finish.",
      b: "Reverting back to a previous version of a code file in case a newer version goes sour.",
      c: "Uploading non-code files for your teammates to review before actual coding begins.",
    },
    correct: "c",
  },
  {
    question: "T/F The relationship between the server you work on and your machine is bi-directional.",
    answers: {
      a: "True",
      b: "False",
      // c: "winSCP/puTTY",
    },
    correct: "f",
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
  let resetButtonCode = "<button value=\"reset\" type=\"reset\"> Reset </button>";
  
  // show button on html
  submitButton.insertAdjacentHTML('afterend', resetButtonCode);

  // listening for a reset button to be clicked
form.addEventListener("reset", (event) =>{
  location.reload(); 
});
});