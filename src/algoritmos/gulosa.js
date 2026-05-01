let fronteiraGulosa = []; // fila de prioridade
let visitadosGulosa = [];
let pai = {};

function visualizarPassoGuloso() {
  if (fronteiraGulosa.length > 0 && !objetivoEncontrado) {

    // ordena pela heurística (mais perto da comida primeiro)
    fronteiraGulosa.sort((a, b) => 
      heuristica(a, comida) - heuristica(b, comida)
    );

    let atual = fronteiraGulosa.shift();

    // condição de vitória
    if (atual.x === comida.x && atual.y === comida.y) {
      objetivoEncontrado = true;
      caminho = reconstruirCaminho(pai, comida);
      estado = 'MOVENDO';
      progressoSuave = 0;
      return;
    }

    let vizinhos = [
      { x: atual.x, y: atual.y - 1 },
      { x: atual.x, y: atual.y + 1 },
      { x: atual.x - 1, y: atual.y },
      { x: atual.x + 1, y: atual.y }
    ];

    for (let v of vizinhos) {
      if (v.x >= 0 && v.x < colunas && v.y >= 0 && v.y < linhas) {
        if (!visitadosGulosa[v.x][v.y] && mapa[v.x][v.y].custo !== -1) {
          visitadosGulosa[v.x][v.y] = true;
          pai[`${v.x},${v.y}`] = atual;
          fronteiraGulosa.push(v);
        }
      }
    }

  } else if (fronteiraGulosa.length === 0 && !objetivoEncontrado) {
    estado = 'BLOQUEADO';
  }
}

function resetarGuloso() {
  fronteiraGulosa = [];
  pai = {};

  for (let i = 0; i < colunas; i++) {
    visitadosGulosa[i] = new Array(linhas).fill(false);
  }

  fronteiraGulosa.push({x: agente.x, y: agente.y});
  visitadosGulosa[agente.x][agente.y] = true;
}