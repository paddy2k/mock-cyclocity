var express = require('express');
var https = require('spdy');

var server = {
  config: null,
  start: function(config, app){
    this.config = config;

    var app = express();
    var server = https.createServer(config.sslOptions, app);
    server.listen(this.config.port);  

    console.log("Server listening @ https://localhost:" + config.port);

    return app;
  }
}

module.exports = server;