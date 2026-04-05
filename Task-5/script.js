let quizData = [];
let userAnswers = [];

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    quizData = data;
    loadQuiz();
  });

const questionEl = document.getElementById('question');
const optionEl = document.getElementById('options');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');

let currentQuestionIndex = 0;
let selectedAnswer = null;

function loadQuiz() {
  selectedAnswer = null;
  optionEl.innerHTML = '';
  feedbackEl.textContent = '';

  const q = quizData[currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${q.question}`;

  q.options.forEach(option => {
    const div = document.createElement('div');
    div.textContent = option;
    div.classList.add('option');

    if (userAnswers[currentQuestionIndex] === option) {
      div.classList.add('selected');
      selectedAnswer = option;
    }

    div.addEventListener('click', () => {
      document.querySelectorAll('.option')
        .forEach(o => o.classList.remove('selected'));

      div.classList.add('selected');
      selectedAnswer = option;
      userAnswers[currentQuestionIndex] = option;
    });

    optionEl.appendChild(div);
  });

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === quizData.length - 1;
}

submitBtn.addEventListener('click', () => {
  if (!selectedAnswer) {
    alert('Please select an option');
    return;
  }

  const q = quizData[currentQuestionIndex];

  if (selectedAnswer === q.answer) {
    feedbackEl.textContent = '✅ Correct!';
    feedbackEl.className = 'correct';
  } else {
    feedbackEl.textContent =
      `❌ Wrong! Correct Answer: ${q.answer}. ${q.explanation}`;
    feedbackEl.className = 'wrong';
  }

  // If last question → show result
  if (currentQuestionIndex === quizData.length - 1) {
    showResult();
  }
});

function showResult() {
  let score = 0;

  quizData.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  document.getElementById('quiz-container').style.display = 'none';

  const percent = (score / quizData.length) * 100;
  let message = '';

  if (percent >= 80) message = '🎉 Excellent work!';
  else if (percent >= 50) message = '👍 Good effort!';
  else message = '📘 Keep practicing!';

  resultEl.innerHTML = `
    <h2>Final Result</h2>
    <p>Score: ${score} / ${quizData.length}</p>
    <p>${message}</p>
  `;
}

prevBtn.addEventListener('click', () => {
  currentQuestionIndex--;
  loadQuiz();
});

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  loadQuiz();
});