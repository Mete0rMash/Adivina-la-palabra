const words = ["HELLO", "WORLD", "PYTHON", "OPENAI", "BRAVE", "APPLE", "BEACH", "CLOUD", "DELTA", "EAGLE"];

const MAX_ATTEMPTS = 6;

let currentWord = "";
let currentWordArray = [];
let guessedLetters = [];
let numAttempts = 0;

const wordDisplay = document.getElementById("word-display");
const feedbackDisplay = document.getElementById("feedback");

const keys = document.getElementsByClassName("key");
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  key.addEventListener("click", handleKeyClick);
}

function handleKeyClick(event) {
  const key = event.target;
  const value = key.textContent;
  
  // Add the letter to the current word
  currentWord += value;
  wordDisplay.textContent = currentWord;
  
  // Check if the word is complete
  if (currentWord.length === currentWordArray.length) {
    numAttempts++;
    
    if (currentWord === currentWordArray.join("")) {
      // The word was guessed correctly
      feedbackDisplay.textContent = "Congratulations! You guessed the word!";
      disableAllKeys();
    } else if (numAttempts === MAX_ATTEMPTS) {
      // The player ran out of attempts
      feedbackDisplay.textContent = "Game over! You couldn't guess the word.";
      disableAllKeys();
    } else {
      // The guess was incorrect
      feedbackDisplay.textContent = "Incorrect guess. Keep trying!";
    }
    
    // Reset the current word and guessed letters
    currentWord = "";
    guessedLetters = [];
    wordDisplay.textContent = guessedLetters.join(" ");
  }
}

function disableAllKeys() {
  for (let i = 0; i < keys.length; i++) {
    keys[i].setAttribute("disabled", "true");
  }
}

function newGame() {
  // Reset the game state
  currentWord = "";
  guessedLetters = [];
  numAttempts = 0;
  feedbackDisplay.textContent = "";
  
  // Choose a new random word
  const fiveLetterWords = words.filter(word => word.length === 5);
  const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
  currentWordArray = fiveLetterWords[randomIndex].split("");
  for (let i = 0; i < currentWordArray.length; i++) {
    guessedLetters.push("_");
  }
  wordDisplay.textContent = guessedLetters.join(" ");
  
  // Enable all the keys
  enableAllKeys();
}

function enableAllKeys() {
  for (let i = 0; i < keys.length; i++) {
    keys[i].removeAttribute("disabled");
  }
}

newGame();
