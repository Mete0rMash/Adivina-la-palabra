// Define the word to guess and convert it to an array of characters
const wordToGuess = "HELLO";
const wordArray = wordToGuess.split("");

// Track the guessed letters
let guessedLetters = Array(wordArray.length).fill("_");

// Display the initial word status
const wordDisplay = document.getElementById("word-display");
wordDisplay.textContent = guessedLetters.join(" ");

// Handle the guess submission
const keys = document.getElementsByClassName("key");

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  key.addEventListener("click", handleKeyClick);
}

function handleKeyClick(event) {
  const key = event.target;
  const guess = key.textContent;
  
  if (!key.classList.contains("disabled")) {
    // Compare the guess with the word
    let feedback = "";
    for (let i = 0; i < wordArray.length; i++) {
      if (guess === wordArray[i]) {
        guessedLetters[i] = guess;
      }
    }
    wordDisplay.textContent = guessedLetters.join(" ");
    
    // Disable the used key
    key.classList.add("disabled");
    
    // Check if the word has been guessed
    if (guessedLetters.join("") === wordToGuess) {
      feedback = "Congratulations! You guessed the word!";
      disableAllKeys();
    } else if (!guessedLetters.includes("_")) {
      feedback = "Game over! You couldn't guess the word.";
      disableAllKeys();
    } else {
      feedback = "Incorrect guess. Keep trying!";
    }
    
    // Provide feedback
    const feedbackDisplay = document.getElementById("feedback");
    feedbackDisplay.textContent = feedback;
  }
}

function disableAllKeys() {
  for (let i = 0; i < keys.length; i++) {
    keys[i].classList.add("disabled");
  }
}
