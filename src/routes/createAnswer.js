'use strict'
const express = require('express');
const router = express.Router();

const fs = require('fs');
let file = fs.readFileSync('answer.json');
let answer = JSON.parse(file);
const crypto = require('crypto');
const caeser = require("../../public/js/caeser");

router.get('/', (req, res, next) => {
  let data = {}
  let { numero_casas, token, cifrado, decifrado, resumo_criptografico } = JSON.parse(file);
  data = {
    numero_casas,
    token,
    cifrado,
    decifrado: caeser.decrypt(cifrado, numero_casas),
    resumo_criptografico:
      crypto.createHash('sha1')
        .update(JSON.stringify(decifrado))
        .digest('hex')
  }
  answer = JSON.stringify(data)
  fs.writeFile('answer.json', answer, () => {
    console.log('sucess');
    res.json({ data });
  })
});

module.exports = router