const express = require('express');
const contaController = require('../controllers/conta.controller');

const router = express.Router();

router.get('/contas', (req, res) => {
    contaController.list(req, res);
});

router.get('/contas/:codigo', (req, res) => {
    contaController.show(req, res);
});

router.post('/contas', (req, res) => {
    contaController.create(req, res);
});

router.put('/contas/:codigo', (req, res) => {
    contaController.update(req, res);
});

router.delete('/contas/:codigo', (req, res) => {
    contaController.destroy(req, res);
});

module.exports = router;
