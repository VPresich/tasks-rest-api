import express from 'express';
import boardsRouter from './boardsRouter.js';
import columnsRouter from './columnsRouter.js';
import tasksRouter from './tasksRouter.js';
import authRouter from './authRouter.js';
import themesRouter from './themesRouter.js';

const routers = express.Router();

routers.use('/boards', boardsRouter);
routers.use('/columns', columnsRouter);
routers.use('/users', authRouter);
routers.use('/themes', themesRouter);
routers.use('/tasks', tasksRouter);

export default routers;
