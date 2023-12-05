const express = require('express');
const app = express();

// Importação dos arquivos de configuração de rotas
const baseRouter = require('./routers/base');
const contatoRouter = require('./routers/contato');
const autorRouter = require('./routers/autor');
const categoriaRouter = require('./routers/categoria');

app.use(express.json());

// Definindo EndPoints (Rotas)
// Rota Principal
app.use(baseRouter);

// Rota retorno autor
app.use(autorRouter);

// Rota Contatos
app.use(contatoRouter);

// Rota Categorias
app.use(categoriaRouter);

// Iniciando a Aplicação na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`API iniciada na porta ${PORT}`);
});
