var startButton = document.getElementById("start");
var saveScore = document.getElementById("saveScore");
var questionDisplay = document.getElementById("questionDisplay");
var answer1 = document.getElementById('a-1');
var answer2 = document.getElementById('a-2');
var answer3 = document.getElementById('a-3');
var answer4 = document.getElementById('a-4');
var scoreDisplay = document.getElementById('score');
var timeDisplay = document.getElementById("timer")
var secondsLeft = 10;
var timePenalty = 5;
var score = 0;
var questionIndex = 0;
var questionAnswerElements = [
    answer1,
    answer2,
    answer3,
    answer4
]
var questions = [
    {
        title: 'This function will log information to the console.',
        choices: ['console.log', 'window.alert', 'console.write', 'console.innerHTML'],
        answerIndex: '0'
     }, 
     
     {
         title: 'The following are all common data types EXCEPT:',
         choices: ['Boolean', 'String', 'Integer', 'Written'],
         answerIndex: '3'

     },
     {
        title: 'This language makes up the bare bones of a webpage.',
        choices: ['CSS', 'HTML', 'JavaScript', 'MySQL'],
        answerIndex: '1'
     }, 
     {
        title: 'CSS stands for:',
        choices: ['Consumer Style Sets', 'Cascading Style Sheet', 'Computer Styling System', 'Coding Style Sheet'],
        answerIndex: '1' 
     }, 
     {
        title: 'Arrays are enclosed in _____, with each item separated by commas.',
        choices: ['Square Brackets', 'Round Brackets', 'Squiggly Brackets', 'Slashes'],
        answerIndex: '0'
     }, 
    ];

function renderQuestion(question) {
    questionDisplay.textContent = question.title
    for (var i = 0; i < question.choices.length; i++) {
        questionAnswerElements[i].textContent = question.choices[i];
    }
};

function answerQuestionClickHandler(event) {
    var answerClicked = event.target;
    var answerSelected = answerClicked.getAttribute('data-index');
    if (answerSelected === questions[questionIndex].answerIndex) {
        score+=10;
        secondsLeft+=10;
        questionIndex++;
        renderQuestion(questions[questionIndex]);

    }
    else {
        score-=5;
        secondsLeft-=5;
        questionIndex++;
        renderQuestion(questions[questionIndex]);
    }
};

function startQuiz() {
    var timer = setInterval(function() {
        secondsLeft--;
        if (secondsLeft <= 0 || questionIndex >= questions.length) {
            timeDisplay.textContent = 'Game Over!'
            clearInterval(timer);
            scoreDisplay.textContent = 'Your score is ' + score;
            questionDisplay.textContent = 'Try again soon!'
            answer1.textContent = ''
            answer2.textContent = ''
            answer3.textContent = ''
            answer4.textContent = ''
            saveScore.innerHTML = "<h3>Enter your initials to save your score!</h3> <input type=text></input> <button>Submit</button>"

        }
        else {
            timeDisplay.textContent = secondsLeft + ' seconds left'
        }
    },1000)

    renderQuestion(questions[questionIndex]);

};

function setUpClickListener() {
    for (var i = 0; i < questionAnswerElements.length; i++) {
        questionAnswerElements[i].addEventListener('click', answerQuestionClickHandler);
    }
}

setUpClickListener();
startButton.addEventListener("click", startQuiz);
