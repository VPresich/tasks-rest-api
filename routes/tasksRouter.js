import express from 'express';
import validateBody from '../helpers/validateBody.js';
import tasksCtrl from '../controllers/tasksCtrls/index.js';

import authMiddleware from '../helpers/authMiddleware.js';

const tasksRouter = express.Router();

tasksRouter.get('/:id', authMiddleware, tasksCtrl.getOneTask);

tasksRouter.delete('/:id', authMiddleware, tasksCtrl.deleteTask);

tasksRouter.patch('/', authMiddleware, tasksCtrl.updateTask);

export default tasksRouter;
