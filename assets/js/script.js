// Mobile
var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');
var timer = document.querySelector('#time');
var answers = document.querySelector("#answers")
var question = document.querySelector("#question")

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
    useApiResponse(data.results[0]);
}
sendRequest();

//This function works, but doesn't randomize the answers
// function useApiResponse(data) {
//     document.querySelector("#category").innerHTML = `Category: ${data.results[0].category}`
//     document.querySelector("#difficulty").innerHTML = `Dfficulty: ${data.results[0].difficulty}`
//     document.querySelector("#question").innerHTML = `Question: ${data.results[0].question}`
//     document.querySelector("#answer1").innerHTML = data.results[0].correct_answer
//     document.querySelector("#answer2").innerHTML = data.results[0].incorrect_answers[0]
//     document.querySelector("#answer3").innerHTML = data.results[0].incorrect_answers[1]
//     document.querySelector("#answer4").innerHTML = data.results[0].incorrect_answers[2]
// }

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
            <li> ${index + 1}. <span>${option}</span> </li>
    `).join('')}
    `;
}