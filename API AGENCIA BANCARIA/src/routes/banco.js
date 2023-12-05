const express = require('express');
const bancoController = require('../controllers/banco.controller');

const router = express.Router();

router.get('/banco', (req, res) => {
    bancoController.list(req, res);
});

router.post('/banco', (req, res) => {
    bancoController.create(req, res);
});

router.put('/banco/:codigo', (req, res) => {
    bancoController.update(req, res);
});

router.delete('/banco/:codigo', (req, res) => {
    bancoController.destroy(req, res);
});

module.exports = router;
