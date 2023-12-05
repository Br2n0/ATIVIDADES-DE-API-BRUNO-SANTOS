const express = require('express');
const depositoController = require('../controllers/deposito.controller');

const router = express.Router();

router.get('/depositos', (req, res) => {
    depositoController.list(req, res);
});

router.get('/depositos/:codigo', (req, res) => {
    depositoController.show(req, res);
});

router.post('/depositos', (req, res) => {
    depositoController.create(req, res);
});

router.put('/depositos/:codigo', (req, res) => {
    depositoController.update(req, res);
});

router.delete('/depositos/:codigo', (req, res) => {
    depositoController.destroy(req, res);
});

module.exports = router;
