const categories = [
  "História", "Ciência", "Geografia",
  "Esportes", "Arte", "Tecnologia",
  "Música", "Cinema", "Literatura"
];

import * as questions from "./data.js";
let questions = []
questions = data.init();

let correctAnswers = 0;
let startTime;
let playerName;

function mostrarPromptJogador() {
  playerName = prompt("Digite seu nome:");
  criarGrelha();
  iniciarPergunta();
  iniciarContador(); 
}

function criarGrelha() {
  const grid = document.getElementById("grelha");
  categories.forEach((category, index) => {
    const cell = document.getElementById("perguntaContainer");
    cell.textContent = categories[index];
    cell.addEventListener("click", () => iniciarPergunta(category, cell));
    grid.appendChild(cell);
  });
}

function iniciarContador() {
  timer = setInterval(() => {
    tempo++;
    document.getElementById("contador").textContent = `Tempo: ${tempo}s`;
  }, 1000);
}

function iniciarPergunta(category, cell) {
}

function validarResposta(selected, correct, cell) {

}

function finalizarJogo() {

}

function salvarTempo(name, time) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ nomeJogador, tempo });
  leaderboard.sort((a, b) => a.tempo - b.tempo); // Ordena por tempo
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  mostrarLeaderboard();
}

function mostrarLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const leaderboardList = document.getElementById("leaderboard");

  leaderboardList.innerHTML = "";
  leaderboard.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.name} - ${entry.time}s`;
    leaderboardList.appendChild(listItem);
  });

  leaderboardDiv.style.display = "block";
}

window.onload = mostrarPromptJogador;