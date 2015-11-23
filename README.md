# Eldritch Landing Page
[Eldritch's landing page](http://eldritch.io), a simple node.js app.

## Setup and Running
Make sure you have [node.js](https://nodejs.org) installed, then:
```sh
$ npm install
```

This app uses a [Postgres](http://www.postgresql.org/) database to store email
signups. You'll need to setup an instance of Postgres somewhere, and set the
``LANDING_DSN`` environment variable to point to it:
```sh
$ export LANDING_DSN="postgres://username:password@host/dbname"
```

You'll also need to tell the app what port to run on.  You can set this with the
``LANDING_PORT`` environment variable:
```sh
$ export LANDING_PORT=5000
```

Then, after making sure Postgres is running and accessible:
```sh
$ npm start
```

