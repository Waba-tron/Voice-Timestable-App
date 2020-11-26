let msgEl = document.getElementById('msg');
let question = document.getElementById('timestable');
let btnsContainer = document.getElementById('btns-container');
let instructions = document.getElementById('instructions');
let restartBtn = document.getElementById('reset-picks')
let testArr = [];

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//let randomNum = getAnswer(testArr);



// Capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg, randomNum);
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.textContent = `

    ${msg}
  `;
}

// Check msg against number
function checkNumber(msg, answer) {
    const num = parseInt(msg);
    console.log(num, answer)
    // Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    // Check number
    if (num == answer) {

        randomNum = getAnswer(testArr);
        msgEl.textContent += 'Correct my G';
    } else {
        msgEl.textContent += 'Wrong';
    }
}

// Generate random number
function getAnswer(userPicks) {

    let firstNumber = userPicks[Math.floor(Math.random() * userPicks.length)];

    let secondNumber = Math.floor(Math.random() * 12) + 1;

    if (firstNumber == null) {
        question.innerHTML = `Select some numbers`;
        return '';
    } else {
        question.innerHTML = `${firstNumber} x ${secondNumber}`;
        btnsContainer.style.display = "none";

        return firstNumber * secondNumber;

    }


}



//Btns class

let header = document.getElementById("btns-picks-container");
let btns = header.getElementsByClassName("btn");

for (let i = 0; i < btns.length; i++) {

    btns[i].addEventListener("click", function () {

        btns[i].classList.toggle("active");

        if (btns[i].classList.contains('active')) {

            testArr.push(parseInt(btns[i].textContent));

        }
        if (!btns[i].classList.contains('active')) {

            const index = testArr.indexOf(parseInt(btns[i].textContent));
            if (index > -1) {
                testArr.splice(index, 1);

            }
        }


    });

}


restartBtn.addEventListener("click", function () {

    question.innerHTML = `Select some numbers`;
    btnsContainer.style.display = "block";
    restartBtn.style.display = "none";
    msgEl.textContent = "";
    msgEl.style.display = "none";
    counterCheck = 0;

});

let counterCheck = 0;
document.body.addEventListener('click', e => {

    if (e.target.id == 'Go') {
      
        randomNum = getAnswer(testArr);
        instructions.style.display = "none";
        
        for (let i = 0; i < btns.length; i++) {
      
            if (!btns[i].classList.contains('active')) {
              
            } else {
                counterCheck++
            }
        }

        if(counterCheck == 0){
            restartBtn.style.display = "none";
            msgEl.textContent = "";
            msgEl.style.display = "none";
            
        }
        else{
            restartBtn.style.display = "block";
             msgEl.textContent = "";
             msgEl.style.display = "block";
           
        }
        
        
        // Start recognition and game
        recognition.start();
        // Speak result
        recognition.addEventListener('result', onSpeak);
        recognition.addEventListener('end', () => recognition.start());


    }
});





// Add active class to the current button (highlight it)