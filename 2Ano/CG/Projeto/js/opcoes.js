let initialTime = 30; // tempo inicial em segundos

function getInitialTime() {
  return initialTime;
}

// aumenta o tempo em +30 segundos
function add30Seconds() {
  initialTime += 30;
  alert("Tempo aumentado! Novo tempo: " + initialTime + " segundos");
}

//chamar add30Seconds() a partir de um botão nas opções.html
