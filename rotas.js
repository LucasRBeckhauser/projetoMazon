const express = require('express');
const cors = require ('cors')
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3006;

app.use(cors())


// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projeto_mazon',
});



// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Configurar o middleware para analisar solicitações JSON
app.use(bodyParser.json());

// Rotas CRUD

// Criar um novo registro
app.post('/teste', (req, res) => {
  const { nome, funcao, salario } = req.body;
  const INSERT_TESTE_QUERY = `INSERT INTO teste (nome, funcao, salario) VALUES (?, ?, ?)`;

  db.query(INSERT_TESTE_QUERY, [nome, funcao, salario], (err, results) => {
    if (err) {
      console.error('Erro ao inserir o registro:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.status(201).send('Registro inserido com sucesso');
    }
  });
});

// Obter todos os registros
app.get('/teste', (req, res) => {
  const SELECT_TESTE_QUERY = 'SELECT * FROM teste';

  db.query(SELECT_TESTE_QUERY, (err, results) => {
    if (err) {
      console.error('Erro ao obter os registros:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.json(results);
    }
  });
});

// Atualizar um registro existente
app.put('/teste/:id', (req, res) => {
  const { id } = req.params;
  const { nome, funcao, salario } = req.body;
  const UPDATE_TESTE_QUERY = 'UPDATE teste SET nome=?, funcao=?, salario=? WHERE id=?';

  db.query(UPDATE_TESTE_QUERY, [nome, funcao, salario, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.status(200).send('Registro atualizado com sucesso');
    }
  });
});

// Excluir um registro
app.delete('/teste/:id', (req, res) => {
  const { id } = req.params;
  const DELETE_TESTE_QUERY = 'DELETE FROM teste WHERE id=?';

  db.query(DELETE_TESTE_QUERY, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.status(200).send('Registro excluído com sucesso');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
