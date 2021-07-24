import { Router } from 'express';
import services from '../services';
import entities from '../entities';
import * as validators from '../validators/task';
import config from '../config';

const router = Router();

router
  .route('/')
  .get((_req, res) => {
    const tasks = services.task.getAll();
    const entity = entities.task.collection(tasks);
    res.send(entity);
  })
  .post((req, res) => {
    const { body } = req;
    const task = validators.validateCreatePayload(body);
    const id = services.task.create(task);
    res
      .status(201)
      .location(config.hrefs.task(id))
      .send(entities.task.item(id, task));
  });

router
  .route('/:taskId')
  .get((req, res) => {
    const taskId = Number.parseInt(req.params.taskId);
    const task = services.task.getById(taskId);
    const entity = entities.task.item(taskId, task);
    res.send(entity);
  })
  .patch((req, res) => {
    const taskId = Number.parseInt(req.params.taskId);
    const task = services.task.getById(taskId);
    const { body } = req;
    const updatedTask = validators.validateUpdatePayload(task, body);
    services.task.update(taskId, updatedTask);
    res.send(entities.task.item(taskId, updatedTask));
  });

export default router;
