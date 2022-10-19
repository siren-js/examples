# To-Do List API

This folder contains a simple to-do list API.

The [profile](public/profile.xhtml) describes the API's application semantics and is served at `/profile`.

## Setup

```bash
# install dependencies
$ npm install

# setup env vars
$ cp .env.example .env
```

## Running the app

```bash
# start database
$ docker-compose up --detach

# development
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm test

# watch mode
$ npm run test:watch

# test coverage
$ npm run test:cov

# e2e tests
$ npm run test:e2e
```
