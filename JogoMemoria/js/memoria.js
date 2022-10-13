//Variáveis globais
var mapa = []
var jogada = 0
var jogador = 1
var escolha1 = 0
var escolha2 = 0
var posicao1 = 0
var posicao2 = 0
var pontuacao1 = 0
var pontuacao2 = 0
var doisJogadores = false

//Elementos da DOM
var mesa = document.getElementById("espacoCartas")
var jogador1 = document.getElementById("jogador1")
var jogador2 = document.getElementById("jogador2")
var select1 = document.getElementById("nJogadores")
var select2 = document.getElementById("nTabuleiro")
var btnNovo = document.getElementById("btnNovo")
var email = document.getElementById("email")
    
//Cronômetro
var centesimas = 0;
var segundos = 0;
var minutos = 0;

function emailValido(input) {
    //Regex de validação do email
    var mailformat = /^\\[a-zA-Z]+\[[a-zA-Z]+\|[a-zA-Z]+(\|[a-zA-Z]+)*\]$/gm;
    if(input.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}

function pararCronometro() {
    clearInterval(control);
}

function iniciarCronometro() {
    if (centesimas < 99) {
        centesimas++;
        if (centesimas < 10) { centesimas = "0" + centesimas }
        document.getElementById("centesimas").innerHTML = ":" + centesimas;
    }
    if (centesimas == 99) {
        centesimas = -1;
    }
    if (centesimas == 0) {
        segundos++;
        if (segundos < 10) { segundos = "0" + segundos }
        document.getElementById("segundos").innerHTML = ":" + segundos;
    }
    if (segundos == 59) {
        segundos = -1;
    }
    if ((centesimas == 0) && (segundos == 0)) {
        minutos++;
        if (minutos < 10) { minutos = "0" + minutos }
        document.getElementById("minutos").innerHTML = ":" + minutos;
    }
    if (minutos == 59) {
        minutos = -1;
    }
}

//Função que configura o início de um jogo de acordo com formulário
function configurarTabuleiro(nTabuleiro) {

    var cont = 0
    mesa.innerHTML = ""

    //Adiciona div's com cartas no html
    //Então linka as cartas com função Javascript
    for (var i = 0; i < nTabuleiro; i++) {
        for (var j = 0; j < nTabuleiro; j++) {
            cont++
            mesa.innerHTML += "<div class='divCarta' id='divCarta" + cont + "'></div>"
            document.getElementById("divCarta" + cont + "").innerHTML += "<a id='link" + cont + "' href='javascript:escolhaDeCarta(" + cont + ")'><img id='carta" + cont + "' src='img/cartas/dorso.png' /></a>"
        }
        mesa.innerHTML += "<br />"
    }
}

function embaralhar(array) {
    var indice_atual = array.length,
        valor_temporario, indice_aleatorio;
    while (0 !== indice_atual) {
        indice_aleatorio = Math.floor(Math.random() * indice_atual);
        indice_atual -= 1;
        valor_temporario = array[indice_atual];
        array[indice_atual] = array[indice_aleatorio];
        array[indice_aleatorio] = valor_temporario;
    }
}

//Função que monta a estrutura lógica do jogo (posicao carta x valor carta)
function mapearCartas(nPares) {
    mapa = [];
    // adiciona pares de cartas em ordem no vetor
    for (i = 1; i <= nPares; i++) {
        for (j = 0; j < 2; j++) {
            mapa.push(i)
        }
    }
    embaralhar(mapa)
    
}

// funcao animada para revelar/esconder carta
function virarCarta(cartaEscolhida, revelar) {

    //Vira dorso
    if (revelar) {
        //Se for mostrar desabilita link e anima
        document.getElementById("link" + cartaEscolhida).setAttribute("class", "disable")
        document.getElementById("carta" + cartaEscolhida).setAttribute("class", "animacao-carta")
    } else {
        //Se for esconder não anima e habilita link
        document.getElementById("link" + cartaEscolhida).setAttribute("class", "")
    }

    //Substitui carta após um tempo
    window.setTimeout(function() {
            if (revelar)
                document.getElementById("carta" + cartaEscolhida).setAttribute("src", "img/cartas/carta(" + mapa[cartaEscolhida - 1] + ").png")
            else
                document.getElementById("carta" + cartaEscolhida).setAttribute("src", "img/cartas/dorso.png")
        }, 250)

    // remove classe para animar da proxima vez
    window.setTimeout(function() {
    document.getElementById("carta" + cartaEscolhida).setAttribute("class", "")
    }, 750)
}

// funcao que pontua jogador da vez quando o mesmo acertar
function pontuaJogador(jogadorUm) {
    if (jogadorUm) // pontua jogador 1
        jogador1.innerHTML = "<span class='label'>P1</span><span>" + ++pontuacao1 + "</span>"
    else // pontua jogador 2
        jogador2.innerHTML = "<span class='label'>P2</span><span>" + ++pontuacao2 + "</span>"
}

// funcao que compara escolhas para validar jogada
function verificaPontuacao() {
    if (escolha1 != escolha2) {
        window.setTimeout(function() {
                virarCarta(posicao1, false)
                virarCarta(posicao2, false)
            }, 500) // tempo para ver cartas erradas

        if (doisJogadores)
            jogador++ // se errou, troca o jogador

    } else if (doisJogadores)
        pontuaJogador(jogador % 2 != 0)
    else if (++pontuacao1 == (select2.value * select2.value / 2)) {
        pontuacao1 = 0
        pararCronometro()
        btnNovo.removeAttribute("hidden")
    }
}

// funcao que trata jogada de qualquer jogador
function escolhaDeCarta(cartaEscolhida) {
    var carta = mapa[cartaEscolhida - 1]
    
    //primeira escolha
    if (jogada == 0) {
        virarCarta(cartaEscolhida, true)
        posicao1 = cartaEscolhida
        escolha1 = carta
        jogada++
    }

    //segunda escolha
    else {
        virarCarta(cartaEscolhida, true)
        posicao2 = cartaEscolhida
        escolha2 = carta
        jogada = 0

        verificaPontuacao()
    }
}

//Inicia um jogo com valores do formulario
function novoJogo() {
    //Guarda valores do formulario
    var nJogadores = select1.value
    var nTabuleiro = select2.value
    var emailText = email.value

    //Verificações
    if (nJogadores == "" || nTabuleiro == "" || emailText == "") {
        alert("Preencha todos os campos do formulário.");
        return
    }
    if (emailValido(emailText) == false) {
        alert("Email inválido! Digite um e-mail priplaniano válido.");
        return
    }

    //Configura pontuação
    pontuacao1 = 0
    doisJogadores = false
    if (nJogadores == 2) {
        pontuacao2 = 0
        doisJogadores = true
        jogador1.removeAttribute("class")
        btnNovo.removeAttribute("hidden")
        jogador1.innerHTML = "<span class='label'>P1</span><span>0</span>"
        jogador2.innerHTML = "<span class='label'>P2</span><span>0</span>"
    } else {
        jogador2.innerHTML = ""
        btnNovo.setAttribute("hidden", "true") // se o jogo recomecar sem terminar, o cronometro fica acelerado
        centesimas = 0;
        segundos = 0;
        minutos = 0;
        jogador1.setAttribute("class", "cronometro")
        jogador1.innerHTML = "<span id='minutos'>00</span><span id='segundos'>:00</span><span id='centesimas'>:00</span>"
        control = setInterval(iniciarCronometro, 10);
    }
    //Monta html do tabuleiro
    configurarTabuleiro(nTabuleiro)
    
    //Monta lógica do tabuleiro
    var nPares = nTabuleiro * nTabuleiro / 2
    mapearCartas(nPares)
}