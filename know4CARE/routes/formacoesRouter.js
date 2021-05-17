
var express = require('express');
var router = express.Router();
var formacoesModel = require("../Models/formacoesModels");

router.get('/', async function(req, res, next) {
  let result = await formacoesModel.getAllFormacoes();
  res.status(result.status).send(result.data);
});

router.get('/formacao/:id', async function(req, res, next) {
  let id = req.params.id;
  let result = await formacoesModel.getFormacao(id);
  res.status(result.status).send(result.data);
});

module.exports = router;