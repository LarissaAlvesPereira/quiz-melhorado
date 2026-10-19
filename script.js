
const questions = [
    {
      question: "1. Qual é o maior animal do planeta?",
      options: [
        "Elefante-africano",
        "Tubarão-branco",
        "Baleia-azul",
        "Girafa",
        "Hipopótamo"
      ],
      answer: 2,
      explanation: "A baleia-azul é o maior animal conhecido que já existiu."
    },
    {
      question: "2. Qual destes animais é um mamífero que voa?",
      options: [
        "Pinguim",
        "Morcego",
        "Águia",
        "Borboleta",
        "Papagaio"
      ],
      answer: 1,
      explanation: "O morcego é um mamífero capaz de voar."
    },
    {
      question: "3. Qual animal passa pela fase de girino?",
      options: [
        "Lagarto",
        "Galinha",
        "Coelho",
        "Sapo",
        "Gato"
      ],
      answer: 3,
      explanation: "Os sapos passam pela fase de girino durante seu desenvolvimento."
    },
    {
      question: "4. Qual animal é conhecido por mudar de cor?",
      options: [
        "Camaleão",
        "Cavalo",
        "Urso-polar",
        "Canguru",
        "Panda"
      ],
      answer: 0,
      explanation: "O camaleão pode mudar de cor para comunicação e outras funções."
    },
    {
      question: "5. Qual destes animais é um invertebrado?",
      options: [
        "Tartaruga",
        "Sardinha",
        "Cobra",
        "Sabiá",
        "Polvo"
      ],
      answer: 4,
      explanation: "O polvo é um molusco que não possui coluna vertebral."
    }
  ];
  
  let currentQuestion = 0;
  let points = 0;
  let answered = false;
  
  const game = document.getElementById("game");
  const result = document.getElementById("result");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");
  const scoreElement = document.getElementById("score");
  const countElement = document.getElementById("question-count");
  const progressElement = document.getElementById("progress");
  const nextButton = document.getElementById("next-button");
  
  function showQuestion() {
    answered = false;
  
    const item = questions[currentQuestion];
  
    countElement.textContent =
      `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  
    scoreElement.textContent = `Pontos: ${points}`;
  
    progressElement.style.width =
      `${(currentQuestion / questions.length) * 100}%`;
  
    questionElement.textContent = item.question;
    optionsElement.replaceChildren();
    feedbackElement.textContent = "";
    nextButton.hidden = true;
  
    item.options.forEach((option, index) => {
      const button = document.createElement("button");
  
      button.className = "option";
      button.textContent =
        `${String.fromCharCode(65 + index)}) ${option}`;
  
      button.addEventListener("click", () => checkAnswer(index));
  
      optionsElement.appendChild(button);
    });
  }
  
  function checkAnswer(selectedIndex) {
    if (answered) return;
  
    answered = true;
  
    const item = questions[currentQuestion];
    const buttons = optionsElement.querySelectorAll(".option");
  
    buttons.forEach((button, index) => {
      button.disabled = true;
  
      if (index === item.answer) {
        button.classList.add("correct");
      }
  
      if (index === selectedIndex && index !== item.answer) {
        button.classList.add("wrong");
      }
    });
  
    if (selectedIndex === item.answer) {
      points++;
      feedbackElement.textContent = `✅ Muito bem! ${item.explanation}`;
    } else {
      feedbackElement.textContent = `❌ Resposta incorreta. ${item.explanation}`;
    }
  
    scoreElement.textContent = `Pontos: ${points}`;
  
    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "Ver resultado 🏆"
        : "Próxima pergunta →";
  
    nextButton.hidden = false;
  }
  
  function showResult() {
    game.hidden = true;
    result.hidden = false;
  
    progressElement.style.width = "100%";
  
    document.getElementById("final-score").textContent =
      `Você acertou ${points} de ${questions.length} perguntas!`;
  
    let message;
  
    if (points === 5) {
      message = "🌟 Incrível! Você é um especialista em animais!";
    } else if (points >= 3) {
      message = "👏 Muito bem! Você conhece bastante os animais!";
    } else {
      message = "🐾 Continue aprendendo e tente novamente!";
    }
  
    document.getElementById("message").textContent = message;
  }
  
  nextButton.addEventListener("click", () => {
    if (!answered) return;
  
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  
  document.getElementById("restart-button").addEventListener("click", () => {
    currentQuestion = 0;
    points = 0;
    answered = false;
  
    result.hidden = true;
    game.hidden = false;
  
    showQuestion();
  });
  
  showQuestion();
  