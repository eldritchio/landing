var express     = require('express');
var app         = express();

app.use(express.static('public'));

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
});

