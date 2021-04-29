
var express = require('express');
var router = express.Router();
var userModel = require("../Models/usersModels");


/* login */
router.get('/login', async function(req, res, next) {
  let user = req.query;
  let result = await userModel.login(user);
  res.status(result.status).send(result.data);
});

module.exports = router;