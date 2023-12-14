const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
let btnSalvar = document.querySelector('#btnSalvar');
let id;

window.onload = () => {
    criarGet();
}

function cadastrar() {
    const novoItem = {
        'nome': sNome.value,
        'funcao': sFuncao.value,
        'salario': sSalario.value
    };

    axios.post('http://localhost:3006/teste', novoItem)
        .then(response => {
            alertaPost(response);
            criarGet();
        })
        .catch(error => {
            console.error('Erro ao adicionar usuário', error);
        });
}

function criarGet() {
    axios.get('http://localhost:3006/teste')
        .then(response => {
            chamaGet(response);
        })
        .catch(error => {
            console.error('Erro ao efetuar o get');
        });
};

function chamaGet(response) {
    // Limpe o conteúdo atual da tabela
    tbody.innerHTML = '';

    // Adicione os novos dados à tabela
    response.data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.funcao}</td>
            <td>${item.salario}</td>
            <td><button id="${item.id}" class="action-button btn-editar" onclick="editItem(${item.id})">Editar</button></td>
            <td><button id="${item.id}" class="action-button btn-excluir" onclick="excluirItem(${item.id})">Excluir</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function editItem(itemId) {
    // Implemente a lógica para edição do item pelo ID, se necessário
    console.log(`Editar item com ID: ${itemId}`);
}

function excluirItem(itemId) {
    // Implemente a lógica para excluir o item pelo ID
    // Exemplo: axios.delete(`http://localhost:3006/teste/${itemId}`).then(response => criarGet());
    console.log(`Excluir item com ID: ${itemId}`);
}

function alertaPost(response) {
    console.log(response);
    alert('Operação efetuada com sucesso.');
}