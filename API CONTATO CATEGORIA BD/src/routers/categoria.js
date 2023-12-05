const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

// Rota para mostrar informações de uma categoria específica
router.get('/categoria/:codigo', categoriaController.show);

// Rota para listar todas as categorias
router.get('/categoria', categoriaController.list);

// Rota para criar uma nova categoria
router.post('/categoria', categoriaController.create);

// Rota para atualizar uma categoria existente
router.put('/categoria/:codigo', categoriaController.update);

// Rota para excluir uma categoria
router.delete('/categoria/:codigo', categoriaController.destroy);

module.exports = router;
