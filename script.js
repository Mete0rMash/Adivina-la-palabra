const words = ["HELLO", "WORLD", "PYTHON", "OPENAI", "BRAVE", "APPLE", "BEACH", "CLOUD", "DELTA", "EAGLE"];

const MAX_ATTEMPTS = 6;
const MAX_INPUT_LENGTH = 5;

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

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", handleSubmission);

const eraseBtn = document.getElementById("erase-btn");
eraseBtn.addEventListener("click", handleErase);

function handleKeyClick(event) {
  const key = event.target;
  if (key.disabled) {
    return;
  }
  
  if (currentWord.length < MAX_INPUT_LENGTH) {
    const value = key.textContent;
    
    // Add the letter to the current word
    currentWord += value;
    wordDisplay.textContent = currentWord;
  }
}

const previousAttemptsContainer = document.getElementById("previous-attempts");

function handleSubmission() {
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
      // Check if the letters are in the correct position
      const correctLetters = [];
      // Check if the letters are in incorrect positions
      const incorrectPositions = [];
      // Check if the letters are not in the word
      const incorrectLetters = [];

      for (let i = 0; i < currentWordArray.length; i++) {
        if (currentWordArray[i] === currentWord[i]) {
          correctLetters.push(i);
        } else if (currentWordArray.includes(currentWord[i])) {
          incorrectPositions.push(i);
        } else {
          incorrectLetters.push(i);
        }
      }

      // Color the correct letters in the word display
      for (let i = 0; i < currentWordArray.length; i++) {
        if (correctLetters.includes(i)) {
          guessedLetters[i] = `<span class="correct">${currentWord[i]}</span>`;
        } else if (incorrectPositions.includes(i)) {
          guessedLetters[i] = `<span class="gold">${currentWord[i]}</span>`;
        } else {
          guessedLetters[i] = `<span class="incorrect">${currentWord[i]}</span>`;
        }
      }

      // Disable incorrect letters in the virtual keyboard
      const disabledLetters = [...incorrectPositions, ...incorrectLetters].map(i => currentWord[i]);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = key.textContent;
        if (disabledLetters.includes(value)) {
          key.setAttribute("disabled", "true");
        }
      }

      wordDisplay.innerHTML = guessedLetters.join(" ");

      // Add the previous attempt to the container
      const previousAttemptElement = document.createElement("div");
      previousAttemptElement.innerHTML = `<span>${currentWord}</span>`;
      previousAttemptsContainer.appendChild(previousAttemptElement);
    }
  }
}
  
function handleErase() {
  currentWord = "";
  wordDisplay.textContent = "";
  
  // Enable all keys in the virtual keyboard
  enableAllKeys();
}

function disableAllKeys() {
  for (let i = 0; i < keys.length; i++) {
    keys[i].setAttribute("disabled", "true");
  }
  
  submitBtn.setAttribute("disabled", "true");
  eraseBtn.setAttribute("disabled", "true");
}

function enableAllKeys() {
  for (let i = 0; i < keys.length; i++) {
    keys[i].removeAttribute("disabled");
  }
  
  submitBtn.removeAttribute("disabled");
  eraseBtn.removeAttribute("disabled");
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
  wordDisplay.innerHTML = guessedLetters.join(" ");
  
  // Enable all the keys
  enableAllKeys();
}

newGame();
