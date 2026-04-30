let colunas, linhas;
let tamanhoCelula = 60;
let mapa = [];
let botaoGerar;

// Máquina de Estados
let estado = 'BUSCANDO'; // Estados possíveis: 'BUSCANDO', 'MOVENDO', 'BLOQUEADO'

// Agente, Comida e Pontuação
let agente = { x: 0, y: 0 }; 
let agenteReal = { x: 0, y: 0 }; 
let comida = { x: 0, y: 0 };
let comidasColetadas = 0;

// Trajetória e Movimento Suave
let caminho = [];
let movendoSuave = false;
let progressoSuave = 0;

// Variáveis Globais da Busca (BFS Passo a Passo)
let filaBFS = [];
let visitadosBFS = [];
let paiBFS = {}; // "filho": "pai"
let objetivoEncontrado = false;

const TIPOS_TERRENO = {
  AREIA:     { custo: 10,  cor: '#EDC9AF', vel: 0.15 }, 
  ATOLEIRO:  { custo: 50,  cor: '#8B4513', vel: 0.05 }, 
  AGUA:      { custo: 100, cor: '#4169E1', vel: 0.02 }, 
  OBSTACULO: { custo: -1,  cor: '#333333', vel: 0 }  
};

function setup() {
  createCanvas(600, 680); // Maior para o placar e legendas
  botaoGerar = createButton('Gerar Novo Mapa');
  botaoGerar.position(10, 610);
  botaoGerar.mousePressed(atualizarMapa);
  
  colunas = floor(width / tamanhoCelula);
  linhas = floor((height - 80) / tamanhoCelula);
  
  atualizarMapa();
}

function draw() {
  background(220);
  
  desenharMapaVisualizacao(); // Desenha mapa com cores da busca
  desenharComida();
  
  if (estado === 'BUSCANDO') {
    frameRate(10); // Busca lenta para podermos ver o passo a passo
    visualizarPassoBFS();
  } else if (estado === 'MOVENDO') {
    frameRate(60); // Movimento do agente rápido e suave
    desenharCaminhoFinal();
    atualizarLogicaMovimentoSuave();
  }
  
  desenharAgente();
  desenharPlacarELegendas();
}

// ---------------- LÓGICA DE INICIALIZAÇÃO ----------------

function atualizarMapa() {
  gerarMapa();
  posicionarAgente();
  posicionarComida();
  
  resetarBusca();
}

function resetarBusca() {
  // Inicializa variáveis da busca
  filaBFS = [];
  paiBFS = {};
  objetivoEncontrado = false;
  caminho = [];
  estado = 'BUSCANDO';
  
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
