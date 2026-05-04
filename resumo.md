# Projeto_SI_Grupo8

Visualização interativa de algoritmos de busca em grade bidimensional utilizando p5.js. O sistema permite comparar diferentes estratégias de busca (BFS, DFS, Custo Uniforme, Gulosa e A*) em mapas com diferentes tipos de terreno e custos, exibindo a exploração passo a passo e o caminho final encontrado.

---

## Visão Geral

O projeto simula um agente que precisa encontrar um caminho até um objetivo (comida) em um mapa com custos variados. Cada algoritmo de busca é executado incrementalmente (por frame), permitindo observar o comportamento da fronteira, dos nós visitados e do caminho final. O ambiente pode ser gerado de diferentes formas (aleatório, Perlin e labirinto), e a resolução do grid pode ser ajustada dinamicamente.

---

## Estrutura do Projeto
```
src/
├── algoritmos/
│ ├── BFS.js
│ ├── DFS.js
│ ├── AStar.js
│ ├── Guloso.js
│ └── CustoUniforme.js
├── draw.js
├── mapa.js
├── sketch.js
└── utils.js
```

---

## Descrição dos Arquivos

### `sketch.js`
Arquivo principal do p5.js. Contém as funções `setup()` e `draw()`, responsáveis por inicializar a interface, criar os controles (dropdowns, slider, botões) e executar o loop de renderização. Também controla a troca entre estados do sistema (`BUSCANDO`, `MOVENDO`) e seleciona qual algoritmo será executado a cada frame.

### `utils.js`
Define estruturas globais e utilidades do sistema. Contém o estado da aplicação, variáveis do agente e da comida, controle de trajetória, função de reset das buscas (`resetarBusca()`), troca de algoritmo (`mudaBusca()`), reconstrução do caminho (`reconstruirCaminho()`), além de constantes que definem os tipos de terreno (custo, cor e velocidade).

### `mapa.js`
Responsável pela geração dos mapas. Implementa funções como `gerarMapaAleatorio()`, `gerarMapaPerlin()` e `gerarMapaLabirinto()`, cada uma criando um padrão diferente de terreno. Também inclui funções para posicionar o agente (`posicionarAgente()`) e o objetivo (`posicionarComida()`), garantindo que estejam em posições válidas.

### `draw.js`
Contém funções de renderização. Desenha o mapa com cores baseadas no terreno (`desenharMapaVisualizacao()`), destaca nós visitados e a fronteira da busca, renderiza o agente (`desenharAgente()`), o objetivo (`desenharComida()`), o caminho final (`desenharCaminhoFinal()`) e elementos de interface como o placar.

### `algoritmos/BFS.js`
Implementa a busca em largura de forma incremental. Usa uma fila como fronteira (`filaBFS`), marca nós visitados e mantém um mapa de pais (`paiBFS`) para reconstruir o caminho. A função principal `visualizarPassoBFS()` executa um passo da busca por frame.

### `algoritmos/DFS.js`
Implementa a busca em profundidade utilizando uma pilha. Explora caminhos profundamente antes de retroceder, o que pode resultar em caminhos não ótimos. Possui lógica semelhante à BFS, mas com estrutura de dados diferente.

### `algoritmos/AStar.js`
Implementa o algoritmo A*, combinando custo acumulado e heurística (geralmente distância até o objetivo). Utiliza uma fila de prioridade (ou estrutura equivalente) para expandir nós com menor custo estimado. Mantém mapas de custo (`gScore`) e pais para reconstrução do caminho.

### `algoritmos/Guloso.js`
Implementa busca gulosa (Greedy Best-First), que utiliza apenas a heurística para escolher o próximo nó. Ignora o custo acumulado, o que pode gerar caminhos não ótimos, porém mais rápidos em alguns casos.

### `algoritmos/CustoUniforme.js`
Implementa a busca de custo uniforme (equivalente ao algoritmo de Dijkstra). Expande sempre o nó com menor custo acumulado, garantindo encontrar o caminho de menor custo, independentemente da heurística.

---

## Principais Funções

