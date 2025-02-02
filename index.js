document.getElementById('start-btn').addEventListener('click', startQuiz);
let timerInterval, score = 0;

function startQuiz() {
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
        .then(response => response.json())
        .then(data => {
            const question = data.results[0];
            document.getElementById('question-category').innerText = question.category;
            document.getElementById('question-text').innerHTML = question.question;
            displayOptions(question);
            startTimer(15);
        });
}

function displayOptions(question) {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    let options = [...question.incorrect_answers, question.correct_answer];
    options.sort(() => Math.random() - 0.5);
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(option, question.correct_answer);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        document.getElementById('score').innerText = score;
    }
    startQuiz();
}

function startTimer(duration) {
    let time = duration;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        document.getElementById('timer').innerText = `0:${time < 10 ? '0' + time : time}`;
        if (time-- <= 0) {
            clearInterval(timerInterval);
            startQuiz();
        }
    }, 1000);
}