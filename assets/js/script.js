var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');
var timer = document.querySelector('#time');
var answers = document.querySelector('#answers');
var question = document.querySelector('#question');
var helpNav = document.querySelector('#help-nav');
var scoresNav = document.querySelector('#scores-nav');
var instructions = document.querySelector('#instructions');
var photo = document.querySelector('#photo');
var startButton = document.querySelector('#start-button');
var questionAnswerEl = document.querySelector("#question-answers");
var startScreen = document.querySelector("#start-screen");
var timerId = document.querySelector('#timer-id');




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

timer.innerHTML = timeSeconds;

function countDown() {
    var countInterval = setInterval(function() {
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


//randomuser api fetch
async function getRandomUser() {
    const apiUrl = 'https://randomuser.me/api/?inc=name,picture';
    const result = await fetch(apiUrl);
    const data = await result.json();
    console.log(data.results);        
    
    data.results.forEach(person => {

        var photo = `<div id="randomUserPhoto">
        <img src="${person.picture.medium}"
        </div>`;
        console.log(photo);
        $('#randomUserPhoto').append(photo);
        
    });
}

async function getQuestions() {
    var response = await fetch("https://opentdb.com/api.php?amount=5");
    var data = await response.json();
    return data
}

function randomizeAnswers(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var s = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[s]] = [arr[s], arr[i]];
    }
}

getQuestions().then((data) => {
    var results = data.results[0];
    console.log(results);
    document.getElementById('question').innerHTML = results.question;
    var answers = [...results.incorrect_answers, results.correct_answer];
    randomizeAnswers(answers);
    for (var i = 0; i < 4; i++) {
        var index = i + 1;
        document.getElementById(`choice${index}label`).innerHTML = answers[i];
        document.getElementById(`choice${index}`).value = answers[i];
    }

    document.getElementById('guess').addEventListener('click', () => {
        document.querySelectorAll('input[name="choice"]').forEach((el) => {
            var accuracy = document.getElementById('accuracy');
            if(el.checked){
                console.log(el.value);
                console.log(results.correct_answer);

                if(el.value === results.correct_answer) {
                    accuracy.innerHTML = "Good job!"
                } else accuracy.innerHTML = `Sorry! The correct answer is ${results.correct_answer}`;
            } 
        });
    });
});


// //open trivia api fetch
// async function sendRequest() {
//     const apiUrl = 'https://opentdb.com/api.php?amount=5';
//     const result = await fetch(apiUrl);
//     const data = await result.json();
//     console.log(data.results);
//     useApiResponse(data.results[0]);
// }
// //load open trivia api data
// sendRequest();

// //load questions and and answers and make them random 
// function useApiResponse(data) {
//     var correctAnswer = data.correct_answer;
//     var incorrectAnswer = data.incorrect_answers;
//     var incorrectList = incorrectAnswer;
//     incorrectList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
//     // console.log(incorrectList);
//     // console.log(correctAnswer);

//     question.innerHTML = `
//         ${data.question} <br> 
//         <span class = "category">Catagory: ${data.category} </span> <br> 
//         <span class = "difficulty">Difficulty: ${data.difficulty} </span>`;
//     answers.innerHTML = `
//         ${incorrectList.map((option, index) => `
//             <button> ${index + 1}. <span>${option}</span> </button>
//     `).join('')}
//     `;
// //     answers.addEventListener("click", function() {
// //         //console.log(incorrectList)
// //         if (correctAnswer) {
// //             console.log("Correct!")
// //         } else {
// //             console.log("Incorrect!")
// //         }
// //         });
//     //nextQuestion();
// // }
// }

// function nextQuestion() {
//     for (var i = 0; i < data.length; i++) {
//     }

// }
