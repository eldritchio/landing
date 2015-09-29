var express     = require('express');
var bodyParser  = require('body-parser');
var favicon     = require('serve-favicon');
var pg          = require('pg');
var conString   = process.env.LANDING_DSN;
var validator   = require('validator');
var app         = express();
var port        = process.env.LANDING_PORT;

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

start();

function start() {
  if (port) {
    var server = app.listen(port, function(err) {
      console.log('Magic happens on port %s', port);

      createSignupsTable();
    });
  } else {
    return console.error('Port undefined, set environment variable LANDING_PORT');
  }
}

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
