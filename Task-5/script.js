let quizData=[];

fetch('questions.json')
    .then(response => response.json())
    .then(data=>{
        quizData=data;
        loadQuiz();
    })
    .catch(error=>console.error('Error loading quiz data:', error));