import config from './config';

import cors from 'cors';
import express from 'express';

import routers from './routers';

express()
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))
  .use((_req, res, next) => {
    res.type('application/vnd.siren+json');
    next();
  })
  .use('/tasks', routers.task)
  .listen(config.port, () => {
    console.log(`server running on port ${config.port}`);
  });
