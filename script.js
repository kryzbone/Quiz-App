// SELECTORS
const startBox = document.querySelector('.start-box')
const quizBox = document.querySelector('.quiz-box')
const questionBox = document.querySelector('.question');
const options = document.querySelector('.answers');
const score = document.querySelector('.score');
const questionNumber = document.querySelector('.question-num');
const description = document.querySelector('.description');
const nextBtn = document.querySelector('.nxt-btn');
const resultBtn = document.querySelector('.result-btn');
const resultBox = document.querySelector('.result-box');
const quizTime = document.querySelector('.timer');
const totalQuestion = document.querySelector('.total-question');
const totalAttempt = document.querySelector('.attempt');
const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');
const percentage = document.querySelector('.percentage');
const startAgain = document.querySelector('.start-again');
const home = document.querySelector('.home');
const category = document.querySelector('.category');

let id;
let index = 0;
let scores = 0;
let attempt = 0;
let count =  0;
let timer = 15;
let clearTimer;

// list of questions
 const quiz = [
     { 
        category: "Human Body",  
        sub: [
            {
            question:"Which organ belongs to the Digestive System:",
            option:["Thymus","Stomach","Heart","Trachea"],
            answer: "Stomach",
            },
            {
            question:"Adults have fewer bones than babies do.",
            option:["true","false"],
            answer: "true",
            description:"Lots of bones start out as several fragments at birth,then fuse together into a single bone later in life"
            },
            {
            question:"Our human body has.........",
            option:["206 bones","210 bones","306 bones","706 bones"],
            answer: "206 bones",
            },
            {
            question:"Your fingernails and hair keep growing after you die.",
            option:["true","false"],
            answer: "false",
            description:"They really don't"
            },
            {
            question:"One important function of bones is to produce.",
            option:["tendons","ligaments","blood cells","cartilage"],
            answer: "blood cells",
            }
        ]
     },

     {
        category: "International - Current Affairs",
        sub: [
             {
             question:"Which of the following has become the first country to make all forms of public transport free?",
             option:["Monaco","Liechtenstein","Luxembourg","Andorra"],
             answer: "Luxembourg",
             description:'Luxembourg in Europe has become the first country to make all forms of public transport free. It is the second smallest country in the European Union'
            },
            {
             question:"Which of the following has become the first country to make all forms of public transport free?",
             option:["Monaco","India","Japan","Singapore"],
             answer: "Singapore",
            },
            {
             question:"Which country is to host Commonwealth shooting, archery events in 2022?",
             option:["Australia","India","Brunei","Cameroon"],
             answer: "India",
             description:'India to host Commonwealth shooting, archery events at Chandigarh in January 2022'
            },
            {
             question:"The International Criminal Police Organisation (INTERPOL) has its headquarters at",
             option:["Montreal","Bonn","Paris","London"],
             answer: "Paris"
            },
            {
             question:"Where is the headquarters of Botanical Survey of India located?",
             option:["Kolkata","Lucknow","Ootacmund","Darjeeling"],
             answer: "Kolkata",
            }
         ]
     },

     {
         category: "Computer Awareness",
         sub: [
            {
             question:"How many bytes are equal to one kilobyte?",
             option:["1050","1024","1022","1000"],
            answer: "1024"
            },
            {
             question:"Which of the following is not an input device?",
             option:["answerboard","Monitor","Joystick","Microphone"],
             answer: "Monitor"
            },
            {
             question:"The most powerful computer is_________",
             option:["super computer","micro computer","mini computer","all of these"],
             answer: "super computer"
            },
            {
             question:"Which of the following memories needs refresh ?",
             option:["dram","rom","sram","all of these"],
             answer: "dram"
            },
               
            {
             question:"Every computer connected to the Internet is identified by a unique four-part string, known as",
             option:["IP address","Host name","Domain name","None of the above"],
             answer: "IP address"
            }
       
         ]
     },

     {
         category: "Sports",
         sub: [
            {
             question:"When was the first Common Wealth Games held?",
             option:["1930","1934","1938","1948"],
             answer: "1930"
            },
            {
             question:"In which sports is the participant called pugilist?",
             option:["Sprinter","Boxing","Wrestling","Javelin"],
             answer: "Boxing",
            },
            {
             question:"In which game the term ‘Putting’ is used?",
             option:["Chess","Hocanswer","Golf","Billiards"],
             answer:"Golf"
            },
            {
             question:"Who was the first Test Centurion in India Cricket?",
             option:["C.K. Naidu","Lala Amarnath","Vinu Mankad","Mansur Ali Pataudi"],
             answer: "Lala Amarnath"
            },
            {
             question:"The number of players in each side in Water Polo is",
             option:["6","8","9","7"],
             answer: "7"
            }
         ]
     }
    
 ]



