import express from 'express';
import validateBody from '../helpers/validateBody.js';
import boardsCtrl from '../controllers/boardsCtrls/index.js';

import authMiddleware from '../helpers/authMiddleware.js';

const boardsRouter = express.Router();

boardsRouter.get('/', authMiddleware, boardsCtrl.getAllBoards);

boardsRouter.get('/:id', authMiddleware, boardsCtrl.getOneBoard);

boardsRouter.delete('/:id', authMiddleware, boardsCtrl.deleteBoard);

boardsRouter.post('/', authMiddleware, boardsCtrl.createBoard);

boardsRouter.get(
  '/:boardId/columns',
  authMiddleware,
  boardsCtrl.getAllColsForBoard
);

boardsRouter.post(
  '/:boardId/columns',
  authMiddleware,
  boardsCtrl.createColumnForBoard
);

boardsRouter.patch(
  '/:id/background',
  authMiddleware,
  boardsCtrl.updateBoardBackGround
);

export default boardsRouter;
