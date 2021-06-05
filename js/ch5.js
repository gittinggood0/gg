/* Chapter 5 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "T/F A merge conflict is something that is not preventable. You just have to deal with it as it happens from time-to-time.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "T/F Merge Conflicts can only occur between 2 locations. For example you cannot have a merge conflict between your local machine, github.com, and your server.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "Which of the following IS NOT a way to prevent merge conflicts?",
    answers: {
      a: "Git Pull before and after working",
      b: "Working on a file at a different time",
      c: "Pushing Frequently",
      d: "All of the above are great ways to prevent merge conflicts",
    },
    correct: "d",
  },
  {
    question: "When a merge conflict is made, it is because Git sees ____ different versions of a file.",
    answers: {
      a: "2",
      b: "3",
      c: "multiple",
    },
    correct: "c",
  },
  {
    question: "Which of the following IS NOT a step of resolving a merge conflict?",
    answers: {
      a: "Delete any lines that will not compile",
      b: "Deleting the commit IDs attached with each line",
      c: "Delete the file in its entirety and create a new one using the same name",
      d: "All of the above are steps needed to be done in order to resolve a merge conflict.",
    },
    correct: "c",
  },
  {
    question: "In terminal, when you are done editing a file, what is the sequence of key strokes that you need to do in order to save changes.",
    answers: {
      a: "Y,Return/Enter,CTRL+X",
      b: "CTRL+X,Y,Return/Enter",
      c: "CTRL+X,Return/Enter,Y",
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