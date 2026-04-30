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

## Terreno e Visualização

| Elemento        | Cor                | Custo | Descrição                          |
|----------------|--------------------|------|----------------------------------|
| Areia          | #EDC9AF 🟨        | 10   | Caminho fácil                     |
| Atoleiro       | #8B4513 🟫        | 50   | Caminho lento                     |
| Água           | #4169E1 🌊        | 100  | Caminho muito custoso             |
| Obstáculo      | #333333 ⬛        | —    | Intransponível                    |
| Visitados      | #323232 🔘        | —    | Nós já explorados                 |
| Fronteira      | #FF00FF 🟪        | —    | Nós na fronteira da busca         |
| Caminho final  | #FFFF00 🟡        | —    | Caminho encontrado pelo algoritmo |

## Estrutura do projeto
```
src/
 ├── algoritmos/
 │    ├── BFS.js
 │    ├── AStar.js
 │    └── ...
 ├── sketch.js
 ├── draw.js
 └── utils.js
 ```

### ! PARA ADICIONAR NOVOS ALGORITMOS !
  1. implemente algoritmo em ``src/algoritmos/[NOME]``
  2. adicione algoritmo no ``switch(busca)`` em ``draw()`` em ``src/sketch.js``
  3. adicione reset do algoritmo em ``resetarBusca()`` em ``src/utils.js``
  4. adicione algoritmo no ``switch(busca)`` em ``desenharMapaVisualizacao()`` em``src/draw.js``