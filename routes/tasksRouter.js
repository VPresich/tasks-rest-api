import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { taskSchemaUpdate } from '../schemas/taskSchema.js';
import tasksCtrl from '../controllers/tasksCtrls/index.js';
import checkTask from '../helpers/checkTask.js';
import checkMoveColumnId from '../helpers/checkMoveColumnId.js';

import authMiddleware from '../helpers/authMiddleware.js';

const tasksRouter = express.Router();

tasksRouter.get('/:id', authMiddleware, checkTask, tasksCtrl.getOneTask);

tasksRouter.delete('/:id', authMiddleware, checkTask, tasksCtrl.deleteTask);

tasksRouter.patch(
  '/:id',
  authMiddleware,
  checkTask,
  validateBody(taskSchemaUpdate),
  checkMoveColumnId,
  tasksCtrl.updateTask
);

export default tasksRouter;
