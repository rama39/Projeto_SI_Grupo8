function setup() {
  createCanvas(600, 710); // Maior para o placar e legendas

  // Interatividades de MAPA
  
  botaoGerar = botao(10, 610, 'Gerar Novo Mapa', atualizarMapa);

  selectMapa = createSelect();
  selectMapa.position(140, 610);

  selectMapa.option("Aleatório", "aleatorio");
  selectMapa.option("Perlin", "perlin");
  selectMapa.option("Labirinto", "labirinto");

  selectMapa.selected(mapaSelecionado);

  selectMapa.changed(() => {
    mapaSelecionado = selectMapa.value();
    atualizarMapa();
  });

  // Interatividades de BUSCA

  selectBusca = createSelect();
  selectBusca.position(420, 610);

  selectBusca.option("BFS");
  selectBusca.option("DFS");
  selectBusca.option("Custo Uniforme");
  selectBusca.option("Gulosa");
  selectBusca.option("A*");

  selectBusca.selected(busca);

  selectBusca.changed(() => {
    mudaBusca(selectBusca.value());
  });

  // MUTE
  botaoMute = botao(555, 610, "🔇", toggleMute);

  // slider de tamanho da célula

  sliderCelula = createSlider(20, 100, tamanhoCelula, 5); // min, max, initial, step
  sliderCelula.position(10, 650);
  sliderCelula.input(() => {
    tamanhoCelula = sliderCelula.value();

    colunas = floor(width / tamanhoCelula);
    linhas = colunas;

    labelCelula.html(`Tamanho da célula: ${tamanhoCelula}`);

    atualizarMapa();
  });
  labelCelula = createDiv(`Tamanho da célula: ${tamanhoCelula}`);
  labelCelula.position(10, 675);

  colunas = floor(width / tamanhoCelula);
  linhas = colunas;

  atualizarMapa();
}

function draw() {
  background(220);

  desenharMapaVisualizacao(); // Desenha mapa com cores da busca
  desenharComida();

  if (estado === "BUSCANDO") {
    stopMoveSound();
    playStepSound();
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
    playMoveSound();
    updateMoveSound();
  }

  desenharAgente();
  desenharPlacarELegendas();
}
