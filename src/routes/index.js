'use strict'

const express = require('express');
const router = express.Router();

const axios = require('axios').default;

const fs = require('fs');
let file = fs.readFileSync('answer.json');
let answer = JSON.parse(file);
let data = {}

router.get('/', (req, res, next) => {
    axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=593785d09c700e4b270eb6572181eea4a8538cd2')
      .then(response => {
        data = response.data;
        answer = JSON.stringify(data)
        fs.writeFile('answer.json', answer, (err) => {
          console.log('success')
          res.json({ data });
        })
      })
      .catch(error => {
        console.log(error);
      })
  });
  
  module.exports = router