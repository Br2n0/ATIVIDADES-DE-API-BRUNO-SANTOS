const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contato.controller');

// Rota para mostrar informações de um contato específico
router.get('/contato/:codigo', contatoController.show);

// Rota para listar todos os contatos
router.get('/contato', contatoController.list);

// Rota para criar um novo contato
router.post('/contato', contatoController.create);

// Rota para atualizar um contato existente
router.put('/contato/:codigo', contatoController.update);

// Rota para excluir um contato
router.delete('/contato/:codigo', contatoController.destroy);

module.exports = router;
