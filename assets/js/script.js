// Mobile
var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');
var timer = document.querySelector('#time');
var answers = document.querySelector("#answers");
var question = document.querySelector("#question");
var accuracy = document.querySelector('#accuracy')

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

function startQuiz() {
    //hide start screen
    var startScreen = document.getElementById("start-screen");
        startScreen.setAttribute("class", "hide");
    
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
    const apiUrl = 'https://opentdb.com/api.php?amount=5';
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
    var incorrectList = incorrectAnswer;
    incorrectList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(incorrectList);
    // console.log(correctAnswer);

    question.innerHTML = `
        ${data.question} <br> 
        <span class = "category">Catagory: ${data.category} </span> <br> 
        <span class = "difficulty">Difficulty: ${data.difficulty} </span>`;
    answers.innerHTML = `
        ${incorrectList.map((option, index) => `
            <button> ${index + 1}. <span>${option}</span> </button>
    `).join('')}
    `;
//     answers.addEventListener("click", function() {
//         //console.log(incorrectList)
//         if (correctAnswer) {
//             console.log("Correct!")
//         } else {
//             console.log("Incorrect!")
//         }
//         });
    //nextQuestion();
// }
}

// function nextQuestion() {
//     for (var i = 0; i < data.length; i++) {
//     }

// }