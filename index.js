var express = require('express'),
    pem = require('pem'),
    https = require('spdy'),
    socket = require('socket.io'),
    config = require('./config');

var app = express();

// Create certificates and run HTTPS server
pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
    config.sslOptions.key = keys.serviceKey;
    config.sslOptions.cert = keys.certificate;

    var server = https.createServer(config.sslOptions, app);
    server.listen(config.port);
});

app.get('/', function(request, response){
  response.end('AARG2222E');
})
console.log("Server listening on: https://localhost:" + config.port);