const http = require('http');
const host_infos = require("./host-infos.json")
const options = {
    host: host_infos.host,
    port: host_infos.port,
    path: '/write?precision=ms',
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  };

  module.exports = function (postData){
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();

}
