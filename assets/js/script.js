// Mobile
var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');

var timer = document.querySelector('#time');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

var startButton = document.querySelector('#start-button');
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    //hide start screen
    var startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "hide");
    startButton.setAttribute("class", "hide");

    //un=hide questions section
}

window.onload = getRandomUser

async function getRandomUser() {
    const apiUrl = 'https://randomuser.me/api/?results=10';
    const result = await fetch(apiUrl);
    const data = await result.json();
    console.log(data.results);
}

async function sendRequest() {
    const apiUrl = 'https://opentdb.com/api.php?amount=10';
    const result = await fetch(apiUrl);
    const data = await result.json();
    console.log(data.results);
}


//randomuser data from api
//randomuser host displayed on homepage
//on click start button get rid of start button
//getting question data from api
//timer interval setup 10s
//generate question element
//iterating through questions
//skateboard+1 increasing difficulty over question iterations
//generate answer elments
//logic for checking correct/incorrect ans
//iterating through questions
//track score- score is time left on timer (10 pt max)
//skateboard+1 points will be weighted by difficulty
//save score in localstorage
//display score on endgame
//highscore with input that's a form
//display highscore
//play again option