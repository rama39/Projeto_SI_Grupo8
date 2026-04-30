
// ---------------- ALGORITMO BFS ANIMADO (PASSO A PASSO) ----------------

// Variáveis Globais da Busca (BFS Passo a Passo)
let filaBFS = [];
let visitadosBFS = [];
let paiBFS = {}; // "filho": "pai"
let objetivoEncontrado = false;

function visualizarPassoBFS() {
  if (filaBFS.length > 0 && !objetivoEncontrado) {
    let atual = filaBFS.shift(); // Pega o próximo da fronteira

    // CONDIÇÃO DE VITÓRIA (no momento de retirar da fila)
    if (atual.x === comida.x && atual.y === comida.y) {
      objetivoEncontrado = true;
      caminho = reconstruirCaminho(paiBFS, comida);
      estado = 'MOVENDO'; // Muda para o próximo estágio
      progressoSuave = 0;
      return;
    }

    // Explora vizinhos ortogonais
    let vizinhos = [
      { x: atual.x, y: atual.y - 1 },
      { x: atual.x, y: atual.y + 1 },
      { x: atual.x - 1, y: atual.y },
      { x: atual.x + 1, y: atual.y }
    ];

    for (let v of vizinhos) {
      // Verifica limites e se é obstáculo
      if (v.x >= 0 && v.x < colunas && v.y >= 0 && v.y < linhas) {
        if (!visitadosBFS[v.x][v.y] && mapa[v.x][v.y].custo !== -1) {
          visitadosBFS[v.x][v.y] = true; // Marca como visitado ao colocar na fila
          paiBFS[`${v.x},${v.y}`] = atual; // Guarda de onde viemos
          filaBFS.push(v); // Adiciona à fronteira
        }
      }
    }
  } else if (filaBFS.length === 0 && !objetivoEncontrado) {
    // Fila acabou e não achou comida (caminho bloqueado)
    estado = 'BLOQUEADO';
  }
}

function resetarBFS() {
  // Inicializa variáveis da busca
  filaBFS = [];
  paiBFS = {};
  
  // Inicializa matriz de visitados
  for (let i = 0; i < colunas; i++) {
    visitadosBFS[i] = new Array(linhas).fill(false);
  }
  
  // Começa a busca na posição do agente
  filaBFS.push({x: agente.x, y: agente.y});
  visitadosBFS[agente.x][agente.y] = true;
  
  // Reinicia posição visual suave
  agenteReal.x = agente.x * tamanhoCelula + tamanhoCelula/2;
  agenteReal.y = agente.y * tamanhoCelula + tamanhoCelula/2;
}
