let quizData=[];

fetch('questions.json')
    .then(response => response.json())  //convert json to js object
    .then(data=>{
        quizData=data;
        loadQuiz();
    })
    .catch(error=>console.error('Error loading quiz data:', error));

const questionEl=document.getElementById('question');
const answerEls=document.querySelectorAll('.answer');
const submitBtn=document.getElementById('submit');
const resultEl=document.getElementById('result');

let currentQuestion=0;
let score=0;
let selectedAnswer=null;