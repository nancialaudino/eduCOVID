var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/usersRouter');
var formacoesRouter = require('./routes/formacoesRouter');
var conteudosRouter = require('./routes/conteudosRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/formacoes', formacoesRouter);
app.use('/api/conteudos', conteudosRouter);

module.exports = app;
