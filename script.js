//QuerySelected vars
var startBtn = document.querySelector("#startBtn");
var mainSec = document.querySelector("#mainSec");
var startSec = document.querySelector("#startSec");
var viewHighscores = document.querySelector("#viewHighscores");
var timer = document.querySelector("#timer");

//Question Arrays for storing the questions and their answers
//q1Array only stores the correct answer of q1
var q1Array = [0, 0, 0, 0, 0, "alerts"];
//these other arrays hold at [0] the question, [1-4] hold the multiple choice answers, and [5] holds the correct answer.
var q2Array = ["The condition in an if / else statement is enclosed within ______.", "quotes", "curly brackets", "parantheses", "square brackets", "parantheses"];
var q3Array = ["Arrays in javascript can be used to store ______.", "numbers and strings", "other arrays", "booleans", "all of the above", "all of the above"];
var q4Array = ["String values must be enclosed within ______ when being assigned to variables.", "commas", "curly brackets", "quotes", "parantheses", "quotes"];
var q5Array = ["A very useful tool used during development and debugging for printing to the debugger is:", "JavaScript", "terminal / bash", "for loops", "console.log", "console.log"];

//other vars
var currentQ = 1;
var timeLeft = 75;
var alertTimeLeft = 1;
var finished = false;
var lastAnswer = false;
//create storage of initials/highscores by either getting them from local storage or loading in the array for the first time as an empty array
if (localStorage.getItem("initialsSto")) {
    var initials = JSON.parse(localStorage.getItem("initialsSto"));
}
else {
    var initials = [];
}

//When the View High Scores button is clicked, it generates the view of the highscores
viewHighscores.addEventListener("click", function() {
    loadHighscores();
})

//add function to start quiz button
//removes startSec and replaces it with the first question, then run evalQ on the first multiple choice answer the user clicks
startBtn.addEventListener("click", function() {
    startSec.remove();
    startTimer();
    var holder = document.createElement("div");
    mainSec.appendChild(holder);
    var q = document.createElement("h3");
    q.textContent = "Commonly used data types do not include:";
    holder.appendChild(q);
    var brk = document.createElement("br");
    holder.appendChild(brk);
    var listy = document.createElement("ul");
    listy.setAttribute("id", "qHolder");
    holder.appendChild(listy);
    var brk2 = document.createElement("br");
    holder.appendChild(brk2);
    addLi(listy, "strings");
    addLi(listy, "booleans");
    addLi(listy, "alerts");
    addLi(listy, "numbers");
    listyChildren = listy.children;
    for (i = 0; i < listyChildren.length; i++) {
        listyChildren[i].addEventListener("click", function() {
            targ = event.target;
            val = targ.textContent;
            evalQ(val);
        })
    };
});

//Evaluates the answer that the user chose for correctness and passes on the boolean value of the answer
//Also penalizes time for wrong answers
//And runs loadQ to load the next question.
function evalQ(answer) {
    qArray = getqArray();
    qCorAnswer = qArray[5];
    if (answer == qCorAnswer) {
        lastAnswer = true;
    };
    if (answer != qCorAnswer) {
        timeLeft = timeLeft - 10;
        lastAnswer = false;
    };
    loadQ();
};

//Loads the next question from the Question Arrays.  If there are no more questions, it runs finishQuiz.
//Also loads the alert that displays whether or not the last question was answered correctly
function loadQ() {
    currentQ++;
    if (currentQ < 6) {
        qnum = getqArray();
        qtext = mainSec.children[0].children[0];
        qanswers = mainSec.children[0].children[2].children;
        qtext.textContent = qnum[0];
        qanswers[0].children[0].textContent = qnum[1];
        qanswers[1].children[0].textContent = qnum[2];
        qanswers[2].children[0].textContent = qnum[3];
        qanswers[3].children[0].textContent = qnum[4];
    };
    if (currentQ == 6) {
        finishQuiz();
        return;
    };
    loadAlert();
};

