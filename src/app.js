const express = require('express');
const path = require('path');
const routes = require('./routes');

/**
 * Configuração central da aplicação Express.
 * Serve o front-end estático (public/) e expõe a API REST (routes/).
 */
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(routes);

module.exports = app;