- `setup()`: inicializa o canvas, cria controles de interface e gera o primeiro mapa.
- `draw()`: loop principal que atualiza a tela, executa a busca ou o movimento do agente e renderiza todos os elementos.
- `atualizarMapa()`: gera um novo mapa conforme o tipo selecionado e reinicia a busca.
- `mudaBusca()`: altera o algoritmo ativo e reinicia o estado da busca.
- `resetarBusca()`: reinicializa estruturas de dados do algoritmo selecionado.
- `reconstruirCaminho()`: reconstrói o caminho final a partir do mapa de pais.
- `visualizarPassoX()`: conjunto de funções (uma por algoritmo) que executam um passo da busca por frame.
- `desenharMapaVisualizacao()`: renderiza o grid e destaca visitados e fronteira.
- `desenharCaminhoFinal()`: desenha o caminho encontrado após o término da busca.
- `atualizarLogicaMovimentoSuave()`: move o agente ao longo do caminho com interpolação suave.
- `gerarMapaAleatorio()`: cria um mapa com distribuição aleatória de terrenos.
- `gerarMapaPerlin()`: gera biomas contínuos usando ruído Perlin.
- `gerarMapaLabirinto()`: cria um labirinto com múltiplos caminhos e corredores.
- `posicionarAgente()` / `posicionarComida()`: posicionam entidades em locais válidos do mapa.

---

## Perguntas e Respostas

1. Qual a diferença entre BFS, DFS, Custo Uniforme, Gulosa e A* em termos de completude e otimalidade?  
   BFS é completa e ótima em número de passos, DFS não é ótima nem sempre completa, Custo Uniforme é completo e ótimo em custo, Gulosa não é ótima nem completa em geral, e A* é completo e ótimo se a heurística for admissível.

2. Por que o A* é considerado mais eficiente que a busca de custo uniforme em muitos casos?  
   Porque utiliza uma heurística para guiar a busca, reduzindo o número de nós explorados.

3. Como a escolha da heurística impacta o desempenho do A*?  
   Uma heurística mais informativa (e admissível) reduz o número de expansões e melhora a eficiência.

4. Em quais situações a busca gulosa pode falhar em encontrar o melhor caminho?  
   Quando a heurística leva a escolhas localmente boas que resultam em soluções globais ruins ou becos sem saída.

5. Por que a BFS garante o menor número de passos, mas não necessariamente o menor custo?  
   Porque considera apenas a profundidade (número de passos) e ignora os custos dos terrenos.

6. Como o custo dos terrenos influencia o comportamento dos algoritmos?  
   Algoritmos sensíveis a custo evitam terrenos caros, enquanto BFS e DFS não consideram custo.

7. Qual a complexidade de tempo e espaço de cada algoritmo implementado?  
   BFS e DFS têm complexidade O(b^d); Custo Uniforme e A* também podem ser exponenciais no pior caso, dependendo do espaço de estados.

8. Por que a DFS pode não encontrar o objetivo em certos cenários sem controle adicional?  
   Porque pode explorar caminhos muito profundos ou infinitos sem retroceder adequadamente.

9. Como o uso de uma fila de prioridade melhora o desempenho em algoritmos como A* e Dijkstra?  
   Garante que o próximo nó expandido seja o de menor custo (ou custo estimado), tornando a busca mais eficiente.

10. Qual a vantagem de visualizar algoritmos passo a passo em comparação com execução instantânea?  
    Facilita a compreensão do comportamento e permite comparar estratégias de busca.

11. Como garantir que sempre exista um caminho entre o agente e o objetivo?  
    Garantindo conectividade no mapa ou regenerando até que exista um caminho válido.

12. Qual seria o impacto de permitir movimentos diagonais no grid?  
    Aumenta os vizinhos possíveis e exige ajustes na heurística e nos cálculos de custo.

13. Como o tamanho da célula (resolução do mapa) afeta o desempenho dos algoritmos?  
    Células menores aumentam o número de nós e tornam a busca mais custosa.

14. Como adaptar esse sistema para ambientes contínuos em vez de discretos?  
    Utilizando representações contínuas e métodos como planejamento por amostragem.

15. Quais modificações seriam necessárias para suportar múltiplos agentes?  
    Seria necessário coordenar buscas, evitar colisões e possivelmente usar planejamento cooperativo.