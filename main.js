const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

// находим элементы

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

// переменные игры

let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

// очищаем элементы

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  // Вопрос

  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  // Варианты ответов
  let answerNumber = 1;
  for (answerText of questions[questionIndex]["answers"]) {
    const questionTemplate = `<li>
		<label>
			<input value="%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		</label>
	</li>`;
    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  // Находим выбранную кнопку
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );

  // если ответ не выбран ничего не происходит
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);

  // если ответил верно - увеличивает счёт
  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }
  console.log("score =", score);

  if (questionIndex !== questions.length - 1) {
    console.log("это не последний вопрос");
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    console.log("это последний вопрос");
    clearPage();
    showResults();
    return;
  }
}

function showResults() {
  console.log("showResults");
  console.log(score);

  const resultsTemplate = `
  <h2 class="title">%title%</h2>
  <h3 class="summary">%message%</h3>
  <p class="result">%result%</p>
  `;

  let title, message;

  if (score === questions.length) {
    title = "100%";
    message = "вы ответили на все вопросы";
  } else if ((score * 100) / questions.length >= 50) {
    title = "50%";
    message = "normal";
  } else {
    title = "25%";
    message = "-";
  }

  // результат
  let result = `${score} из ${questions.length}`;

  // финальный ответ, подставляем данные в таблицу
  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;

  // меняем кнопку на играть снова 
  submitBtn.blur();
  submitBtn.innerText = 'Начать заново';
  submitBtn.onclick = () => history.go();
}
