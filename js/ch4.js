/* Chapter 4 Quiz */

"use strict";

// Questions
let questions = [
  {
    question: "Why do we do branching?",
    answers: {
      a: "It is a great way to organize our code.",
      b: "It is a great way to help further display version history.",
      c: "Both A & B",
    },
    correct: "c",
  },
  {
    question: "T/F We should branch early and often.",
    answers: {
      a: "True",
      b: "False",
      // c: "goo goo gaga",
    },
    correct: "a",
  },
  {
    question: "Fill in the blanks: I am working on a new feature right now, therefore, I should be coding in the ____ branch. In the ____ branch, I have a stable/working product.",
    answers: {
      a: "main/developed",
      b: "developed/main",
      c: "main/inProgress",
      d: "inProgress/main",
    },
    correct: "d",
  },
  {
    question: "T/F Branching does NOT help in reverting files in case a newer version breaks a system.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "Which of the following IS NOT one the 3 parts of branching?.",
    answers: {
      a: "Creating a Branch",
      b: "Pulling a Branch",
      c: "Adding Code to a Branch",
      d: "Commit/Pushing to a Branch",
    },
    correct: "b",
  },
  {
    question: "Fill in the blanks: _____ is used to switch between branches whereas _____ is used to commit/push them to GitHub.com",
    answers: {
      a: "git checkout/git match",
      b: "git match/git checkout",
      c: "git push/git checkout",
      d: "git checkout/git push",
    },
    correct: "d",
  },
  {
    question: "T/F When you add a file to a branch and push it, it will show up on all branches of the repository.",
    answers: {
      a: "True",
      b: "False",
    },
    correct: "b",
  },
  {
    question: "A repository has 3 branches: main, inProgress, and beta. I am ready to merge INTO main from beta. Where should I checkout into?",
    answers: {
      a: "main",
      b: "inProgress",
      c: "beta",
      d: "There's no need to checkout from any branch.",
    },
    correct: "a",
  },
  {
    question: "Fill in the blanks: I want to commit changes in my new branch, so I will use the command _____. When I first created the branch, I used the command _____ to upload it to github.com",
    answers: {
      a: "git push -u origin/git push",
      b: "git push/git push -u origin",
      c: "git push -u origin/git create branch",
      d: "git create branch/git push -u origin",
    },
    correct: "b",
  },
  {
    question: "Jesse is working on a project. He used the beta branch to share his project with beta users. Now that the beta trial is over, the branch is no longer used. Should Jesse delete the branch?",
    answers: {
      a: "Yes, because GitHub limits storage so it would free up much needed space.",
      b: "Yes, because having less branches will create for less confusion.",
      c: "No, because branches contain valuable version history.",
      d: "No, because each branch will contain a working version of that iteration of the project, which can be useful if Jesse needed to revert a version or more in the future.",
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