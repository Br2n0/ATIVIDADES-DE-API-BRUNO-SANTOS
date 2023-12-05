const express = require('express');
const clienteController = require('../controllers/cliente.controller');

const router = express.Router();

router.get('/clientes', (req, res) => {
    clienteController.listClientes(req, res);
});

router.post('/clientes', (req, res) => {
    clienteController.createCliente(req, res);
});

router.put('/clientes/:codigo', (req, res) => {
    clienteController.updateCliente(req, res);
});

router.delete('/clientes/:codigo', (req, res) => {
    clienteController.destroyCliente(req, res);
});

module.exports = router;
