const express = require('express');
const agenciaController = require('../controllers/agencia.controller');

const router = express.Router();

router.get('/agencia', (req, res) => {
    agenciaController.list(req, res);
});

router.post('/agencia', (req, res) => {
    agenciaController.create(req, res);
});

router.put('/agencia/:codigo', (req, res) => {
    agenciaController.update(req, res);
});

router.delete('/agencia/:codigo', (req, res) => {
    agenciaController.destroy(req, res);
});

module.exports = router;
