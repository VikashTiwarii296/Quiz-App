let myobj = [{
    question: "When was JavaScript Launched?",
    a: 1996,
    b: 1998,
    c: 1999,
    d: "none of the above",
    correct: "d"
}, {
    question: "which one is the best programming language?",
    a: "java",
    b: "python",
    c: "javaScript",
    d: "C",
    correct: "a"
}, {
    question: "HTML stand For",
    a: "High Texting Machine learning",
    b: "Hyper Text Markup Language",
    c: "High Transforming Language",
    d: "Hyper Text Markup protocol",
    correct: "b"
}];

const mainConatiner = document.querySelector(".main-container")
const quiz = document.querySelector(".quiz");
const timerElm = document.querySelector(".timer");
const scoreElm = document.querySelector(".scoreElm");
let index = 0;
let timer = 5;
let timeLeft = 6000;
let score = 0;

let timerInt = setInterval(() => {
    updateTimer();
}, 1000);
let htmInt = setInterval(() => {
    getQuiz();
}, timeLeft);

function getQuiz() {
    if (index > myobj.length - 1) {
        index = myobj.length - 1;
        clearInterval(timerInt);
        clearInterval(htmInt);
        scoreElm.style.display = "flex";
        scoreElm.innerHTML = ` <p>Your Score is ${score} out of ${myobj.length}</p>
        <button class="restart">Restart</button>`;
        const restart = document.querySelector(".restart")
        restart.addEventListener('click', () => {
            scoreElm.style.display = "none";
            index = 0;
            timer = 5;
            score = 0;
            updateTimer();
            getQuiz();
            timerInt = setInterval(() => {
                updateTimer();
            }, 1000);
            htmInt = setInterval(() => {
                getQuiz();
            }, timeLeft);
        })
    }
    const allQuiz = myobj[index];
    quiz.innerHTML = "";
    quiz.innerHTML = `<div class="ques-con">
                        <span class="noOfQuestion">${index+1}/${myobj.length}</span>
                        <h3>${allQuiz.question}</h3>
                        <span class="question-mark">?</span>
                    </div>
                    <div class="option">
                        <p id="a">${allQuiz.a}</p>
                        <p id="b">${allQuiz.b}</p>
                        <p id="c">${allQuiz.c}</p>
                        <p id="d">${allQuiz.d}</p>
                    </div>`;
    console.log(allQuiz);
    index++;
    const option = document.querySelectorAll(".option p");
    option.forEach(element => {
        element.addEventListener("click", () => {
            option.forEach(elem => {
                elem.classList.remove("select");
                elem.style.pointerEvents = "all";
            });
            element.classList.add("select");
            element.style.pointerEvents = "none";
        })
    });
    setTimeout(() => {
        checkAns(option, allQuiz);
    }, timeLeft - 200);
}
getQuiz();

function updateTimer() {
    if (timer < 0) {
        timer = 5;
    }
    timerElm.textContent = `Time Left : ${timer}`;
    timer--;
}
updateTimer()

function checkAns(option, allQuiz) {
    option.forEach(element => {
        if (element.id === allQuiz.correct && element.classList.contains("select")) {
            score++;
            console.log(score);
        } else {
            score = score;
        }
    });
}