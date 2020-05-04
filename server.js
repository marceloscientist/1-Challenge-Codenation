'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const router = express.Router();

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);

const index = require('./src/routes/index');
const createAnswer = require('./src/routes/createAnswer');

app.use('/', index);
app.use('/answer', createAnswer);

server.listen(port);
console.log('API rodando na porta ' + port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;

}


// https://www.youtube.com/watch?v=6iZiqQZBQJY
// https://www.youtube.com/watch?v=pzpRrRDEArI
// https://www.youtube.com/watch?v=egV9KattCvY&list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn&index=5


