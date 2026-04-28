
// ---------------- RENDERIZAÇÃO ESPECIALIZADA ----------------

function desenharMapaVisualizacao() {
  for (let x = 0; x < colunas; x++) {
    for (let y = 0; y < linhas; y++) {
      // 1. Desenha terreno base
      fill(mapa[x][y].cor);
      stroke(0, 15); 
      rect(x * tamanhoCelula, y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
      // 2. Sobrepõe estágios da busca se estiver buscando
      if (estado === 'BUSCANDO' || estado === 'BLOQUEADO') {
        // Cor dos já visitados (Cinza translúcido)
        if (visitadosBFS[x][y]) {
          fill(50, 50, 50, 120); // Cinza translúcido
          noStroke();
          rect(x * tamanhoCelula, y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
        }
        
        // Destaque da Fronteira atual (Amarelo nas bordas)
        for (let f of filaBFS) {
          if (f.x === x && f.y === y) {
            noFill();
            stroke(255, 0, 255);
            strokeWeight(3);
            rect(x * tamanhoCelula + 1, y * tamanhoCelula + 1, tamanhoCelula - 2, tamanhoCelula - 2);
            strokeWeight(1);
          }
        }
      }
    }
  }
}

function desenharComida() {
  fill('#FF4136');
  noStroke();
  ellipse(comida.x * tamanhoCelula + tamanhoCelula/2, comida.y * tamanhoCelula + tamanhoCelula/2, tamanhoCelula*0.9);
}

function desenharCaminhoFinal() {
  if (caminho.length > 1) {
    noFill();
    // Amarelo Brilhante com transparência
    stroke(255, 255, 0, 200); 
    strokeWeight(6);
    beginShape();
    // A linha nasce da posição suave do agente
    vertex(agenteReal.x, agenteReal.y);
    // Pula o primeiro ponto porque o agente já está visualmente saindo dele
    for (let i = 1; i < caminho.length; i++) {
      vertex(caminho[i].x * tamanhoCelula + tamanhoCelula/2, caminho[i].y * tamanhoCelula + tamanhoCelula/2);
    }
    endShape();
    stroke(0, 0, 0, 0); 
    strokeWeight(1);
  }
}

function desenharAgente() {
  fill(0, 255, 0);
  strokeWeight(2);
  circle(agenteReal.x, agenteReal.y, tamanhoCelula * 0.9);
}

function desenharPlacarELegendas() {
  fill(0);
  noStroke();
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`Comidas coletadas: ${comidasColetadas}`, 20, 650);
  
  if (estado === 'BLOQUEADO') {
    fill(255, 0, 0);
    text("CAMINHO BLOQUEADO!", 150, 625);
  }
}


// ---------------- MOVIMENTO SUAVE ----------------

function atualizarLogicaMovimentoSuave() {
  if (estado === 'MOVENDO' && caminho.length > 1) {
    let atual = caminho[0];
    let proximo = caminho[1];
    
    let velocidade = mapa[proximo.x][proximo.y].vel;
    progressoSuave += velocidade;
    
    agenteReal.x = lerp(atual.x * tamanhoCelula + tamanhoCelula/2, proximo.x * tamanhoCelula + tamanhoCelula/2, progressoSuave);
    agenteReal.y = lerp(atual.y * tamanhoCelula + tamanhoCelula/2, proximo.y * tamanhoCelula + tamanhoCelula/2, progressoSuave);
    
    if (progressoSuave >= 1) {
      progressoSuave = 0;
      caminho.shift();
      agente.x = proximo.x;
      agente.y = proximo.y;
      
      if (agente.x === comida.x && agente.y === comida.y) {
        comidasColetadas++;
        posicionarComida();
        resetarBusca(); // Começa nova busca animada para a nova comida
      }

      if (caminho.length === 1) {
        // Chegou ao fim, mas não comeu (não deve acontecer neste fluxo)
        estado = 'ESPERANDO';
      }
    }
  }
}

