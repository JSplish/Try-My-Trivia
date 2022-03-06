var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');
var startButton = document.querySelector('#start-button');
var timer = document.querySelector('#time');
var answers = document.querySelector('#answers');
var question = document.querySelector('#question');
var helpNav = document.querySelector('#help-nav');
var scoresNav = document.querySelector('#scores-nav');
var instructions = document.querySelector('#instructions');

// Menu button for mobile to show 'help' and 'scores'
burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

 helpNav.addEventListener('click', triviaRules)
    function triviaRules() {
        instructions.classList.remove('hide');
        //instructions.classList.add('hide');
 }

// Timer

var timeSeconds = 30
var timerId;

timer.innerHTML = timeSeconds;

var countDown = setInterval (()=>{
    timeSeconds--;
    timer.innerHTML = timeSeconds;
    if(timeSeconds < 0){
        clearInterval(countDown);
        timer.innerHTML = "TIME OUT!";
    }
},1000)


startButton.addEventListener('click', startQuiz);
function startQuiz() {
    //hide start screen
    var startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "hide");
    startButton.setAttribute("class", "hide");
    //un=hide questions section
}

//generate randomuser as page loads
window.onload = getRandomUser

//randomuser api fetch
async function getRandomUser() {
    const apiUrl = 'https://randomuser.me/api/?results=10';
    const result = await fetch(apiUrl);
    const data = await result.json();
    console.log(data.results);
}

//open trivia api fetch
async function sendRequest() {
    const apiUrl = 'https://opentdb.com/api.php?amount=10';
    const result = await fetch(apiUrl);
    const data = await result.json();
    console.log(data.results);
    useApiResponse(data.results[0]);
}
//load open trivia api data
sendRequest();

//load questions and and answers and make them random 
function useApiResponse(data) {
    var correctAnswer = data.correct_answer;
    var incorrectAnswer = data.incorrect_answers;
    var optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(optionsList);
    // console.log(correctAnswer);
    question.innerHTML = `${data.question} <br> <span class = "category">${data.category} </span>`;
    answers.innerHTML = `
        ${optionsList.map((option, index) => `
            <button> ${index + 1}. <span>${option}</span> </button>
    `).join('')}
    `;
}


