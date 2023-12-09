const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
let btnSalvar = document.querySelector('#btnSalvar');
let itens;
let id;

let btnEditar = document.querySelectorAll(".btn-editar");

document.addEventListener("click", function() 
{
  openModal(); // abrir o modal
  const id = event.target.id; //pegar id do botão editar apertado
  btnSalvar.id = "btnAtualizar"; //mudar id do btnSalvar
  
  atualizarDados(id)
  //Continuar essa parte
  
})

function atualizarDados(id) //função para atualizar os dados salvos
{
  axios.patch(`http://localhost:3006/teste/${id}`)
  .then(response => 
  {
    console.log(response)
    alert ('Operação efetuada com sucesso.')
    
    .catch(error => 
    {
      console.error('Erro ao atualizar usuário', error);
    });
  })
}

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
      <td id="nome">${item.nome}</td>
      <td id="funcao">${item.funcao}</td>
      <td id="salario">${item.salario}</td>
      <td><button id="${item.id}" class="action-button btn-editar">editar</button></td>
      <td><button id="${item.id}" class="action-button btn-excluir">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });

}

function editItem()
{
 btnSalvar.onclickS
 
  //chamar o btn-editar e abrir o modal atraves da função openmodal()
  //pegar o valor do id do botão apertado rota/da/funçaõ/valorid
  //  const idbtn = valor do id
  //  axios.put(`http://localhost:3006/teste/${idbtn}`) exemplo de uso 
     
}


function alertaPost (response) {
  console.log (response)
  alert ('Operação efetuada com sucesso.')
}

