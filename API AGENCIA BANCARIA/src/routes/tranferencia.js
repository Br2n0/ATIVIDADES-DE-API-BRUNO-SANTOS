const express = require('express');
const transferController = require('../controllers/transfer.controller');

const router = express.Router();

router.get('/transferencias/:codigo', (req, res) => {
    transferController.getTransfer(req, res);
});

router.get('/transferencias', (req, res) => {
    transferController.listTransfers(req, res);
});

router.post('/transferencias', (req, res) => {
    transferController.createTransfer(req, res);
});

router.put('/transferencias/:codigo', (req, res) => {
    transferController.updateTransfer(req, res);
});

router.delete('/transferencias/:codigo', (req, res) => {
    transferController.deleteTransfer(req, res);
});

module.exports = router;
