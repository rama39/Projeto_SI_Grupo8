// ---------------- ESCOLHER MAPA ----------------

let mapaSelecionado = 'aleatorio';

function mudarMapa(novoMapa) {
  resetarBusca();

  mapaSelecionado = novoMapa;
  atualizarMapa();
}

// ---------------- MAPA ----------------

let colunas, linhas;
let tamanhoCelula = 60;
let mapa = [];
let botaoGerar;

function atualizarMapa() {
  switch (mapaSelecionado) {
    case 'perlin':
      gerarMapaPerlin();
      break;
    case 'labirinto':
      gerarMapaLabirinto();
      break;
    case 'aleatorio':
    default:
      gerarMapaAleatorio();
      break;
  }

  posicionarAgente();
  posicionarComida();
  
  resetarBusca();
}

function posicionarAgente() {
  do {
    agente.x = floor(random(colunas));
    agente.y = floor(random(linhas));
  } while (mapa[agente.x][agente.y].custo === -1);
}

function posicionarComida() {
  do {
    comida.x = floor(random(colunas));
    comida.y = floor(random(linhas));
  } while (mapa[comida.x][comida.y].custo === -1 || (comida.x === agente.x && comida.y === agente.y));
}

// ---------------- MAPA ALEATORIO ----------------

function gerarMapaAleatorio() {
  for (let x = 0; x < colunas; x++) {
    mapa[x] = [];
    for (let y = 0; y < linhas; y++) {
      let chance = random(1);
      if (chance < 0.15) mapa[x][y] = TIPOS_TERRENO.OBSTACULO; 
      else if (chance < 0.25) mapa[x][y] = TIPOS_TERRENO.AGUA;      
      else if (chance < 0.40) mapa[x][y] = TIPOS_TERRENO.ATOLEIRO;  
      else mapa[x][y] = TIPOS_TERRENO.AREIA;
    }
  }
}

// ---------------- MAPA PERLIN ----------------


function gerarMapaPerlin() {
  gerarMapaAleatorio(); // Placeholder: Implementar geração Perlin real
}

// ---------------- MAPA LABIRINTO ----------------

let loopChance = 0.15; // more loops → less "maze-like"
let expandChance = 0.1; // chance de expandir um corredor

function terrenoAleatorioCaminho() {
  let r = random(1);

  if (r < 0.6) return TIPOS_TERRENO.AREIA;
  if (r < 0.85) return TIPOS_TERRENO.ATOLEIRO;
  return TIPOS_TERRENO.AGUA;
}

function gerarMapaLabirinto() {
  // 1. Inicializa tudo como obstáculo
  for (let x = 0; x < colunas; x++) {
    mapa[x] = [];
    for (let y = 0; y < linhas; y++) {
      mapa[x][y] = TIPOS_TERRENO.OBSTACULO;
    }
  }

  let stack = [];

  let startX = floor(random(colunas / 2)) * 2;
  let startY = floor(random(linhas / 2)) * 2;

  mapa[startX][startY] = TIPOS_TERRENO.AREIA;
  stack.push({ x: startX, y: startY });

  let dirs = [
    { dx: 0, dy: -2 },
    { dx: 0, dy: 2 },
    { dx: -2, dy: 0 },
    { dx: 2, dy: 0 }
  ];

  // 2. DFS (labirinto base)
  while (stack.length > 0) {
    let atual = stack[stack.length - 1];
    let vizinhos = [];

    for (let d of dirs) {
      let nx = atual.x + d.dx;
      let ny = atual.y + d.dy;

      if (nx >= 0 && nx < colunas && ny >= 0 && ny < linhas) {
        if (mapa[nx][ny].custo === -1) {
          vizinhos.push({ x: nx, y: ny, dx: d.dx, dy: d.dy });
        }
      }
    }

    if (vizinhos.length > 0) {
      let escolhido = random(vizinhos);

      let wx = atual.x + escolhido.dx / 2;
      let wy = atual.y + escolhido.dy / 2;

      mapa[wx][wy] = TIPOS_TERRENO.AREIA;
      mapa[escolhido.x][escolhido.y] = TIPOS_TERRENO.AREIA;

      stack.push({ x: escolhido.x, y: escolhido.y });
    } else {
      stack.pop();
    }
  }

  // 3. Criar LOOPS (múltiplos caminhos)

  for (let x = 1; x < colunas - 1; x++) {
    for (let y = 1; y < linhas - 1; y++) {
      if (mapa[x][y].custo === -1 && random(1) < loopChance) {
        mapa[x][y] = TIPOS_TERRENO.AREIA;
      }
    }
  }

  // 4. Expandir corredores (largura) — versão corrigida
  let copia = JSON.parse(JSON.stringify(mapa));

  for (let x = 1; x < colunas - 1; x++) {
    for (let y = 1; y < linhas - 1; y++) {

      // só expande ALGUNS caminhos
      if (copia[x][y].custo !== -1 && random(1) < expandChance) {

        // abre apenas vizinhos imediatos (não área inteira)
        let vizinhos = [
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 }
        ];

        for (let v of vizinhos) {
          let nx = x + v.dx;
          let ny = y + v.dy;

          if (nx >= 0 && nx < colunas && ny >= 0 && ny < linhas) {
            mapa[nx][ny] = TIPOS_TERRENO.AREIA;
          }
        }
      }
    }
  }

  // 5. Aplicar terrenos variados
  for (let x = 0; x < colunas; x++) {
    for (let y = 0; y < linhas; y++) {
      if (mapa[x][y].custo !== -1) {
        mapa[x][y] = terrenoAleatorioCaminho();
      }
    }
  }
}