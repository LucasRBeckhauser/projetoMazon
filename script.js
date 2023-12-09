// import { axios } from "axios";


// configurações do front end

const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');
let itens;
let id;

window.onload = () => {
  criarGet();
}

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
  id = undefined;

  axios.post('http://localhost:3006/teste', itens)
    .then(response => {
      alertaPost (response);
      criarGet();

    })
    .catch(error => {
      console.error('Erro ao adicionar usuário', error);
    });
};


const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))


function criarGet () {
axios.get('http://localhost:3006/teste')
.then(response => {
  chamaGet (response)
  console.log(response);
})
.catch(error => {
  console.error('Erro ao efetuar o get');
});
};

if (id) 
{
    // Se existe um ID, é uma atualização
    axios.put(`http://localhost:3006/teste/${id}`, novoItem)
      .then(response => {
        alertaUpdate(response);
        criarGet();
      })
      .catch(error => {
        console.error('Erro ao atualizar usuário', error);
      });
}

function chamaGet (response) 
{
// Limpe o conteúdo atual da tabela
  tbody.innerHTML = '';

  // Adicione os novos dados à tabela
  response.data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.funcao}</td>
      <td>${item.salario}</td>
    `;
    tbody.appendChild(tr);
  });

}

function alertaPost (response) {
  console.log (response)
  alert ('Operação efetuada com sucesso.')
}

