/* Chapter 6 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "Which of the following tool(s) can be used on Windows?",
    answers: {
      a: "Terminal",
      b: "CyberDuck",
      c: "Both of them can be used on Windows.",
      d: "None of them can be used on Windows.",
    },
    correct: "d",
  },
  {
    question: "On a Mac, _______ is what we use to browse files locally (or even server-side) while _______ is what we use to browse files server-side only.",
    answers: {
      a: "Terminal/CyberDuck",
      b: "CyberDuck/Terminal",
    },
    correct: "a",
  },
  {
    question: "CyberDuck is most similar to what program on a Mac?",
    answers: {
      a: "Safari",
      b: "TextEdit",
      c: "Finder",
      d: "Terminal",
    },
    correct: "c",
  },
  {
    question: "T/F It is ok to manually upload files server-side so long as I do a git pull locally.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "What command do we use to open a connection in Terminal?",
    answers: {
      a: "cd",
      b: "logout",
      c: "mkdir",
      d: "ssh",
    },
    correct: "d",
  },
  {
    question: "When I am finished working through a connection that is made server-side in Terminal, what command do I use to close the connection?",
    answers: {
      a: "cd",
      b: "logout",
      c: "mkdir",
      d: "ssh",
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