//When there are no more questions, finishQuiz is run.  It generates the prompt for inputting initials to store the score and add it to the highscore board
//When the submit button is clicked, the initials and score are stored in local storage and loadHighscores() is run
function finishQuiz() {
    finished = true;
    mainSec.children[0].remove();
    var holder = document.createElement("div");
    mainSec.appendChild(holder);
    var q = document.createElement("h3");
    q.textContent = "All done!";
    holder.appendChild(q);
    var brk = document.createElement("br");
    holder.appendChild(brk);
    var scoreRead = document.createElement("p");
    scoreRead.textContent = "Your final score is " + (timeLeft-1);
    holder.appendChild(scoreRead);
    var brk2 = document.createElement("br");
    holder.appendChild(brk2);
    var enterNameHolder = document.createElement("div");
    var spany = document.createElement("span");
    spany.textContent = "Enter Initials";
    enterNameHolder.appendChild(spany);
    var inputy = document.createElement("input");
    inputy.setAttribute("type", "text");
    inputy.setAttribute("id", "initialsInput");
    enterNameHolder.appendChild(inputy);
    var enterNameButtonAdd = document.createElement("button");
    enterNameButtonAdd.setAttribute("id", "submitBtn");
    enterNameButtonAdd.textContent = "Submit";
    enterNameHolder.appendChild(enterNameButtonAdd);
    holder.appendChild(enterNameHolder);
    var enterNameButton = document.querySelector("#submitBtn");
    var inputyInitials = document.querySelector("#initialsInput");
    enterNameButton.addEventListener("click", function() {
        var initialsNow = {in: inputyInitials.value, hs: timeLeft};
        initials.push(initialsNow);
        initials.sort(function(a, b){return b.hs - a.hs});
        localStorage.setItem("initialsSto", JSON.stringify(initials));
        loadHighscores();
    });
};

//Generates the list of highscores and their corresponding initials
//also offers the ability to clear the scoreboard and to go back to the quiz start page
function loadHighscores() {
    mainSec.children[0].remove();
    var holder = document.createElement("div");
    mainSec.appendChild(holder);
    var q = document.createElement("h3");
    q.textContent = "Highscores";
    holder.appendChild(q);
    var brk = document.createElement("br");
    holder.appendChild(brk);
    var listy = document.createElement("ul");
    holder.appendChild(listy);
    var brk2 = document.createElement("br");
    holder.appendChild(brk2);
    for (inis = 0; inis < initials.length; inis++) {
        addLiHS(listy, initials[inis]);
    };
    var restart = document.createElement("button");
    restart.setAttribute("id", "restartBtn");
    restart.textContent = "Restart";
    holder.appendChild(restart);
    var restartBtn = document.querySelector("#restartBtn");
    //addeventlisten restart
    restartBtn.addEventListener("click", function() {
        beginAgain();
    })
    var clearHighs = document.createElement("button");
    clearHighs.setAttribute("id", "clearBtn");
    clearHighs.textContent = "Clear Highscores";
    holder.appendChild(clearHighs);
    var clearBtn = document.querySelector("#clearBtn");
    clearBtn.addEventListener("click", function() {
        initials  = [];
        localStorage.setItem("initialsSto", initials);
        listy.remove();
    });
};

