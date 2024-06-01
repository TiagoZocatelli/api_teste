const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'exemplo_db'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para receber dados do frontend e inserir no banco
router.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  const insertQuery = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
  db.query(insertQuery, [nome, email], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      return res.status(500).send('Erro no servidor');
    }

    res.send('Dados inseridos com sucesso');
  });
});

// Rota para ler dados dos usuários
router.get('/usuarios', (req, res) => {
  const selectQuery = 'SELECT * FROM usuarios';
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      return res.status(500).send('Erro no servidor');
    }

    res.json(results);
  });
});

module.exports = router;
