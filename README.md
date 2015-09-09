# Eldritch Landing Page
[Eldritch landing page](http://eldritch.io), a simple node.js app.

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

Then, after making sure Postgres is running and accessible:
```sh
$ npm start
```

