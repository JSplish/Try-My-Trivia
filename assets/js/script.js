var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');
var timer = document.querySelector('#time');
var answers = document.querySelector('#answers');
var question = document.querySelector('#question');
var helpNav = document.querySelector('#help-nav');
var scoresNav = document.querySelector('#scores-nav');
var instructions = document.querySelector('#instructions');
var photo = document.querySelector('#photo');
var randomName = document.querySelector('#randomName');
var startButton = document.querySelector('#start-button');
var questionAnswerEl = document.querySelector("#question-answers");
var startScreen = document.querySelector("#start-screen");
var timerId = document.querySelector('#timer-id');
var endScreen = document.querySelector('#end-screen');
var accuracy = document.querySelector('#accuracy');
var points = 0
var initials = document.querySelector('#initials');
var submitButton = document.querySelector('#submit');
var highScores = JSON.parse(localStorage.getItem("finalScore")) || [];
var endScore = document.querySelector("#end-score");
var photoAPI = document.querySelector('#photoAPI');
var currentScore = document.querySelector('#current-score');
var playAgainButton = document.querySelector("#play-again");
// var questionDifficulty = "";


helpNav.addEventListener('click', triviaRules);

function triviaRules() {
    if (instructions.style.display === "none") {
        instructions.style.display = "block";
        // instructions.classList.remove('hide');
    } else {
        instructions.style.display = "none";
    }

}

// Menu button for mobile to show 'help' and 'scores'
burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});



// Timer

var timeSeconds = 11
var countInterval;
timer.innerHTML = timeSeconds;

function countDown() {
    clearInterval(countInterval)
    timeSeconds = 11
    countInterval = setInterval(function() {
        if (timeSeconds === 0) {
            clearInterval(countInterval);
            timer.innerHTML = "Expired!";
            nextQuestion();
        } else {
            timeSeconds--;
            timer.innerHTML = timeSeconds;
        }
    }, 1000);
}

// hide q&a on page load
questionAnswerEl.setAttribute("class", "hide");

//hide start screen
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startScreen.setAttribute("class", "hide");
    startButton.setAttribute("class", "hide");

    //un-hide questions section
    questionAnswerEl.setAttribute("class", "show");

    timerId.setAttribute("class", "show");
    currentScore.setAttribute("class", "show is-size-4");

    countDown();

}


//generate randomuser as page loads
window.onload = getRandomUser
var apiUrl = 'https://randomuser.me/api/?inc=name,picture';
var data = []
var personImage;
//randomuser api fetch
async function getRandomUser() {
    const result = await fetch(apiUrl);
    data = await result.json();
    // console.log(data.results);

    data.results.forEach(person => {
        personImage = person.picture.large;
        photo.innerHTML = `<img src="${person.picture.large}">`;
        // console.log(photo);
        randomName.innerHTML = `"Hi, my name is ${person.name.first}. Today you will be trying my trivia!"`
    });
}


var index = 0
var questions = []
    //open trivia api fetch
async function sendRequest() {
    const apiUrl = 'https://opentdb.com/api.php?amount=5';
    const result = await fetch(apiUrl);
    questions = await result.json();

    // console.log(questions.results);
    renderQuestion(questions.results[index]);
}
//load open trivia api data
sendRequest();

