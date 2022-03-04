// Mobile
var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');
var timer = document.querySelector('#time');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

function startQuiz() {
    //hide start screen
    var startScreen = document.getElementById("start-screen");
        startScreen.setAttribute("class", "hide");
    
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
