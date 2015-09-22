var express     = require('express');
var bodyParser  = require('body-parser');
var favicon     = require('serve-favicon');
var pg          = require('pg');
var conString   = process.env.LANDING_DSN;
var validator   = require('validator');
var app         = express();

app.use(express.static('public'));

app.use(favicon('public/images/favicon.ico'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.post('/submit', function(req, res) {
  addEmail(req.body.email);
  res.redirect('/');
});

app.use(function(req, res) {
  res.sendFile(__dirname + '/public/404.html');
});

app.use(function(error, req, res, next) {
  res.sendFile(__dirname + '/public/500.html');
});

var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Magic happens at http://%s:%s', host, port);

  createSignupsTable();
});

function createSignupsTable() {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('Error fetching client from pool', err);
    }

    client.query('CREATE TABLE IF NOT EXISTS signups (id serial PRIMARY KEY NOT NULL, email text NOT NULL);', function(err, res) {
      done();

      if(err) {
        return console.error('Error running query', err);
      }
    });
  });
}

function addEmail(email) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('Error fetching client from pool', err);
    }

    client.query('INSERT INTO signups (email) SELECT $1 WHERE NOT EXISTS (SELECT id FROM signups WHERE email = $1);', [email], function(err, res) {
      done();

      if(err) {
        return console.error('Error running query', err);
      }
    });
  });
}
