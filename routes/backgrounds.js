import express from 'express';

import backgroundsCtrl from '../controllers/backgroundsCtrls/index.js';
import authMiddleware from '../helpers/authMiddleware.js';

const backgroundRouter = express.Router();
backgroundRouter.get('/', authMiddleware, backgroundsCtrl.getAllBackgrounds);

export default backgroundRouter;
