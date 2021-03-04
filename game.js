// This defines the time limit, in this case it is 60
let TIME_LIMIT = 60;

// These are the quotes that are selected
let quotes_array = [
  "The quick brown fox jumps over the lazy dog.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Sometimes the questions are complicated and the answers are simple.",
  "For every minute you are angry you lose sixty seconds of happiness.",
  "It is better to be hated for what you are than to be loved for what you are not.",
  "You only live once, but if you do it right, once is enough.",
  "If you can't explain it to a six year old, you don't understand it yourself.",
  "Life isn't about finding yourself. Life is about creating yourself.",
  "The difference between genius and stupidity is: genius has its limits.",
  "Anyone who has never made a mistake has never tried anything new.",
  "It’s no use going back to yesterday, because I was a different person then.",
  "I speak to everyone in the same way, whether he is the garbage man or the president of the university.",
  "I wish I could freeze this moment, right here, right now and live in it forever.",
];

// This selects the required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];

  // This separates each character and makes an element 
  // out of each of them as to individually style them
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  // This rolls over to the first quote
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {

  // This gets the current inputted text and splits it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // This increments the total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // These are the characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // These are the correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // These are the incorrect characters
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');
      document.getElementById('myAudio2').play();

      // This increments the number of errors
      errors++;
    }
  });

  // This displays the number of errors
  error_text.textContent = total_errors + errors;

  // This will update the accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // If the current text is completely typed
  // no matter the errors
  if (curr_input.length == current_quote.length) {
    updateQuote();
    document.getElementById('myAudio3').play();

    // This updates the total errors
    total_errors += errors;

    // This clears the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // This decreases the current time left
    timeLeft--;

    // This increases the time elapsed
    timeElapsed++;

    // This updates the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // This finishs the game
    finishGame();
    document.getElementById('myAudio').play();
  }
}

function finishGame() {
  // This stops the timer
  clearInterval(timer);

  // This disables the input area
  input_area.disabled = true;

  // This will display restart button
  restart_btn.style.display = "block";

  // This is the formula to calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // This updates the cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // This displays the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";

  // This determines what to say based on the wpm of the user
  if (wpm >=200) {
  quote_text.textContent = "Hey man, cheating isn't cool!";
  } else if (wpm >=100) {
  quote_text.textContent = "You are in the top 1% of typists! Congratulations!";
  } else if (wpm >=90) {
    quote_text.textContent = "At this typing speed, you’re probably a gamer, coder, or genius. Either way, you’re doing great!";
  } else if (wpm >=70) {
    quote_text.textContent = "You are way above average! You would qualify for any typing job assuming your typing accuracy is high enough.";
  } else if (wpm >= 50) {
    quote_text.textContent = "Congratulations! You’re above average.";
  } else if (wpm >= 40) {
    quote_text.textContent = "You are now an average typist. You still have significant room for improvement. Keep on practicing!";
  } else {
    quote_text.textContent = "At this speed, your typing speed is way below average, and you should focus on proper typing technique.";
  }
}


function startGame() {

  resetValues();
  updateQuote();

  // This clears the old timer and starts a new one
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}