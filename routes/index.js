import express from 'express';
import boardsRouter from './boardsRouter.js';
import authRouter from './authRouter.js';

const routers = express.Router();

routers.use('/boards', boardsRouter);
routers.use('/users', authRouter);

export default routers;
