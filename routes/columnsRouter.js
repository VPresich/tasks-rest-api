import express from 'express';
import validateBody from '../helpers/validateBody.js';
import colsCtrl from '../controllers/colsCtrls/index.js';
import checkColumnAndBoard from '../helpers/checkColumnAndBoard.js';

import authMiddleware from '../helpers/authMiddleware.js';

const columnsRouter = express.Router();

columnsRouter.get(
  '/:id',
  authMiddleware,
  checkColumnAndBoard,
  colsCtrl.getOneColumn
);

columnsRouter.delete(
  '/:id',
  authMiddleware,
  checkColumnAndBoard,
  colsCtrl.deleteColumn
);

columnsRouter.patch(
  '/:id',
  authMiddleware,
  checkColumnAndBoard,
  colsCtrl.updateColumn
);

columnsRouter.post(
  '/:id/tasks',
  authMiddleware,
  checkColumnAndBoard,
  colsCtrl.createTaskForColumn
);

export default columnsRouter;
