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

const fs = require('fs');
let file = fs.readFileSync('answer.json');
let answer = JSON.parse(file);

const route = router.get('/', (req,res,next) => { 
    axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=593785d09c700e4b270eb6572181eea4a8538cd2')
    .then(response => {
      let data = response.data;
      answer = JSON.stringify(data)
    fs.writeFile('answer.json', answer, (err)=>{
        console.log('success')
    })
    })
    .catch(error => {
         console.log(error);
    })
  
    
    

  res.send('ok');
});

app.use('/', route);

server.listen(port); 
console.log('API rodando na porta ' + port);

// https://www.youtube.com/watch?v=6iZiqQZBQJY