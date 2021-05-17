/* Chapter 2 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "Which of the following is NOT one of the big three commands?",
    answers: {
      a: "Git Add --All",
      b: "Git Commit",
      c: "Git Pull",
    },
    correct: "a",
  },
  {
    question: "T/F Git Pull is basically like cloning - it retrieves the latest version of a repository from GitHub.com",
    answers: {
      a: "True",
      b: "False",
      // c: "goo goo gaga",
    },
    correct: "a",
  },
  {
    question: "Fill in the blanks: I am ready to get changes ready to send to GitHub, I should do a git ____ and when I am ready to send the changes I should do a git ____. ",
    answers: {
      a: "pull/push",
      b: "push/pull",
      c: "commit/push",
      d: "push/commit",
    },
    correct: "c",
  },
  {
    question: "T/F I should only do git pulls when absolutely necessary. Git Pulls are to be used sparingly.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "Fill in the blanks: I can check if I need to do a git pull when I do ____ on GitHub Desktop or do ____ on terminal.",
    answers: {
      a: "git status/git status",
      b: "fetch origin/git pull",
      c: "git pull/fetch origin",
      d: "fetch origin/git status",
    },
    correct: "d",
  },
  {
    question: "T/F Git Status tells me what changed I have made on only my local machine. It does not make me aware of changes on github.com",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "Which of the following IS a base rule of thumb for a commit message?",
    answers: {
      a: "At least 20 characters in length.",
      b: "Be brief in detail.",
      c: "No need for attention to grammar and spelling.",
      d: "Require Context to be provided from the person who made the commit.",
    },
    correct: "a",
  },
  {
    question: "Fill in the blanks: In GitHub Desktop, when viewing a potential commit, changes to lines are colored ____ while deleted lines are colored ____.",
    answers: {
      a: "black/green",
      b: "red/white",
      c: "green/red",
      d: "green/white",
    },
    correct: "c",
  },
  {
    question: "T/F I should fill in both the title and description field where possible in GitHub Desktop.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "a",
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