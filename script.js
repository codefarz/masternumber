// Declarar remainingAttempts globalmente para que esté disponible en todas las funciones
let remainingAttempts;

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
        return;
    }

    remainingAttempts--;

    let match = 0;
    let coincidence = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === numberToGuess[i]) {
            match++;
        } else if (numberToGuess.includes(guess[i])) {
            coincidence++;
        }
    }

    if (match === 4) {
        document.getElementById('finalBody').textContent = "¡Felicidades! Has adivinado el número: " + numberToGuess;
        showFinalModal();
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
