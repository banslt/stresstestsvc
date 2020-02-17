const stresscpu = require("./stresscpu");
const stressmem = require("./stressmem");
const express = require('express');
const package_info = require('./package.json');
const credentials = require('./cred.json');
const influx_metrics = require('metrics-influxdb');
const app = express();

const options = {
  host: credentials.host,
  port: 8086,
  protocol: "http",
  username: credentials.username,
  password: credentials.password,
  database: "telegraf",
  callback(error) {
    if (error) {
        console.log("Sending data to InfluxDB failed: ", error);
    }
  }
}

const reporter = new influx_metrics.Reporter(options);
const request_nb = new influx_metrics.Counter();
reporter.addMetric('app.request_nb', request_nb);
request_nb.inc();

app.get('/', function (req, res) {
  res.send('Welcome');
})

app.get('/work/:timeLoad', function (req, res) {
  let timeLoad= req.params.timeLoad;
  new stresscpu(timeLoad);
  request_nb.inc();
  res.send(`${package_info.version}`);
})

app.get('/wait/:waitDuration', function (req, res) {
  let waitDuration= req.params.waitDuration;
  new stresscpu(waitDuration);
  request_nb.inc();
  res.send(`${package_info.version}`);
})

app.get('/mem/:bytesLoad', function (req, res) {
  let bytesLoad= req.params.bytesLoad;
  new stressmem(bytesLoad);
  request_nb.inc();
  res.send(`${package_info.version}`);
}) 

const server =app.listen(3100);
server.timeout= 1000;

reporter.report();
reporter.start(1000);
