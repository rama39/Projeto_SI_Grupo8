function setup() {
  createCanvas(600, 750); // Maior para o placar e legendas

  sliderCelula = createSlider(20, 100, tamanhoCelula, 5); // min, max, initial, step
  sliderCelula.position(10, 690);
  sliderCelula.input(() => {
  tamanhoCelula = sliderCelula.value();

  colunas = floor(width / tamanhoCelula);
  linhas = colunas;

  labelCelula.html(`Tamanho da célula: ${tamanhoCelula}`);

  atualizarMapa();
  });

  labelCelula = createDiv(`Tamanho da célula: ${tamanhoCelula}`);
  labelCelula.position(10, 710);

  botaoGerarAleatorio = botao(10, 610, "Gerar Mapa perlin", () => {
    mapaSelecionado = "perlin";
    atualizarMapa();
  });
  botaoGerarPerlin = botao(10, 635, "Gerar Mapa aleatório", () => {
    mapaSelecionado = "aleatorio";
    atualizarMapa();
  });
  botaoGerarLabirinto = botao(10, 660, "Gerar Mapa labirinto", () => {
    mapaSelecionado = "labirinto";
    atualizarMapa();
  });

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
  linhas = colunas;

  atualizarMapa();
}

function draw() {
  background(220);

  desenharMapaVisualizacao(); // Desenha mapa com cores da busca
  desenharComida();

  if (estado === "BUSCANDO") {
    frameRate(map(tamanhoCelula, 20, 100, 60, 8)); // Busca mais rápida para células maiores
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
    frameRate(map(tamanhoCelula, 20, 100, 120, 60)); // Movimento do agente rápido e suave
    desenharCaminhoFinal();
    atualizarLogicaMovimentoSuave();
  }

  desenharAgente();
  desenharPlacarELegendas();
}