//when the user restarts the quiz, the original page is generated again
function beginAgain() {
    finished = false;
    mainSec.children[0].remove();
    var holder = document.createElement("div");
    mainSec.appendChild(holder);
    var q = document.createElement("h1");
    q.textContent = "Coding Quiz Challenge";
    holder.appendChild(q);
    var brk = document.createElement("br");
    holder.appendChild(brk);
    var stuff = document.createElement("p");
    stuff.textContent = "Try to answer the follow code related questions within the time limit.  Keep in mind that incorrect answers will penalize your time limit by 10 seconds!";
    stuff.setAttribute("class", "textCentered");
    holder.appendChild(stuff);
    var brk2 = document.createElement("br");
    holder.appendChild(brk2);
    var btnHolder = document.createElement("div");
    btnHolder.setAttribute("class", "flexy centered");
    holder.appendChild(btnHolder);
    var startBtn2Add = document.createElement("button");
    startBtn2Add.textContent = "Start Quiz";
    startBtn2Add.setAttribute("id", "startBtn2");
    btnHolder.appendChild(startBtn2Add);
    var startBtn2 = document.querySelector("#startBtn2");
    startBtn2.addEventListener("click", function() {
        quizAgain();
    });
};

//function that runs when the quiz is started for a second or greater consecutive time.  Resets the time left and generates the quiz
function quizAgain() {
    timeLeft = 75;
    startTimer();
    currentQ = 1;
    mainSec.children[0].remove();
    var holder = document.createElement("div");
    mainSec.appendChild(holder);
    var q = document.createElement("h3");
    q.textContent = "Commonly used data types do not include:";
    holder.appendChild(q);
    var brk = document.createElement("br");
    holder.appendChild(brk);
    var listy = document.createElement("ul");
    holder.appendChild(listy);
    var brk2 = document.createElement("br");
    holder.appendChild(brk2);
    addLi(listy, "strings");
    addLi(listy, "booleans");
    addLi(listy, "alerts");
    addLi(listy, "numbers");
    listyChildren = listy.children;
    for (i = 0; i < listyChildren.length; i++) {
        listyChildren[i].addEventListener("click", function() {
            targ = event.target;
            val = targ.textContent;
            evalQ(val);
        })
    };
}

//Whenever a question is answered and a new question is loaded, loadAlert() runs.
//It checks the correctness of the users answer and generates a <p> element showing this.
//startAlertTimer runs after this to make sure the alert only last for 1 second
function loadAlert() {
    var qholder = mainSec.children[0];
    var addAlert = document.createElement("p");
    if (lastAnswer) {
        addAlert.textContent = "Correct!";
    }
    else {
        addAlert.textContent = "Incorrect!";
    };
    qholder.appendChild(addAlert);
    startAlertTimer();
};

//sets a 1 second timer and runs clearAlert() at the end of the 1 second
function startAlertTimer() {
    alertTimeLeft = 1;
    var timeIntervalAlert = setInterval(function() {
        alertTimeLeft--;
        if (alertTimeLeft == 0) {
            clearInterval(timeIntervalAlert);
            clearAlert();
        };
    }, 1000);
}

//removes the alert <p>
function clearAlert() {
    var shownAlert = mainSec.children[0].children[4];
    shownAlert.remove();
};

//This is the timer function for the quiz.  It reduces the time left every second until the quiz has been finished
//If the time runs out, it ends the quiz
function startTimer() {
    var timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft == 0) {
            clearInterval(timeInterval);
            finishQuiz();
        };
        if (finished) {
            clearInterval(timeInterval);
        };
    }, 1000);
}

//helper funcs
//gets the right question array based on the current question
function getqArray() {
    if (currentQ == 1) {
        return q1Array;
    }
    if (currentQ == 2) {
        return q2Array;
    }
    if (currentQ == 3) {
        return q3Array;
    }
    if (currentQ == 4) {
        return q4Array;
    }
    if (currentQ == 5) {
        return q5Array;
    }
}

//adds buttons as list items for the multiple choice answers
function addLi(thatList, stringy) {
    dude = document.createElement("li");
    dude2 = document.createElement("button");
    dude2.textContent = stringy;
    dude.appendChild(dude2);
    thatList.appendChild(dude);
}

//adds the stored initials and highscores as list items for use in the high scores scoreboard
function addLiHS(thatList, objecty) {
    dude = document.createElement("li");
    dude.textContent = objecty.in + " " + objecty.hs;
    thatList.appendChild(dude);
}