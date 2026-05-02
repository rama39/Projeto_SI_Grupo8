// ---------------- ALGORITMO DFS ANIMADO (PASSO A PASSO) ----------------

// Variáveis Globais da Busca (DFS Passo a Passo)
let pilhaDFS = [];
let visitadosDFS = [];
let paiDFS = {};
let objetivoEncontradoDFS = false;

function visualizarPassoDFS() {
  if (pilhaDFS.length > 0 && !objetivoEncontradoDFS) {
    let atual = pilhaDFS.pop(); // Pega o topo da pilha (LIFO)

    // CONDIÇÃO DE VITÓRIA
    if (atual.x === comida.x && atual.y === comida.y) {
      objetivoEncontradoDFS = true;
      caminho = reconstruirCaminho(paiDFS, comida);
      estado = 'MOVENDO';
      progressoSuave = 0;
      return;
    }

    // Vizinhos ortogonais
    let vizinhos = [
      { x: atual.x, y: atual.y - 1 },
      { x: atual.x, y: atual.y + 1 },
      { x: atual.x - 1, y: atual.y },
      { x: atual.x + 1, y: atual.y }
    ];

    for (let v of vizinhos) {
      if (v.x >= 0 && v.x < colunas && v.y >= 0 && v.y < linhas) {
        if (!visitadosDFS[v.x][v.y] && mapa[v.x][v.y].custo !== -1) {
          visitadosDFS[v.x][v.y] = true; // marca ao empilhar
          paiDFS[`${v.x},${v.y}`] = atual;
          pilhaDFS.push(v); // adiciona na pilha
        }
      }
    }

  } else if (pilhaDFS.length === 0 && !objetivoEncontradoDFS) {
    estado = 'BLOQUEADO';
  }
}

function resetarDFS() {
  pilhaDFS = [];
  paiDFS = {};
  objetivoEncontradoDFS = false;

  // Inicializa matriz de visitados
  for (let i = 0; i < colunas; i++) {
    visitadosDFS[i] = new Array(linhas).fill(false);
  }

  // Começa na posição do agente
  pilhaDFS.push({ x: agente.x, y: agente.y });
  visitadosDFS[agente.x][agente.y] = true;

  // Reset visual
  agenteReal.x = agente.x * tamanhoCelula + tamanhoCelula / 2;
  agenteReal.y = agente.y * tamanhoCelula + tamanhoCelula / 2;
}