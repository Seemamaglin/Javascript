let quizData=[];
let userAnswers=[];

fetch('questions.json')
    .then(response => response.json())  //convert json to js object
    .then(data=>{
        quizData=data;
        loadQuiz();
    })
    .catch(error=>console.error('Error loading quiz data:', error));

const questionEl=document.getElementById('question');
const optionEl=document.getElementById('options');
const submitBtn=document.getElementById('submit-btn');
const resultEl=document.getElementById('result');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex=0;
let score=0;
let selectedAnswer=null;

function loadQuiz() {
  selectedAnswer = null;
  optionEl.innerHTML = '';

  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent =
    (currentQuestionIndex + 1) + '. ' + currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.textContent = option;
    optionDiv.classList.add('option');

    optionDiv.addEventListener('click', () => {
      document.querySelectorAll('.option')
        .forEach(opt => opt.classList.remove('selected'));

      optionDiv.classList.add('selected');
      selectedAnswer = option;
      userAnswers[currentQuestionIndex] = option;
    });

    optionEl.appendChild(optionDiv);
  });

  if (userAnswers[currentQuestionIndex]) {
    document.querySelectorAll('.option').forEach(opt => {
      if (opt.textContent === userAnswers[currentQuestionIndex]) {
        opt.classList.add('selected');
        selectedAnswer = userAnswers[currentQuestionIndex];
      }
    });
  }

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === quizData.length - 1;
}

submitBtn.addEventListener('click', () => {
  if (selectedAnswer === null) {
    alert('Please select an option');
    return;
  }

  const correctAnswer = quizData[currentQuestionIndex].answer;

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});
function showResult() {
  document.getElementById('quiz-container').style.display = 'none';
  resultEl.textContent =
    `You scored ${score} out of ${quizData.length}`;
}

prevBtn.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuiz();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuiz();
  }
});