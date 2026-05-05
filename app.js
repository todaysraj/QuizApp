//This APP IS CREATED BY ME(RAJENDRA SINGH RAJPUROHIT) AS A STUDENT 
// API USED : "https://opentdb.com/api_config.php"
// THIS IS FREE AND OPEN SOURCE PROJECT FOR ALL STUDENTS TO LEARN AND ENNOY THE CODING AND LEARN FORM IT 

let questions = [];

let scoreElement = document.querySelector(".score");


async function getQuizData(){
    try{
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple");
         let data  = await response.json();
            console.log(data);

         //formate the data in our required format 
         const formatedQuestions =  data.results.map(q => {
             let allAnswers = [
                {option: q.correct_answer , correct: true},
                ...q.incorrect_answers.map(a => ({option: a , correct: false}))
             ];

             allAnswers.sort(() => Math.random() - 0.5); //swap answers randomly 


             return {
                question: q.question,
                answers: allAnswers.map(a => ({...a , option:a.option}))
             };

         });

         return formatedQuestions;

    }catch(e){
        console.log("api error:" , e);
    }
}



async function startApp(){
    questions = await getQuizData();
    document.getElementById("loading").style.display = "none";
    scoreElement.children[0].innerText = 0;
    scoreElement.children[1].innerText = questions.length;



    
const questionElement = document.getElementById("question");
const answerButtons =  document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}



function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //show the answer options 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.option;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        const symbol = document.createElement("span");
        button.appendChild(symbol);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.dataset.correct === "true" ? symbol.innerHTML = "&#10004;" : symbol.innerHTML = "&#10006;";
        symbol.style.display = "none";
        button.addEventListener("click" , selectAnswer);
    })
    
}

//remove the previous answers 
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =  selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++; // increse score if answer is correct
        scoreElement.children[0].innerText = score;
        const symbol = selectedBtn.querySelector("span");
        symbol.style.display = "block";

            document.querySelector(".WinDisplay").style.display = "flex";
   

        setTimeout(() => {
            document.querySelector(".WinDisplay").style.display = "none";
        }, 3000);

    }else{
        selectedBtn.classList.add("incorrect");
        const symbol = selectedBtn.querySelector("span");   
        symbol.style.display = "block";

        document.querySelector(".WinDisplay").children[0].src = "./images/no.gif";
        document.querySelector(".WinDisplay").style.display = "flex";

        setTimeout(() => {
            document.querySelector(".WinDisplay").style.display = "none";
            document.querySelector(".WinDisplay").children[0].src = "./images/giphy.gif";
        }, 3000);

    }

    //creating a array shallow copy of all the answer btns and then 
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");//bg true green
        }   
        button.disabled = true;
    })

    //next button show when user select the answer of the question
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    if(score === questions.length){
        let winnerElement = document.querySelector(".Winner");
        winnerElement.style.display = "block";
        
    }
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click" , () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
        document.location.reload();
    }
})


startQuiz();



}

startApp();


// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 200,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });



