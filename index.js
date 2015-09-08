var express     = require('express');
var favicon     = require('serve-favicon');
var pg          = require('pg');
var conString   = process.env.LANDING_DSN;
var validator   = require('validator');
var app         = express();

app.use(express.static('public'));

app.use(favicon(__dirname + '/images/favicon.ico'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.use(function(req, res){
  res.sendFile(__dirname + '/public/404.html');
});

app.use(function(error, req, res, next) {
  res.sendFile(__dirname + '/public/500.html');
});

var server = app.listen(5000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Magic happens at http://%s:%s', host, port);

  pgConnect();
});

function pgConnect() {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('Error fetching client from pool', err);
    }
  });
}
