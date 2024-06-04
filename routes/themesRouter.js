import express from 'express';
import validateBody from '../helpers/validateBody.js';
import themesCtrl from '../controllers/themesCtrls/index.js';

import authMiddleware from '../helpers/authMiddleware.js';

const themesRouter = express.Router();

themesRouter.get('/', authMiddleware, themesCtrl.getAllThemes);

export default themesRouter;
