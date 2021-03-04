// For parts of this code I have used a tutorial by geeksforgeeks as a guideline. In no portion did I copy/paste and instead wrote all of the code myself. Furthermore I have learned a ton about javascript and completely understand the code now. All of this being said I would like to thank you for introducing me into coding, as I will now be creating many personal projects, and teaching myself further so that I can hopefully work in the field when I am older. Enjoy!

// This defines the time limit, in this case it is 60
const TIME_LIMIT = 60

// These are the quotes that are selected
const quotesArray = [
  'The quick brown fox jumps over the lazy dog.',
  'Life is like riding a bicycle. To keep your balance, you must keep moving.',
  'Sometimes the questions are complicated and the answers are simple.',
  'For every minute you are angry you lose sixty seconds of happiness.',
  'It is better to be hated for what you are than to be loved for what you are not.',
  'You only live once, but if you do it right, once is enough.',
  'If you can’t explain it to a six year old, you don’t understand it yourself.',
  'Life isn’t about finding yourself. Life is about creating yourself.',
  'The difference between genius and stupidity is: genius has its limits.',
  'Anyone who has never made a mistake has never tried anything new.',
  'It’s no use going back to yesterday, because I was a different person then.',
  'I speak to everyone in the same way, whether he is the garbage man or the president of the university.',
  'I wish I could freeze this moment, right here, right now and live in it forever.'
]

// This selects the required elements
const timerText = document.querySelector('.curr-time')
const accuracyText = document.querySelector('.curr-accuracy')
const errorText = document.querySelector('.curr-errors')
const cpmText = document.querySelector('.curr-cpm')
const wpmText = document.querySelector('.curr-wpm')
const quoteText = document.querySelector('.quote')
const inputarea = document.querySelector('.inputarea')
const restartbtn = document.querySelector('.restartbtn')
const cpmGroup = document.querySelector('.cpm')
const wpmGroup = document.querySelector('.wpm')

let timeLeft = TIME_LIMIT
let timeElapsed = 0
let totalErrors = 0
let errors = 0
let accuracy = 0
let characterTyped = 0
let currentQuote = ''
let quoteNo = 0
let timer = null
let wpm = 0
let cpm = 0
let currInput = 0
let currInputArray = 0
let quoteSpanArray = 0

function updateQuote () {
  quoteText.textContent = null
  currentQuote = quotesArray[quoteNo]

  // This separates each character and makes an element
  // out of each of them as to individually style them
  currentQuote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quoteText.appendChild(charSpan)
  })

  // This rolls over to the first quote
  if (quoteNo < quotesArray.length - 1) {
    quoteNo++
  } else {
    quoteNo = 0
  }
}

function processCurrentText () {
  // This gets the current inputted text and splits it
  currInput = inputarea.value
  currInputArray = currInput.split('')

  // This increments the total characters typed
  characterTyped++

  errors = 0

  // This compares the input text to the quote text so each character is stylized
  quoteSpanArray = quoteText.querySelectorAll('span')
  quoteSpanArray.forEach((char, index) => {
    const typedChar = currInputArray[index]

    // These are the characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char')
      char.classList.remove('incorrect_char')

      // These are the correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char')
      char.classList.remove('incorrect_char')

      // These are the incorrect characters
    } else {
      char.classList.add('incorrect_char')
      char.classList.remove('correct_char')
      document.getElementById('wrong').play()

      // This increments the number of errors
      errors++
    }
  })

  // This displays the number of errors
  errorText.textContent = totalErrors + errors

  // This will update the accuracy text
  const correctCharacters = (characterTyped - (totalErrors + errors))
  const accuracyVal = ((correctCharacters / characterTyped) * 100)
  accuracyText.textContent = Math.round(accuracyVal)

  // If the current text is completely typed
  // no matter the errors
  if (currInput.length === currentQuote.length) {
    updateQuote()
    document.getElementById('correct').play()

    // This updates the total errors
    totalErrors += errors

    // This clears the input area
    inputarea.value = ''
  }
}

function updateTimer () {
  if (timeLeft > 0) {
    // This decreases the current time left
    timeLeft--

    // This increases the time elapsed
    timeElapsed++

    // This updates the timer text
    timerText.textContent = timeLeft + 's'
  } else {
    // This finishes the game
    finishGame()
    document.getElementById('end').play()
  }
}

function finishGame () {
  // This stops the timer
  clearInterval(timer)

  // This disables the input area
  inputarea.disabled = true

  // This will display restart button
  restartbtn.style.display = 'block'

  // This is the formula to calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60))
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60))

  // This updates the cpm and wpm text
  cpmText.textContent = cpm
  wpmText.textContent = wpm

  // This displays the cpm and wpm
  cpmGroup.style.display = 'block'
  wpmGroup.style.display = 'block'

  // This determines what to say based on the wpm of the user
  if (wpm >= 200) {
    quoteText.textContent = 'Hey man, cheating isn’t cool!'
  } else if (wpm >= 100) {
    quoteText.textContent = 'You are in the top 1% of typists! Congratulations!'
  } else if (wpm >= 90) {
    quoteText.textContent = 'At this typing speed, you’re probably a gamer, coder, or genius. Either way, you’re doing great!'
  } else if (wpm >= 70) {
    quoteText.textContent = 'You are way above average! You would qualify for any typing job assuming your typing accuracy is high enough.'
  } else if (wpm >= 50) {
    quoteText.textContent = 'Congratulations! You’re above average.'
  } else if (wpm >= 40) {
    quoteText.textContent = 'You are now an average typist. You still have significant room for improvement. Keep on practicing!'
  } else {
    quoteText.textContent = 'At this speed, your typing speed is way below average, and you should focus on proper typing technique.'
  }
}

function startGame () {
  resetValues()
  updateQuote()

  // This clears the old timer and starts a new one
  clearInterval(timer)
  timer = setInterval(updateTimer, 1000)
}

function resetValues () {
  timeLeft = TIME_LIMIT
  timeElapsed = 0
  errors = 0
  totalErrors = 0
  accuracy = 0
  characterTyped = 0
  quoteNo = 0
  inputarea.disabled = false

document.querySelector(".inputarea").addEventListener("input", processCurrentText)
document.querySelector(".inputarea").addEventListener("focus", startGame)
document.querySelector(".restartbtn").addEventListener("click", resetValues)

  inputarea.value = ''
  quoteText.textContent = 'Click on the area below to start the game.'
  accuracyText.textContent = 100
  timerText.textContent = timeLeft + 's'
  errorText.textContent = 0
  restartbtn.style.display = 'none'
  cpmGroup.style.display = 'none'
  wpmGroup.style.display = 'none'
}
