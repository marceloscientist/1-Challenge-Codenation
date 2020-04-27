'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const axios = require('axios').default;
const caeser= require("./public/js/caeser");

const app = express();
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();
let decifrado = '';

const route = router.get('/', (req,res,next) => { 
    axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=593785d09c700e4b270eb6572181eea4a8538cd2')
  .then(function (response) {
    decifrado = caeser.decrypt(response.data.cifrado, response.data.numero_casas);
    res.send(decifrado);
  })
  .catch(function (error) {
       console.log(error);
  })
});

app.use('/', route);

server.listen(port); 
console.log('API rodando na porta ' + port);

