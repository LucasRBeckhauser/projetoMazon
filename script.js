window.onload = () => {
  const colunasUsuarios = ['nome', 'cnpj', 'endereco', 'telefone', 'email', 'tipo', 'id'];
  const colunasDoacoes = ['tipo', 'quantidade', 'disponibilidade', 'validade', 'id'];
  const colunasProdutos = ['nome', 'id'];

  carregarTabela('usuario', 'tabelaUsuarios', colunasUsuarios);
  carregarTabela('doacao', 'tabelaDoacoes', colunasDoacoes);
  carregarTabela('produto', 'tabelaProdutos', colunasProdutos);

  const usuarioForm = document.getElementById('usuarioForm');
  usuarioForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar(this, 'usuario');
  });

  const doacaoForm = document.getElementById('doacaoForm');
  doacaoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar(this, 'doacao');
  });

  const produtoForm = document.getElementById('produtoForm');
  produtoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar(this, 'produto');
  });

  const excluirForm = document.getElementById('excluirForm');
  excluirForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const tipo = this.tipoExcluir.value;
    const id = this.idExcluir.value;

    if (!tipo || !id) {
      alert('Por favor, selecione o tipo e insira o ID.');
      return;
    }

    const confirmacao = confirm('Tem certeza de que deseja excluir este registro?');

    if (confirmacao) {
      excluirRegistro(tipo, id);
    }
  });
};

function alertaPost(response) {
  if (response.status >= 200 && response.status < 300) {
    alert('Operação realizada com sucesso!');
    recarregarPagina();
  } else {
    alert('Erro na operação. Verifique o console para mais detalhes.');
    console.error(response);
  }
}

function cadastrar(form, endpoint) {
  const formData = new FormData(form);
  
  axios.post(`http://localhost:8080/${endpoint}`, Object.fromEntries(formData))
    .then(response => {
      alertaPost(response);
    })
    .catch(error => {
      console.error(`Erro ao realizar operação ${endpoint}:`, error);
    });
}

function carregarTabela(endpoint, tabelaId, colunas) {
  axios.get(`http://localhost:8080/${endpoint}`)
    .then(response => {
      const tabela = document.getElementById(tabelaId);
      const tbody = tabela.querySelector('tbody');
      tbody.innerHTML = "";

      response.data.forEach(item => {
        const row = document.createElement("tr");

        colunas.forEach(coluna => {
          const cell = document.createElement("td");

          if (coluna === "id") {
            row.setAttribute("data-id", item[coluna]);
          }

          cell.textContent = item[coluna];
          row.appendChild(cell);
        });

        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error(`Erro ao carregar tabela de ${endpoint}:`, error);
    });
}


//AXIOS DELETE
function excluirRegistro(tipo, id) {
  axios.delete(`http://localhost:8080/${tipo}/${id}`)
    .then(response => {
      alertaPost(response);
    })
    .catch(error => {
      console.error(`Erro ao excluir registro de ${tipo}:`, error);
      recarregarPagina()
    });
}

function recarregarPagina() {
  location.reload();
}