//load questions and and answers and make them random 
function renderQuestion(questionData) {
    var correctAnswer = questionData.correct_answer;
    var incorrectAnswer = questionData.incorrect_answers;
    var incorrectList = incorrectAnswer;
    incorrectList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(incorrectList);
    photoAPI.innerHTML = `<img src="${personImage}">`;
    question.innerHTML = `
        <span class = "category is-size-5">Category - ${questionData.category} </span> <br>
        <span class = "difficulty is-size-5 is-capitalized mb-1">Difficulty - ${questionData.difficulty} </span> <br> <hr class="has-background-dark my-1">
        <span class="is-size-4-tablet is-size-5-mobile has-text-weight-bold">${questionData.question} </span>`;
    answers.innerHTML = `
        ${incorrectList.map((option, index) => `
            <button class="mt-3 button is-info is-rounded is-medium" data-answer="${option}"> ${index + 1}. ${option} </button>
    `).join('')}`;

    currentScore.innerHTML = `<span>Your current score is ${points}</span>`;
    
    var clickCallback = function(event) {
        //console.log(incorrectList)
        var checkAnswer = event.target.dataset.answer;
        // console.log(event.target);
        if (correctAnswer === checkAnswer) {
            // console.log("Correct!");
            
            if (questionData.difficulty === "medium"){
                points = points + timeSeconds * 2;
                // console.log("2x pts");
            }
            else if (questionData.difficulty === "hard"){
                points = points + timeSeconds * 3;
                // console.log("3x pts");
            }
            else {
                points = points + timeSeconds;
            }
            
            
            currentScore.innerHTML = `<span>Your current score is ${points}</span>`;
            //return points;
            // console.log(points);
            accuracy.innerHTML="WOWZERS! You are smart! 😃 ";

        } else {
            // console.log("Incorrect!")
            accuracy.innerHTML="Incorrect! 🤪 The correct answer is " + correctAnswer;
        }
    
        accuracy.setAttribute("class", "mt-auto show is-size-5-mobile is-size-4-tablet");
        // debugger
    
        answers.removeEventListener("click", clickCallback);
        setTimeout(nextQuestion, 1500);
    }
    answers.addEventListener("click", clickCallback);
    console.log(points);
}

    // setTimeout(function(){
    //     accuracy.setAttribute("class", "show");
    // }, 2000);

function nextQuestion() {
    document.getElementById("accuracy").innerHTML="";
    index ++
    if (index < 5) {
        renderQuestion(questions.results[index])
        countDown()
    } else {
        endQuiz()
    }
}

function saveScore() {
    playAgainButton.setAttribute("class","button is-info is-rounded is-medium mb-5 show-inline");
    // console.log(highScores)
    var finalScore = {
        initials: document.getElementById("initials").value,
        points: points
    }
    highScores.push(finalScore)
    // highScores.push({initials: 'same score', points: 11})
    
    var mostRecentLast10Scores = highScores.sort((score1, score2)=> {
        if (score1.points < score2.points) {
            return 1
        } else if (score1.points > score2.points) {
            return -1
        } else {
            return 0
        }
    });
// console.log(mostRecentLast10Scores);
     mostRecentLast10Scores = mostRecentLast10Scores.slice(0,10);
    localStorage.setItem("finalScore", JSON.stringify(mostRecentLast10Scores));
    // console.log(mostRecentLast10Scores);
    displayScores();
    submitButton.setAttribute("class", "hide");
    initials.disabled = true;
}

function displayScores() {
    //document.getElementById("finalScore").style.display = "none";
    //document.getElementById("display-highscore").style.display = "block";
    var savedScores = localStorage.getItem("finalScore");
    savedScores = JSON.parse(savedScores);
    for (var i = 0; i < savedScores.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("class","is-size-5");
        li.textContent = savedScores[i].initials + " - " + savedScores[i].points + " points";
        document.getElementById("highScore").appendChild(li);
    }
}


function endQuiz() {
    // console.log('Quiz has ended')
    clearInterval(countInterval);

    questionAnswerEl.setAttribute("class", "hide");

    timerId.setAttribute("class", "hide");
    
    endScreen.setAttribute("class", "show");

    currentScore.setAttribute("class", "hide");
    
    //saveScore();

    endScore.textContent = points;

    document.getElementById('submit').addEventListener("click", function() {
        if (!initials.value) {
            return
        }
        saveScore();
    })
}

var reload = function(){
    window.location.reload();
}
playAgainButton.addEventListener("click", reload);


// readme
// complete presentation and assign speaking roles
// clean code
// fix what the help button says
// deploy links
// Fix help button to hide after shown
// display score throughout game
// score = time. if we have time...which equals score.
// category and difficulty differences between question