function setup() {
  createCanvas(600, 680); // Maior para o placar e legendas
  botaoGerar = botao(10, 610, "Gerar Novo Mapa", atualizarMapa);
  botaoBFS = botao(150, 610, "BFS", () => {
    mudaBusca("BFS");
  });
  botaoDFS = botao(200, 610, "DFS", () => {
    mudaBusca("DFS");
  });
  botaoCst = botao(250, 610, "Custo Uniforme", () => {
    mudaBusca("Custo Uniforme");
  });
  botaoGul = botao(370, 610, "Gulosa", () => {
    mudaBusca("Gulosa");
  });
  botaoASt = botao(440, 610, "A*", () => {
    mudaBusca("A*");
  });

  colunas = floor(width / tamanhoCelula);
  linhas = floor((height - 80) / tamanhoCelula);

  atualizarMapa();
}

function draw() {
  background(220);

  desenharMapaVisualizacao(); // Desenha mapa com cores da busca
  desenharComida();

  if (estado === "BUSCANDO") {
    frameRate(10); // Busca lenta para podermos ver o passo a passo
    switch (busca) {
      case "A*":
        visualizarPassoAStar();
        break;
      case "BFS":
        visualizarPassoBFS();
        break;
      case "DFS":
        visualizarPassoDFS();
        break;
      case "Gulosa":
        visualizarPassoGuloso();
        break;
      case "Custo Uniforme":
        visualizarPassoCustoUniforme();
        break;
    }
  } else if (estado === "MOVENDO") {
    frameRate(60); // Movimento do agente rápido e suave
    desenharCaminhoFinal();
    atualizarLogicaMovimentoSuave();
  }

  desenharAgente();
  desenharPlacarELegendas();
}
