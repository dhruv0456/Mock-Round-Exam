let questions = [
    {
        question: "What is the national animal of India?",
        answers: [
          { text: "Tiger", correct: true },
          { text: "Lion", correct: false },
          { text: "Elephant", correct: false },
          { text: "Rhino", correct: false }
        ]
      },
      {
        question: "Which is the largest ocean in the world?",
        answers: [
          { text: "Indian Ocean", correct: false },
          { text: "Pacific Ocean", correct: true },
          { text: "Atlantic Ocean", correct: false },
          { text: "Arctic Ocean", correct: false }
        ]
      },
      {
        question: "Which part of the computer is called the brain?",
        answers: [
          { text: "RAM", correct: false },
          { text: "Hard Disk", correct: false },
           { text: "CPU", correct: true },
          { text: "Keyboard", correct: false }
        ]
      },
      {
        question: "What is the stock market related to?",
        answers: [
          { text: "Farming", correct: false },
          { text: "Education", correct: false },
          { text: "Sports", correct: false },
          { text: "Investment", correct: true },
        ]
      },
        {
        question: "Which planet in our solar system is known as the:-Red Planet?",
        answers: [
          { text: "Venus", correct: false },
          { text: "Mars", correct: true },
          { text: "Earth", correct: false },
          { text: "Jupiter", correct: false }
        ]
      },
      {
        question: "What does the internet prefix 'www' stand for?",
        answers: [
          { text: "World Wide Web", correct: true },
          { text: "World Wide Window", correct: false },
          { text: "Western World Web", correct: false },
          { text: "World Wide Weather", correct: false }
        ]
      },

      
]




let questionElement = document.getElementById("question");
let answerButton = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})

startQuiz();