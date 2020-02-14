const stresscpu = require("./stresscpu");
const stressmem = require("./stressmem");
const express = require('express');
const package_info = require('./package.json');
const app = express();

app.get('/', function (req, res) {
  res.send('Welcome');
})

app.get('/work/:timeLoad', function (req, res) {
  let timeLoad= req.params.timeLoad;
  new stresscpu(timeLoad);
  res.send(`${package_info.version}`);
})

app.get('/wait/:waitDuration', function (req, res) {
  let waitDuration= req.params.waitDuration;
  new stresscpu(waitDuration);
  res.send(`${package_info.version}`);
})

app.get('/mem/:bytesLoad', function (req, res) {
  let bytesLoad= req.params.bytesLoad;
  new stressmem(bytesLoad);
  res.send(`${package_info.version}`);
}) 

const server =app.listen(3100);
server.timeout= 1000;