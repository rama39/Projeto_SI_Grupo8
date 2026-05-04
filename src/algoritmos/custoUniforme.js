// ---------------- CUSTO UNIFORME (DIJKSTRA) ANIMADO (PASSO A PASSO) ----------------

let fronteiraCusto = []; // fila de prioridade (menor custo primeiro)
let visitadosCusto = [];
let paiCusto = {};
let gCusto = {}; // custo acumulado do início até cada nó

function visualizarPassoCustoUniforme() {
  if (fronteiraCusto.length > 0 && !objetivoEncontrado) {
    // Ordena pelo menor custo acumulado (g)
    fronteiraCusto.sort((a, b) => a.g - b.g);
    let atual = fronteiraCusto.shift();

    // Ignora se já foi visitado com custo menor
    if (visitadosCusto[atual.x][atual.y]) return;
    visitadosCusto[atual.x][atual.y] = true;

    // Condição de vitória
    if (atual.x === comida.x && atual.y === comida.y) {
      objetivoEncontrado = true;
      caminho = reconstruirCaminho(paiCusto, comida);
      estado = "MOVENDO";
      progressoSuave = 0;
      return;
    }

    let vizinhos = [
      { x: atual.x, y: atual.y - 1 },
      { x: atual.x, y: atual.y + 1 },
      { x: atual.x - 1, y: atual.y },
      { x: atual.x + 1, y: atual.y },
    ];

    for (let v of vizinhos) {
      if (v.x >= 0 && v.x < colunas && v.y >= 0 && v.y < linhas) {
        let terreno = mapa[v.x][v.y];
        if (terreno.custo === -1) continue; // obstáculo

        let novoG = gCusto[`${atual.x},${atual.y}`] + terreno.custo;
        let key = `${v.x},${v.y}`;

        if (!(key in gCusto) || novoG < gCusto[key]) {
          gCusto[key] = novoG;
          paiCusto[key] = atual;
          fronteiraCusto.push({ x: v.x, y: v.y, g: novoG });
        }
      }
    }
  } else if (fronteiraCusto.length === 0 && !objetivoEncontrado) {
    estado = "BLOQUEADO";
  }
}

function resetarCustoUniforme() {
  fronteiraCusto = [];
  paiCusto = {};
  gCusto = {};
  visitadosCusto = [];

  for (let i = 0; i < colunas; i++) {
    visitadosCusto[i] = new Array(linhas).fill(false);
  }

  let startKey = `${agente.x},${agente.y}`;
  gCusto[startKey] = 0;

  fronteiraCusto.push({ x: agente.x, y: agente.y, g: 0 });

  agenteReal.x = agente.x * tamanhoCelula + tamanhoCelula / 2;
  agenteReal.y = agente.y * tamanhoCelula + tamanhoCelula / 2;
}
