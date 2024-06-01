const express = require('express');
const path = require('path');

const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analisar o corpo das solicitações
app.use(express.json());

// Rota de exemplo para verificar se o servidor está funcionando
app.get('/api', (req, res) => {
  res.send('API está funcionando');
});

// Incluir rotas de usuários
app.use('/api', require('./api/usuarios'));

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
