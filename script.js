// Declarar remainingAttempts globalmente para que esté disponible en todas las funciones
let remainingAttempts;

// Declaramos los sonidos que tendrá el juego
let startGameSound = new Audio('/sounds/success-fanfare-trumpets-6185.mp3');
let coincidenceSound = new Audio('/sounds/interface-trial-124464.mp3');
let matchSound = new Audio('/sounds/decidemp3-14575.mp3');
let winSound = new Audio('/sounds/success-1-6297.mp3');
let loseSound = new Audio('/sounds/videogame-death-sound-43894.mp3');


document.addEventListener('DOMContentLoaded', (event) => {
    var myModal = new bootstrap.Modal(document.getElementById('attemptsModal'), {
        keyboard: false,
        backdrop: 'static'
    });
    myModal.show();
});

function setAttempts() {
    remainingAttempts = document.getElementById('attemptInput').value;
    if (remainingAttempts > 0) {
        document.getElementById('attemptsDisplay').textContent = "Intentos: " + remainingAttempts;
        let myModal = bootstrap.Modal.getInstance(document.getElementById('attemptsModal'));
        myModal.hide();
    }
    else {
        alert("Introduzca un número de intentos")
    }
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

function guessNumber() {
    let guess = document.getElementById('guess').value;
    if (guess.length !== 4 || isNaN(guess)) {
        alert("Por favor, introduce un número de 4 cifras.");
        return;
    }

    if (remainingAttempts === 0) {
        document.getElementById('finalBody').textContent = "No quedan intentos. El número era " + numberToGuess;
        showFinalModal();
        loseSound.play();
        return;
    }

    remainingAttempts--;

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
        document.getElementById('finalBody').textContent = "¡Felicidades! Has adivinado el número: " + numberToGuess;
        showFinalModal();
        winSound.play();
        return;
    }

    document.getElementById('result').innerHTML = "Coincidencias: " + coincidence + ", Matchs: " + match + ". Te quedan " + remainingAttempts + " intentos.";

    addRowToTable(guess, coincidence, match)
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
