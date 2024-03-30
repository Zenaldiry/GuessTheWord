// setting game options==============================================================
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
// setting game options==============================================================
const inputsContainer = document.createElement("div");
inputsContainer.classList.add("inputs");
let game = document.querySelector(".the-game");
const checkBtn = document.querySelector(".check");
const hintBtn = document.querySelector(".hint");
let hintat = document.querySelector(".hintat");
hintat.textContent = numberOfHints;
game.prepend(inputsContainer);
// document.body.prepend(inputsContainer);
// generateInputs function ===================================================================
function generateInputs() {
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) {
      tryDiv.classList.add("disabled-inputs");
    }
    // create inputs
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
      input.maxLength = 1;
      input.id = `guess${i}-letter${j}`;
      input.style.cssText = `
      width: 50px;
      height : 50px; 
      outline:none;
      border:solid 1px grey;
      text-align:center;
      background-color: #27303e;
      border-radius: 6px;
      color:white;
      font-size:25px;
      font-weight:bold;
      `;

      tryDiv.append(input);
    }
    inputsContainer.append(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  const inputsInDisabledDivs = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDivs.forEach((input) => {
    input.disabled = true;
  });

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", (e) => {
      const currentIndex = Array.from(inputs).indexOf(e.target);
      if (e.key === "ArrowRight") {
        const nextIndex = currentIndex + 1;
        if (nextIndex < inputs.length) inputs[nextIndex].focus();
      } else if (e.key === "ArrowLeft") {
        const preIndex = currentIndex - 1;
        if (preIndex >= 0) inputs[preIndex].focus();
      } else if (e.key === "Backspace") {
        const preIndex = currentIndex - 1;
        if (preIndex >= 0 && input.value === "") {
          inputs[preIndex].value = "";
          inputs[preIndex].focus();
        }
      }
    });
  });
}
// generateInputs function ===================================================================
// mange words=========================================================
let wordToGuess = "";
const words = [
  "banana",
  "purple",
  "guitar",
  "rocket",
  "window",
  "yellow",
  "jacket",
  "silver",
  "monkey",
  "forest",
  "potato",
  "pencil",
  "basket",
  "planet",
  "purple",
  "sunset",
  "bottle",
  "summer",
  "orange",
  "camera",
  "coffee",
  "butter",
  "flower",
  "castle",
  "rabbit",
  "tomato",
  "soccer",
  "circle",
  "garden",
  "rocket",
  "puzzle",
  "piano",
  "donkey",
  "banana",
  "saddle",
  "shadow",
  "forest",
  "dragon",
  "rocket",
  "tissue",
  "purple",
  "butter",
  "rabbit",
  "flower",
  "summer",
  "soccer",
  "rocket",
  "planet",
  "circle",
  "purple",
  "banana",
  "rocket",
  "soccer",
  "planet",
  "circle",
  "purple",
  "butter",
  "rabbit",
  "flower",
  "summer",
  "rocket",
  "soccer",
  "planet",
  "circle",
  "purple",
  "banana",
  "butter",
  "rabbit",
  "flower",
  "soccer",
  "rocket",
  "planet",
  "circle",
  "purple",
  "banana",
  "butter",
  "rabbit",
  "flower",
  "summer",
  "soccer",
  "rocket",
  "planet",
  "circle",
  "purple",
];
wordToGuess = words[Math.floor(Math.random() * words.length)];
// mange words=========================================================
// console.log(wordToGuess);
// hintsHandler function=========================================================================================
function hintsHandler() {
  // if (numberOfHints > 0) {
  //   numberOfHints--;
  // }
  // hintat.textContent = numberOfHints;
  let emptyInputs = document.querySelectorAll("input:not([disabled])");
  let randomIndexOfEmpty = Math.floor(Math.random() * emptyInputs.length);
  let randomLetter = wordToGuess[randomIndexOfEmpty];
  if (emptyInputs[randomIndexOfEmpty].value === "") {
    emptyInputs[randomIndexOfEmpty].value = randomLetter.toLocaleUpperCase();
    if (numberOfHints > 0) {
      numberOfHints--;
    }
    hintat.textContent = numberOfHints;
  }
  if (numberOfHints === 0) {
    hintBtn.disabled = true;
    hintBtn.classList.add("disabled-inputs");
  }
}
// hintsHandler function=========================================================================================
// handleGuess function ==========================================================================================
function handleGuess() {
  let succesGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    let letterToGuess = wordToGuess[i - 1];
    let letterEnteredInput = document.querySelector(
      `#guess${currentTry}-letter${i}`
    );
    let letterEntered = document
      .querySelector(`#guess${currentTry}-letter${i}`)
      .value.toLowerCase();
    if (letterEntered === letterToGuess) {
      letterEnteredInput.classList.add("inplace");
    } else if (wordToGuess.includes(letterEntered) && letterEntered !== "") {
      letterEnteredInput.classList.add("not-inplace");
      succesGuess = false;
    } else {
      letterEnteredInput.classList.add("wrong");
      succesGuess = false;
    }
  }
  const messageField = document.querySelector(".message");
  if (succesGuess) {
    messageField.innerHTML = `you won and the world is <div>${wordToGuess}</div>`;
    let allDivs = document.querySelectorAll("input");
    allDivs.forEach((input) => input.classList.add("disabled-inputs"));
    checkBtn.classList.add("disabled-inputs");
    checkBtn.disabled = true;
    hintBtn.classList.add("disabled-inputs");
    hintBtn.disabled = true;
  } else {
    let inputs = document.querySelector(".inputs");
    inputs.children[currentTry - 1].classList.add("disabled-inputs");
    [...inputs.children[currentTry - 1].children].forEach((input) => {
      input.disabled = true;
    });
    if (inputs.children[currentTry]) {
      inputs.children[currentTry].classList.remove("disabled-inputs");
      [...inputs.children[currentTry].children].forEach((input) => {
        input.disabled = false;
      });
      inputs.children[currentTry].children[1].focus();
    }
    currentTry++;
    if (currentTry === 7) {
      messageField.innerHTML = `You lost you stupid and the word is <div>${wordToGuess}</div>`;
      let allDivs = document.querySelectorAll("input");
      allDivs.forEach((input) => input.classList.add("disabled-inputs"));
      checkBtn.classList.add("disabled-inputs");
      checkBtn.disabled = true;
      hintBtn.classList.add("disabled-inputs");
    }
  }
}
// handleGuess function ==========================================================================================
// backSpace handle

generateInputs();
hintBtn.addEventListener("click", hintsHandler);
checkBtn.addEventListener("click", handleGuess);
