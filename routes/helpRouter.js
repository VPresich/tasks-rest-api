import express from 'express';
import validateBody from '../helpers/validateBody.js';
import sendSupportEmail from '../controllers/helpCtrls/sendSupportEmail.js';

import authMiddleware from '../helpers/authMiddleware.js';

const helpRouter = express.Router();

helpRouter.post('/', authMiddleware, sendSupportEmail);

export default helpRouter;
