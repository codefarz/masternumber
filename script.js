// Declaramos las variables globales
let remainingAttempts;
let attemptsUsed
let playerName;

// Declaramos los sonidos que tendrá el juego
let startGameSound = new Audio('success-fanfare-trumpets-6185.mp3');
let coincidenceSound = new Audio('interface-trial-124464.mp3');
let matchSound = new Audio('decidemp3-14575.mp3');
let winSound = new Audio('goodresult-82807.mp3');
let loseSound = new Audio('videogame-death-sound-43894.mp3');


document.addEventListener('DOMContentLoaded', (event) => {
    let myModal = new bootstrap.Modal(document.getElementById('attemptsModal'), {
        keyboard: false,
        backdrop: 'static'
    });
    myModal.show();
});

function setAttempts() {
    remainingAttempts = document.getElementById('attemptInput').value;
    attemptsUsed = remainingAttempts;
    let name = document.getElementById('nameInput').value;
    if (remainingAttempts > 0) {
        document.getElementById('attemptsDisplay').innerHTML = "Intentos: " + remainingAttempts + " ❤️";
        let myModal = bootstrap.Modal.getInstance(document.getElementById('attemptsModal'));
        myModal.hide();
    }
    else {
        alert("Introduzca un número de intentos")
    }
    playerName = name;
    document.getElementById('welcomeMessage').innerHTML = "Hola Master " + playerName;
    startGameSound.play();
}

let numberToGuess = generateNumber();

function generateNumber() {
    let number = "";
    while(number.length < 4){
        let randomDigit = Math.floor(Math.random() * 10);
        if(number.indexOf(randomDigit.toString()) == -1){
            number += randomDigit;
        }
    }
    return number;
}

let inputElement = document.getElementById('guess');
inputElement.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        guessNumber();
    }
});

let attemptInputElement = document.getElementById('attemptInput');
attemptInputElement.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        setAttempts();
    }
});

function guessNumber() {
    let guess = document.getElementById('guess').value;
    if (guess.length !== 4 || isNaN(guess)) {
        alert("Por favor, introduce un número de 4 cifras.");
        return;
    }

    remainingAttempts--;

    if (remainingAttempts === 0) {
        document.getElementById('finalTitle').innerHTML = "Fin del juego Master " + playerName;
        document.getElementById('finalBody').innerHTML = "No te quedan intentos pero puedes mejorar, inténtalo de nuevo. El número era " + numberToGuess;
        showFinalModal();
        loseSound.play();
        return;
    }

    let match = 0;
    let coincidence = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === numberToGuess[i]) {
            match++;
            matchSound.play();
        } else if (numberToGuess.includes(guess[i])) {
            coincidence++;
            coincidenceSound.play();
        }
    }

    if (match === 4) {
        attemptsUsed = attemptsUsed-remainingAttempts;
        document.getElementById('finalTitle').innerHTML = "Ganaste el juego Master " + playerName;
        document.getElementById('finalBody').innerHTML = "¡Felicidades! Has adivinado el número: <strong>" + numberToGuess + "</strong>. Lo has logrado en <strong>" + attemptsUsed + "</strong> intentos. ¿Eres capaz de mejorar tu marca?";
        showFinalModal();
        winSound.play();
        return;
    }    

    addRowToTable(guess, coincidence, match)
    document.getElementById('attemptsDisplay').innerHTML = "Te quedan: " + remainingAttempts + " ❤️ intentos"
}

function showFinalModal() {
    let myModal = new bootstrap.Modal(document.getElementById('finalModal'), {
        keyboard: false,
        backdrop: 'static'
    });
    myModal.show();
}

function addRowToTable(guess, coincidence, match) {
    let table = document.getElementById('attemptsTable').getElementsByTagName('tbody')[0];
    let newRow = `
        <tr>
            <th>${guess}</th>
            <td>${coincidence}</td>
            <td>${match}</td>
        </tr>
    `;
    table.innerHTML += newRow;
}

document.querySelector(".help-icon").addEventListener('click', function() {
    let modal = new bootstrap.Modal(document.getElementById('instructionsModal'));
    modal.show();
});
