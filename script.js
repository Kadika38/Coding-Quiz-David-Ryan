//spot vars
var startBtn = document.querySelector("#startBtn");
var mainSec = document.querySelector("#mainSec");
var startSec = document.querySelector("#startSec");
var viewHighscores = document.querySelector("#viewHighscores");
var timer = document.querySelector("#timer");

//qArrays
var q1Array = [0, 0, 0, 0, 0, "alerts"];
var q2Array = ["The condition in an if / else statement is enclosed within ______.", "quotes", "curly brackets", "parantheses", "square brackets", "parantheses"];
var q3Array = ["Arrays in javascript can be used to store ______.", "numbers and strings", "other arrays", "booleans", "all of the above", "all of the above"];
var q4Array = ["String values must be enclosed within ______ when being assigned to variables.", "commas", "curly brackets", "quotes", "parantheses", "quotes"];
var q5Array = ["A very useful tool used during development and debugging for printing to the debugger is:", "JavaScript", "terminal / bash", "for loops", "console.log", "console.log"];

//other vars
var currentQ = 1;
var timeLeft = 75;
var finished = false;
if (localStorage.getItem("initialsSto")) {
    console.log("they exist")
    var initials = JSON.parse(localStorage.getItem("initialsSto"));
}
else {
    var initials = [];
    console.log("anyways");
}

viewHighscores.addEventListener("click", function() {
    loadHighscores();
})

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

//add function to start quiz button
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
            evalQ(holder, val);
        })
    };
});

function evalQ(hldr, answer) {
    console.log("evaluating");
    qArray = getqArray();
    qCorAnswer = qArray[5];
    if (answer == qCorAnswer) {
        console.log("Correct!");
    };
    if (answer != qCorAnswer) {
        console.log("Incorrect");
        timeLeft = timeLeft - 10;
    };
    loadQ();
};

function loadQ() {
    currentQ++;
    console.log(currentQ);
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
    };
};

function finishQuiz() {
    finished = true;
    console.log("Youre done");
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
            evalQ(holder, val);
        })
    };
}

//helper funcs
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

function addLi(thatList, stringy) {
    dude = document.createElement("li");
    dude2 = document.createElement("button");
    dude2.textContent = stringy;
    dude.appendChild(dude2);
    thatList.appendChild(dude);
}

function addLiHS(thatList, objecty) {
    dude = document.createElement("li");
    dude.textContent = objecty.in + " " + objecty.hs;
    thatList.appendChild(dude);
}

