function validarUsuarioSenha() {
    // Verificar se o usuário e a senha correspondem aos valores desejados
    var usuario = document.getElementById("username").value;
    var senha = document.getElementById("password").value;

    return usuario === "lucasbeckh@live.com" && senha === "123";
}

function redirecionarParaOutraPagina() {
    // Verificar se as credenciais são válidas
    if (validarUsuarioSenha()) {
        window.location.href = "main.html";
    } else {
    
        var mensagemErro = document.getElementById("mensagem-erro");
        mensagemErro.innerText = "Credenciais inválidas. Por favor, tente novamente.";
    }
}