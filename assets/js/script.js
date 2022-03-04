// Mobile
var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

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
