# INF1407_ProgWeb_2022.2

## Grupo: Guilherme Vassallo 1621178, Ana da Hora 2112149

Este é um jogo da memória para 1 ou 2 jogadores, feito exclusivamente para habitantes da terra distante de Priplanus.

### Instruções:

Para jogar, basta:

1- Selecionar o número de jogadores<br>
2- Selecionar o tamanho do grid de cartas<br>
3- Digitar seu email priplaniano ( no formato \usuário[domínio|domínio|...|domínio] )<br>
4- Clicar em "Novo Jogo"

### Documento de jogo / Outros detalhes:

O jogo possui apenas uma tela e acrescenta a malha de cartas quando o formulário é validado. Ao final da partida é possível clicar em "Novo Jogo" novamente para iniciar outra partida.

O jogo utliza uma expressão regular (Regex) para validar o e-mail digitado pelo usuário e parece funcionar perfeitamente com o formato proposto. Se o formulário não for completamente preenchido ou o e-mail for inválido, o jogo mostra alertas para cada um desses casos, e impede o início do jogo até os ajustes serem feitos.

Implementamos modos de 1 e 2 jogadores no jogo, o primeiro criando um cronômetro para o jogador competir contra si mesmo, e o outro colocando pontuações para ambos os jogadores, que sobem na medida em que conseguem virar cartas iguais.

O jogo coloca um par de todas as cartas que serão utilizadas na partida em um array, depois embaralhando este array para definir a ordem que as cartas irão aparecer no grid. O tamanho deste array é definido pela escolha do tamanho do grid.

Também implementamos uma animação de virada das cartas via CSS. O mesmo também foi utilizado para sombreamento, dimensionamento e posicionamento dos elementos, assim como para a definição da fonte do documento, que obtivemos da biblioteca Google Fonts.

### Bugs:

Quando se clica muito rápido nas cartas ou em alguma que já foi selecionada, alguns bugs ainda podem acontecer, como uma carta virar antes de seu par ser encontrado ou a pontuação ir para o jogador errado.
