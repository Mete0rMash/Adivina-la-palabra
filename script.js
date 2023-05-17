const targetWord = "HELLO"; // Replace with the actual target word
const numAttempts = 5; // Number of attempts allowed

let currentGuess = "";
let remainingAttempts = numAttempts;

// Generate the guess boxes
for (let i = 0; i < targetWord.length; i++) {
    const guessBox = document.createElement("div");
    guessBox.classList.add("guess-box");
    document.getElementById("guess-container").appendChild(guessBox);
}

// Display the target word in sign language
document.getElementById("target-word").textContent = targetWord;

// Function to update the guess boxes with the user's input
function updateGuessBox(index, letter) {
    const guessBoxes = document.getElementsByClassName("guess-box");
    guessBoxes[index].textContent = letter;
}

// Event listener for the check button
document.getElementById("check-button").addEventListener("click", function () {
    const guessBoxes = document.getElementsByClassName("guess-box");

    // Check if the guess is correct
    for (let i = 0; i < targetWord.length; i++) {
        if (targetWord[i] === currentGuess[i]) {
            guessBoxes[i].style.backgroundColor = "green";
        } else if (targetWord.includes(currentGuess[i])) {
            guessBoxes[i].style.backgroundColor = "yellow";
        } else {
            guessBoxes[i].style.backgroundColor = "white";
        }
    }

    // Decrease remaining attempts
    remainingAttempts--;

    // Check if the game is won or lost
    if (currentGuess === targetWord) {
        alert("Congratulations! You guessed the word correctly.");
        resetGame();
    } else if (remainingAttempts === 0) {
        alert("Game over. The word was: " + targetWord);
        resetGame();
    }

    // Clear the guess boxes and reset the guess
    for (let i = 0; i < guessBoxes.length; i++) {
        guessBoxes[i].textContent = "";
    }
    currentGuess = "";
});

// Event listener for keydown to capture user input
document.addEventListener("keydown", function (event) {
    const keyCode = event.which || event.keyCode;
    const letter = String.fromCharCode(keyCode);

    // Only accept alphabetical characters
    if (/[a-zA-Z]/.test(letter)) {
        // Check if the guess is complete
        if (currentGuess.length < targetWord.length) {
            currentGuess += letter;
            updateGuessBox(currentGuess.length - 1, letter);
        }
    }
});

// Function to reset the game
function resetGame() {
    remainingAttempts = numAttempts;
    currentGuess = "";
}