'use strict';

var pem = require('pem'),
    fs = require('fs'),
    server = require('./server'),
    config = require('./config');

var app;
var keyName = config.domain.replace('.','_') + '.key', keyFile;
var certName = config.domain.replace('.','_') + '.cert', certFile;

if(!fs.existsSync(keyName) || !fs.existsSync(certName) ){
  console.log("== Generating SSL Cert & Key ==");

  // Create new keys
  pem.createCertificate({days:30, selfSigned:true}, function(err, keys){
    config.sslOptions.key = keys.serviceKey;
    config.sslOptions.cert = keys.certificate;

    // Write  new cert & key
    fs.writeFileSync(keyName, config.sslOptions.key);
    fs.writeFileSync(certName, config.sslOptions.cert);
    
    app = server.start(config);
  });

}
else {
  // Read existing keys
  config.sslOptions.key = fs.readFileSync(keyName);
  config.sslOptions.cert = fs.readFileSync(certName);

  app = server.start(config);
}

//vls/v1/stations?contract={contract_name}&apiKey={api_key}
app.get('/vls/v1/stations', function(req, res){
  
});

//vls/v1/stations?contract={contract_name}&apiKey={api_key}
app.get('/vls/v1/stations/:id', function(req, res){
  
});