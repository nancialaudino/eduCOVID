var express = require('express');
var router = express.Router();
var conteudoModel = require("../Models/conteudoModel");


router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    let result = await conteudoModel.getConteudo(id);
    res.status(result.status).send(result.data);
});


module.exports = router;