const express = require('express');
const saqueController = require('../controllers/saque.controller');

const router = express.Router();

router.get('/saques/:codigo', (req, res) => {
    saqueController.displaySaque(req, res);
});

router.get('/saques', (req, res) => {
    saqueController.listSaque(req, res);
});

router.post('/saques', (req, res) => {
    saqueController.createSaque(req, res);
});

router.put('/saques/:codigo', (req, res) => {
    saqueController.updateSaque(req, res);
});

router.delete('/saques/:codigo', (req, res) => {
    saqueController.removeSaque(req, res);
});

module.exports = router;
