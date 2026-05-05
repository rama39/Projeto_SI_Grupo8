// ---------------- A* ANIMADO (PASSO A PASSO) ----------------

// Estruturas da busca
let openAStar = [];
let visitadosAStar = [];
let paiAStar = {};
let gScore = {}; // custo acumulado

function visualizarPassoAStar() {
  if (openAStar.length > 0 && !objetivoEncontrado) {

    // Ordena pela menor f = g + h
    openAStar.sort((a, b) => a.f - b.f);
    let atual = openAStar.shift();

    // Chegou no objetivo
    if (atual.x === comida.x && atual.y === comida.y) {
      objetivoEncontrado = true;
      caminho = reconstruirCaminho(paiAStar, comida);
      estado = 'MOVENDO';
      progressoSuave = 0;
      return;
    }

    visitadosAStar[atual.x][atual.y] = true;

    let vizinhos = [
      { x: atual.x, y: atual.y - 1 },
      { x: atual.x, y: atual.y + 1 },
      { x: atual.x - 1, y: atual.y },
      { x: atual.x + 1, y: atual.y }
    ];

    for (let v of vizinhos) {
      if (v.x >= 0 && v.x < colunas && v.y >= 0 && v.y < linhas) {

        let terreno = mapa[v.x][v.y];
        if (terreno.custo === -1) continue; // obstáculo

        let novoG = gScore[`${atual.x},${atual.y}`] + terreno.custo;

        let key = `${v.x},${v.y}`;

        if (!(key in gScore) || novoG < gScore[key]) {
          gScore[key] = novoG;

          let h = heuristica(v, comida);

          openAStar.push({
            x: v.x,
            y: v.y,
            f: novoG + h
          });

          paiAStar[key] = atual;
        }
      }
    }

  } else if (openAStar.length === 0 && !objetivoEncontrado) {
    estado = 'BLOQUEADO';
  }
}

function resetarAStar() {
  openAStar = [];
  paiAStar = {};
  gScore = {};
  visitadosAStar = [];

  for (let i = 0; i < colunas; i++) {
    visitadosAStar[i] = new Array(linhas).fill(false);
  }

  let startKey = `${agente.x},${agente.y}`;
  gScore[startKey] = 0;

  openAStar.push({
    x: agente.x,
    y: agente.y,
    f: heuristica(agente, comida)
  });

  agenteReal.x = agente.x * tamanhoCelula + tamanhoCelula/2;
  agenteReal.y = agente.y * tamanhoCelula + tamanhoCelula/2;
}