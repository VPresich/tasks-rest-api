import express from 'express';
import validateBody from '../helpers/validateBody.js';
import tasksCtrl from '../controllers/tasksCtrls/index.js';
import checkTask from '../helpers/checkTask.js';

import authMiddleware from '../helpers/authMiddleware.js';

const tasksRouter = express.Router();

tasksRouter.get('/:id', authMiddleware, checkTask, tasksCtrl.getOneTask);

tasksRouter.delete('/:id', authMiddleware, checkTask, tasksCtrl.deleteTask);

tasksRouter.patch('/:id', authMiddleware, checkTask, tasksCtrl.updateTask);

export default tasksRouter;
