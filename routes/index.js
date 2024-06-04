import express from 'express';
import boardsRouter from './boardsRouter.js';
import authRouter from './authRouter.js';
import themesRouter from './themesRouter.js';

const routers = express.Router();

routers.use('/boards', boardsRouter);
routers.use('/users', authRouter);
routers.use('/themes', themesRouter);

export default routers;
