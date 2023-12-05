const express = require('express');
const app = express();

// rotas importadas
const agenciaRouter = require('./routes/agencia.router');
const bancoRouter = require('./routes/banco.router');
const clienteRouter = require('./routes/cliente.router');
const contaRouter = require('./routes/conta.router');
const depositoRouter = require('./routes/deposito.router');
const saqueRouter = require('./routes/saque.router');
const transferenciaRouter = require('./routes/transferencia.router');

// Usando as rotas no aplicativo
app.use(agenciaRouter);
app.use(bancoRouter);
app.use(clienteRouter);
app.use(contaRouter);
app.use(depositoRouter);
app.use(saqueRouter);
app.use(transferenciaRouter);

// porta em que o servidor vai abrir
app.listen(3000, function () {
    console.log('API iniciada na porta: 3000');
  });

  //ALUNO BRUNO SANTOS