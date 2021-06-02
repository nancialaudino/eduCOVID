
var express = require('express');
var router = express.Router();
var userModel = require("../Models/usersModels");


/* login */
router.get('/login', async function(req, res, next) {
  let user = req.query;
  let result = await userModel.login(user);
  res.status(result.status).send(result.data);
});

router.get('/formandos', async function(req, res, next) {
  let result = await userModel.loadFormandos();
  res.status(result.status).send(result.data);
});

router.post('/formandos/novo', async function(req, res, next) {
  let body = req.body;
  let result = await userModel.addFormando(body);
  res.status(result.status).send(result.data);
});

router.delete('/formandos/:id/remover', async function(req, res, next) {
  let id = req.params.id;
  let result = await userModel.removerFormando(id);
  res.status(result.status).send(result.data);
});

router.put('/formandos/:id/editar', async function(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  body.id = id;
  let result = await userModel.editarFormando(body);
  res.status(result.status).send(result.data);
});

router.get('/formandos/:id', async function(req, res, next) {
  let id = req.params.id;
  let result = await userModel.getByIdFormando(id);
  res.status(result.status).send(result.data);
});

router.get('/formandos/:id/formacoes', async function(req, res, next) {
  let id = req.params.id;
  let result = await userModel.getFormacoesUtilizador(id);
  res.status(result.status).send(result.data);
});

module.exports = router;