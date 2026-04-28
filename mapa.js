// ---------------- UTILITÁRIOS MAPA ----------------

function gerarMapa() {
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
