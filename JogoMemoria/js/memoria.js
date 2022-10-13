function validarEmail(input) {
    var mailformat = /\\[a-zA-Z]+\[[a-zA-Z]+\|[a-zA-Z]+(\|[a-zA-Z]+)*\]/;
    if(input.value.match(mailformat)) {
        alert("Email válido!");
        document.form1.text1.focus();
        novoJogo()
    }
    else {
        alert("ERRO: Email inválido. Digite um e-mail priplaniano válido.");
        document.form1.text1.focus();
    }
}

function novoJogo() {
    alert("Chamou novojogo!")
}