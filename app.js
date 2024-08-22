console.log('I am on a node server');

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Node from Express on Local Dev Box')
})

app.listen(5000)