
// Máquina de Estados
// Estados possíveis: 'BUSCANDO', 'MOVENDO', 'BLOQUEADO'
let estado = 'BUSCANDO'; 

// tipo de busca. pode ser BFS, DFS, 
let busca = 'BFS';

// Agente, Comida e Pontuação
let agente = { x: 0, y: 0 }; 
let agenteReal = { x: 0, y: 0 }; 
let comida = { x: 0, y: 0 };
let comidasColetadas = 0;

// Trajetória e Movimento Suave
let caminho = [];
let movendoSuave = false;
let progressoSuave = 0;

const TIPOS_TERRENO = {
  AREIA:     { custo: 10,  cor: '#EDC9AF', vel: 0.15 }, 
  ATOLEIRO:  { custo: 50,  cor: '#8B4513', vel: 0.05 }, 
  AGUA:      { custo: 100, cor: '#4169E1', vel: 0.02 }, 
  OBSTACULO: { custo: -1,  cor: '#333333', vel: 0 }  
};

function botao(x, y, nome, func) {
  var botaoTemp = createButton(nome)
  botaoTemp.position(x, y);
  botaoTemp.mousePressed(func);
  return botaoTemp
}

// ---------------- LÓGICA DE INICIALIZAÇÃO ----------------

function mudaBusca(novaBusca) {
  resetarBusca();
  busca = novaBusca;
}

function resetarBusca() {
  /*switch (busca) {
    case 'A*':
      resetarAStar();
      break;
    case 'BFS':
    default:
      resetarBFS();
  }*/
  resetarAStar();
  resetarBFS();

  // Inicializa variáveis da busca
  objetivoEncontrado = false;
  caminho = [];
  estado = 'BUSCANDO';
  
  // Reinicia posição visual suave
  agenteReal.x = agente.x * tamanhoCelula + tamanhoCelula/2;
  agenteReal.y = agente.y * tamanhoCelula + tamanhoCelula/2;
}

function reconstruirCaminho(paiMap, destino) {
  let res = [];
  let atual = destino;
  while (atual) {
    res.push(atual);
    atual = paiMap[`${atual.x},${atual.y}`];
  }
  return res.reverse(); // Do início para o fim
}