// import { axios } from "axios";

const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');
let itens;
let id;

function openModal() {
  modal.classList.add('active');
  sNome.value = '';
  sFuncao.value = '';
  sSalario.value = '';
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return;
  }

  e.preventDefault();

  
  const itens = { 
    'nome': sNome.value, 
    'funcao': sFuncao.value, 
    'salario': sSalario.value 
  }
  

  setItensBD();

  modal.classList.remove('active');
  // loadItens();
  id = undefined;

  axios.post('http://localhost:3006/teste', itens)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('Erro ao adicionar usuário', error);
    });
};

// function loadItens() {
//   itens = getItensBD()
//   tbody.innerHTML = ''
//   itens.forEach((item, index) => {
//     insertItem(item, index)
//   })

// }

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

// loadItens()



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