// EVENT LISTENERS
window.addEventListener('load', () => {
    startBox.classList.remove('hide');
    quizBox.classList.add('hide');
    createCategory(); 
});


// reaveal Next question
nextBtn.addEventListener('click', () => {
    index++;
    hideDescription();
    load();
})


// Display Final Quiz Results 
resultBtn.addEventListener('click', () => {
    quizBox.classList.add('hide')
    resultBox.classList.remove('hide');
    totalQuestion.innerHTML = quiz[id].sub.length;
    totalAttempt.innerHTML = attempt;
    correct.innerHTML = scores;
    wrong.innerHTML = quiz[id].sub.length - scores;
    percentage.innerHTML = ((scores / quiz[id].sub.length) * 100).toFixed(1) + "%"; 
})


// Take the Quiz Again
startAgain.addEventListener('click', () => {
    quiz[id].sub.sort(() => {return Math.floor(Math.random() - 0.5)})
    index = 0;
    scores = 0;
    attempt = 0;
    count =  0;
    resultBox.classList.add('hide');
    quizBox.classList.remove('hide');
    hideDescription();
    hideResultBtn();
    clearInterval(clearTimer);
    load();
})


// Go back to Home Page
home.addEventListener('click', () => {
    resultBox.classList.add('hide');
    startBox.classList.remove('hide');
})




//FUNCTIONS

// creating the various Categories of the quiz
function createCategory() {
    quiz.forEach((itm) => {
       const cat = document.createElement('p');
       cat.innerHTML = itm.category;
       cat.id = quiz.indexOf(itm);
       cat.addEventListener('click', start)
       category.appendChild(cat);
    })
}


// Start the quiz when a category is selected
function start() {
    id = this.id;
    quiz[id].sub.sort(() => {return Math.floor(Math.random() - 0.5)})
    index = 0;
    scores = 0;
    attempt = 0;
    count =  0;
    startBox.classList.add('hide');
    quizBox.classList.remove('hide');
    hideDescription();
    hideResultBtn();
    clearInterval(clearTimer);
    load();
}


// load the quizbox with the questions and possible answers
function load() {
    quizTime.classList.remove('timeout');
    quizTime.innerHTML = 15;
    timer = 15;
    clearTimer = setInterval(countDown, 1000)
    nextBtn.style.display ='none';
    count++;
    questionBox.innerHTML = quiz[id].sub[index].question;
    score.innerHTML = scores;
    questionNumber.innerHTML = count + "/" + quiz[id].sub.length;
    
    generateAnswers(); 
}

function generateAnswers() {
    options.innerHTML = "";
    // Re-arranging possible answers
    quiz[id].sub[index].option.sort(() => {return Math.floor(Math.random() - 0.5)})

    // Generating possible answers
    quiz[id].sub[index].option.forEach((ans) => {
        const  answers =  document.createElement('p'); 
        answers.classList.add('option');
        answers.innerHTML = ans;
        answers.addEventListener('click', check)
        options.appendChild(answers);   
    })    
}


// Check if option clicked is correct
function check() {
    attempt++;
    clearInterval(clearTimer);
    if(this.innerHTML == quiz[id].sub[index].answer) {
        this.classList.add('correct-ans');
        scores++;
        score.innerHTML = scores;
    } 
    else {
        this.classList.add('wrong-ans');
        // What to do if answer is wrong
        showAnswer();    
    }   
    disableOptions();
    displayDescription();
    nextQuestion();
    showResult();
}


// disable options after answer is clicked
function disableOptions() {
    const children = document.querySelectorAll('.option')
    children.forEach((child) => {
        child.style.pointerEvents = 'none';
    })    
}



// display Answer description if any
function displayDescription() {
    if(quiz[id].sub[index].description !== undefined) {
        description.style.display = 'block';
        description.innerHTML = quiz[id].sub[index].description;
    } 
}


// hide description Box
function hideDescription() {
    description.style.display = 'none';
}


// Proceed to the next Question
function nextQuestion() {
    nextBtn.style.display ='inline';
}


// display result btn
function showResult() {
    if (count == quiz[id].sub.length) {
        nextBtn.style.display ='none';
        resultBtn.style.display ='inline';
    }
}


// hide result btn
function hideResultBtn() {
        resultBtn.style.display ='none';
}


// Count Down function
function countDown() {
   timer--;
   quizTime.innerHTML = timer;

   if(timer < 6) {
       quizTime.classList.add('timeout');
   }
    
   if(timer == 0) {
    clearInterval(clearTimer);
    disableOptions();
    showAnswer();
    nextQuestion();
    showResult();
   }
}


// Show The Correct Answer
function showAnswer() {
    const children = document.querySelectorAll('.option')
    children.forEach((child) => {
        if(child.innerHTML == quiz[id].sub[index].answer) {
            child.classList.add('correct-ans')
        }
    })
}


