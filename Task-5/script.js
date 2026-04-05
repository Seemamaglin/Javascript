let quizData=[];

fetch('questions.json')
    .then(response => response.json())  //convert json to js object
    .then(data=>{
        quizData=data;
        loadQuiz();
    })
    .catch(error=>console.error('Error loading quiz data:', error));

const questionEl=document.getElementById('question');
const optionEl=document.getElementById('options');
const submitBtn=document.getElementById('submit');
const resultEl=document.getElementById('result');

let currentQuestionIndex=0;
let score=0;
let selectedAnswer=null;

function loadQuiz(){
    selectedAnswer=null;
    optionEl.innerHTML='';

    const currentQuestion=quizData[currentQuestionIndex];
    questionEl.textContent=currentQuestion.question;

    currentQuestion.options.forEach(option=>{
        const optionDiv=document.createElement('div');   
        optionDiv.textContent=option;
        optionDiv.classList.add('option');
        
        //<div class="option">Hyper Text Markup Language</div>

        optionDiv.addEventListener('click',()=>{
            selectedAnswer=option;
            optionDiv.classList.add('selected');

        //<div class="option selected">Hyper Text Markup Language</div>

        document.querySelectorAll('.option').forEach(opt=>{
            opt.classList.remove('selected');
            //<div class="option">Hyper Text Markup Language</div>
            });

        optionDiv.classList.add("selected");
        });
        optionEl.appendChild(optionDiv);
    });
};