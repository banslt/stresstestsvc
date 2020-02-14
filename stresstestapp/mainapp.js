const stresscpu = require("./stresscpu");
const stressmem = require("./stressmem");
const express = require('express')
const app = express()
 

app.get('/', function (req, res) {
  res.send('Welcome')
})

app.get('/stresscpu/:sleeptime/:stressTimeDuration', function (req, res) {
  let sleeptime= req.params.sleeptime;
  let stressTimeDuration= req.params.stressTimeDuration;
  new stresscpu(sleeptime,stressTimeDuration);
  res.send(`CPU load done: sleeptime= ${sleeptime} useconds, stressTimeDuration= ${stressTimeDuration} seconds `);
})

app.get('/stressmem/:loadAmount/:allocStep/:stressTimeDuration', function (req, res) {
  let loadAmount= req.params.loadAmount;
  let allocStep= req.params.allocStep;
  let stressTimeDuration= req.params.stressTimeDuration;
  new stressmem(loadAmount,allocStep,stressTimeDuration);
  res.send(`Mem load done: loadAmount= ${loadAmount} Go, stressTimeDuration= ${stressTimeDuration} seconds `);
}) 

const server =app.listen(3100);
server.timeout= 1000;