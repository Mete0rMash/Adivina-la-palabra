const words = ["HELLO", "WORLD", "PYTHON", "OPENAI", "BRAVE", "APPLE", "BEACH", "CLOUD", "DELTA", "EAGLE"];

const MAX_ATTEMPTS = 6;
const MAX_INPUT_LENGTH = 5;

let currentWord = "";
let currentWordArray = [];
let guessedLetters = [];
let numAttempts = 0;
let disabledLetters = new Set();

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
  if (currentWord.length < MAX_INPUT_LENGTH) {
    const key = event.target;
    const value = key.textContent;
    
    // Add the letter to the current word
    currentWord += value;
    wordDisplay.textContent = currentWord;
  }
}

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
      // The guess was incorrect
      feedbackDisplay.textContent = "Incorrect guess. Keep trying!";
      
      // Disable incorrect letters in the virtual keyboard
      const guessedLettersSet = new Set(currentWord.split(""));
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = key.textContent;
        if (!guessedLettersSet.has(value)) {
          key.setAttribute("disabled", "true");
          disabledLetters.add(value);
        }
      }
    }
    
    // Color the correct letters in the word display
    for (let i = 0; i < currentWordArray.length; i++) {
      if (currentWordArray[i] === currentWord[i]) {
        guessedLetters[i] = `<span class="correct">${currentWord[i]}</span>`;
      } else {
        guessedLetters[i] = `<span class="incorrect">${currentWord[i]}</span>`;
      }
    }
    
    wordDisplay.innerHTML = guessedLetters.join(" ");
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
    const key = keys[i];
    const value = key.textContent;
    if (!disabledLetters.has(value)) {
      key.setAttribute("disabled", "true");
    }
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
  disabledLetters.clear();
}

newGame();