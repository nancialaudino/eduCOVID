var express = require('express');
var router = express.Router();
var conteudosModel = require("../Models/conteudosModel");


router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    let result = await conteudosModel.getConteudo(id);
    res.status(result.status).send(result.data);
});

router.post('/:id/visto', async function(req, res, next) {
    let id = req.params.id;
    let body = req.body;
    body.id_conteudo = id;
    let result = await conteudosModel.conteudoVisto(body);
    res.status(result.status).send(result.data);
  });


module.exports = router;