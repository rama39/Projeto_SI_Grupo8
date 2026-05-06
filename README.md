# Projeto_SI_Grupo8

Visualização interativa de algoritmos de busca utilizando p5.js.

Acesse o projeto:
https://rama39.github.io/Projeto_SI_Grupo8/

## Algoritmos implementados
- BFS (Busca em Largura)
- DFS (Busca em Profundidade)
- Custo Uniforme (Dijkstra)
- Gulosa (Greedy Best-First)
- A* (A-Star)

## Como usar
1. Clique em Gerar Novo Mapa para criar um novo cenário
2. Escolha o algoritmo desejado
3. Observe a busca acontecendo em tempo real. O agente automaticamente segue o caminho encontrado

## Tipos de mapa
- Aleatório (cada célula tem tipo aleatório)
- Labirinto (múltiplos caminhos, corredores mais largos e terrenos variados)
- Perlin (geração suave baseada em ruído, criando regiões contínuas de terreno)

## Terreno e Visualização

| Elemento        | Cor                | Custo | Descrição                          |
|----------------|--------------------|------|----------------------------------|
| Areia          | #EDC9AF 🟨        | 10   | Caminho fácil                     |
| Atoleiro       | #8B4513 🟫        | 50   | Caminho lento                     |
| Água           | #4169E1 🟦        | 100  | Caminho muito custoso             |
| Obstáculo      | #333333 ⬛        | —    | Intransponível                    |
| Visitados      | #323232 🔘        | —    | Nós já explorados                 |
| Fronteira      | #FF00FF 🟪        | —    | Nós na fronteira da busca         |
| Caminho final  | #FFFF00 🟡        | —    | Caminho encontrado pelo algoritmo |

## Estrutura do projeto
```
├── src/                    # Código fonte principal do projeto
│   ├── algoritmos/         # Implementação dos algoritmos de busca
│   │   ├── AStart.js       # Algoritmo A* (A-Estrela)
│   │   ├── BFS.js          # Breadth-First Search (Busca em Largura)
│   │   ├── DFS.js          # Depth-First Search (Busca em Profundidade)
│   │   ├── custoUniforme.js # Busca de Custo Uniforme (Dijkstra)
│   │   └── gulosa.js       # Busca Gulosa (Greedy Best-First Search)
│   ├── audio.js            # Gerenciamento de efeitos sonoros
│   ├── draw.js             # Funções de renderização visual
│   ├── mapa.js             # Lógica de geração e controle do mapa/grid
│   ├── sketch.js           # Arquivo principal do p5.js (setup e draw)
│   └── utils.js            # Funções utilitárias e flood-fill
├── index.html              # Ponto de entrada da aplicação
├── p5.js                   # Biblioteca p5.js core
├── p5.sound.min.js         # Extensão para suporte a áudio
├── resumo.md               # Documentação técnica resumida
├── style.css               # Estilização da interface
└── README.md               
 ```

### ! PARA ADICIONAR NOVOS ALGORITMOS !
  1. implemente algoritmo em ``src/algoritmos/[NOME]``
  2. adicione algoritmo como ``<script src="src/algoritmos/[NOME]"></script>`` em ``index.html``
  3. adicione algoritmo no ``switch(busca)`` em ``draw()`` em ``src/sketch.js``
  4. adicione reset do algoritmo em ``resetarBusca()`` em ``src/utils.js``
  5. adicione algoritmo no ``switch(busca)`` em ``desenharMapaVisualizacao()`` em``src/draw.js``
