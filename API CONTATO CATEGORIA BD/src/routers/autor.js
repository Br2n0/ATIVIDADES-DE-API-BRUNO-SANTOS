const express = require('express');
const router = express.Router();

router.get('/autor', function(req,res){
    const info = {
        autor: "Bruno Santos Ferreira",
        email: "brunosfe.info@gmail.com",
        telefone: "00 0000-0000"
    };
    res.json(info);
    return res.send("Autor: BRUNO SANTOS FERREIRA");
});

module.exports = router;