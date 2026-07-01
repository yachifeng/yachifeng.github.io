// Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;


// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);


// Start game
initializeGame();


function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random Number: " + randomNumber);
    attempts = 0;

    // Hide Reset button
    document.querySelector("#resetBtn").style.display = "none";

    // Show Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    // Reset attempts left
    document.querySelector("#attemptsLeft").textContent = 7;

    // Clear textbox
    let playerGuess = document.querySelector("#playerGuess");

    playerGuess.value = "";
    playerGuess.focus();

    // Clear feedback
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    feedback.style.color = "black";

    // Clear previous guesses
    document.querySelector("#guesses").textContent = "";
}


function checkGuess() {

    let playerGuess = document.querySelector("#playerGuess");
    let guess = Number(playerGuess.value);
    console.log("Player Guess: " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    // Validate input
    if (guess < 1 || guess > 99 || isNaN(guess)) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts: " + attempts);
    document.querySelector("#attemptsLeft").textContent =
        7 - attempts;

    // Show previous guesses
    document.querySelector("#guesses").textContent += guess + " ";
    feedback.style.color = "orange";

    // Correct guess
    if (guess == randomNumber) {
        wins++;
        document.querySelector("#wins").textContent = wins;
        feedback.textContent =
            "You guessed it! You Won! You guessed the number in "
            + attempts + " attempts!";
        feedback.style.color = "darkgreen";
        playerGuess.value = "";
        gameOver();
    }

    // Out of attempts
    else if (attempts == 7) {
        losses++;
        document.querySelector("#losses").textContent = losses;
        feedback.textContent =
            "You Lost! The correct number was "
            + randomNumber;
        feedback.style.color = "red";
        playerGuess.value = "";
        gameOver();
    }

    // Guess too high
    else if (guess > randomNumber) {
        feedback.textContent = "Guess was high";
        playerGuess.value = "";
        playerGuess.focus();
    }

    // Guess too low
    else {
        feedback.textContent = "Guess was low";
        playerGuess.value = "";
        playerGuess.focus();
    }
}

function gameOver() {
    document.querySelector("#guessBtn").style.display = "none";
    document.querySelector("#resetBtn").style.display = "inline";
}