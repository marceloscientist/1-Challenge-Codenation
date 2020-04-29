'use strict'

const express = require('express');
const router = express.Router();


const fs = require('fs');
let file = fs.readFileSync('answer.json');
let answer = JSON.parse(file);
const crypto = require('crypto');
const caeser = require("../../public/js/caeser");


const create = router.get('/create-answer', (req, res, next) => {

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

module.exports = create