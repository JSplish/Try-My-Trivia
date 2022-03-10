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




// Menu button for mobile to show 'help' and 'scores'
burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle;

});

helpNav.addEventListener('click', triviaRules)

function triviaRules() {
    instructions.classList.remove('hide');

}

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
            timer.innerHTML = "Time Out!";
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

    countDown();

}


//generate randomuser as page loads
window.onload = getRandomUser

var data = []
//randomuser api fetch
async function getRandomUser() {
    const apiUrl = 'https://randomuser.me/api/?inc=name,picture';
    const result = await fetch(apiUrl);
    data = await result.json();
    console.log(data.results);

    data.results.forEach(person => {
        photo.innerHTML = `<img src="${person.picture.large}">`;
        console.log(photo);
        randomName.innerHTML = `Hi, my name is ${person.name.first}. Today you will be trying my trivia!`
    });
}


var index = 0
var questions = []
    //open trivia api fetch
async function sendRequest() {
    const apiUrl = 'https://opentdb.com/api.php?amount=5';
    const result = await fetch(apiUrl);
    questions = await result.json();
    console.log(questions.results);
    renderQuestion(questions.results[index]);
}
//load open trivia api data
sendRequest();

//load questions and and answers and make them random 
function renderQuestion(data) {
    var correctAnswer = data.correct_answer;
    var incorrectAnswer = data.incorrect_answers;
    var incorrectList = incorrectAnswer;
    incorrectList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(incorrectList);
    // console.log(correctAnswer);

    question.innerHTML = `
        <span class = "category is-size-4">Category: ${data.category} </span> <br>
        <span class = "difficulty is-size-6">Difficulty: ${data.difficulty} </span> <br> 
        ${data.question} `;
    answers.innerHTML = `
        ${incorrectList.map((option, index) => `
            <button class="my-6 button is-info is-rounded" data-answer="${option}"> ${index + 1}. ${option} </button>
    `).join('')}`;

    
    var clickCallback = function(event) {
        //console.log(incorrectList)
        var checkAnswer = event.target.dataset.answer
        console.log(event.target)
        if (correctAnswer === checkAnswer) {
            console.log("Correct!")
            points = points + 10
            //return points;
            console.log(points);
            document.getElementById("accuracy").innerHTML="Correct!";
        } else {
            console.log("Incorrect!")
            document.getElementById("accuracy").innerHTML="Incorrect!";
        }
        
        accuracy.setAttribute("class", "show");
    

        answers.removeEventListener("click", clickCallback)
        setTimeout(nextQuestion, 1000);
        }
    answers.addEventListener("click", clickCallback);
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
    console.log(highScores)
    var finalScore = {
        initials: document.getElementById("initials").value,
        points: points
    }
    highScores.push(finalScore)
    console.log(highScores)
    localStorage.setItem("finalScore", JSON.stringify(highScores));
    displayScores();
    submitButton.disabled = true;
}

function displayScores() {
    //document.getElementById("finalScore").style.display = "none";
    //document.getElementById("display-highscore").style.display = "block";
    var savedScores = localStorage.getItem("finalScore");
    savedScores = JSON.parse(savedScores);
    for (var i = 0; i < savedScores.length; i++) {
        var li = document.createElement("li");
        li.textContent = savedScores[i].initials + " " + savedScores[i].points;
        document.getElementById("highScore").appendChild(li);
    }
}


function endQuiz() {
    console.log('Quiz has ended')

    questionAnswerEl.setAttribute("class", "hide");

    timerId.setAttribute("class", "hide");
    
    endScreen.setAttribute("class", "show")
    
    //saveScore();

    endScore.textContent = points;

    document.getElementById('submit').addEventListener("click", function() {
        if (!initials.value) {
            return
        }
        saveScore();
    })
}