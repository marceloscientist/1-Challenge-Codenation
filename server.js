'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const axios = require('axios').default;
const caeser = require("./public/js/caeser");
const crypto = require('crypto');




const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();
const index = require('./src/routes/index')

app.use('/',index)
const fs = require('fs');
let file = fs.readFileSync('answer.json');
let answer = JSON.parse(file);
let data = {}



const create = router.get('/create-answer', (req, res, next) => {

  file = fs.readFileSync('answer.json');
  let { numero_casas, token, cifrado, decifrado, resumo_criptografico } = JSON.parse(file);
  answer = {
    numero_casas,
    token,
    cifrado,
    decifrado: caeser.decrypt(cifrado, numero_casas),
    resumo_criptografico:
      crypto.createHash('sha1')
        .update(JSON.stringify(decifrado))
        .digest('hex')
  }
  res.json({ answer });

});
  /*
  
  const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                 .update('I love cupcakes')
                 .digest('hex');
console.log(hash);
  
  
  answer = JSON.stringify(data)
  fs.writeFile('answer.json', answer, (err)=>{
  console.log('success')
  res.json({data});
})*/




app.use('/', index);
app.use('/', create);


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