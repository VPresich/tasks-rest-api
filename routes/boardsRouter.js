import express from 'express';
import validateBody from '../helpers/validateBody.js';
import boardsCtrl from '../controllers/boardsCtrls/index.js';
import checkBoard from '../helpers/checkBoard.js';
import {
  boardSchemaCreate,
  boardSchemaUpdate,
} from '../schemas/boardSchema.js';

import authMiddleware from '../helpers/authMiddleware.js';

const boardsRouter = express.Router();

boardsRouter.get('/', authMiddleware, boardsCtrl.getAllBoards);

boardsRouter.get('/:id', authMiddleware, checkBoard, boardsCtrl.getOneBoard);

boardsRouter.delete('/:id', authMiddleware, checkBoard, boardsCtrl.deleteBoard);

boardsRouter.post('/', authMiddleware, boardsCtrl.createBoard);

boardsRouter.get(
  '/:id/columns',
  authMiddleware,
  checkBoard,
  boardsCtrl.getAllColsForBoard
);

boardsRouter.post(
  '/:id/columns',
  authMiddleware,
  validateBody(boardSchemaCreate),
  checkBoard,
  boardsCtrl.createColumnForBoard
);

boardsRouter.patch(
  '/:id',
  authMiddleware,
  checkBoard,
  validateBody(boardSchemaUpdate),
  boardsCtrl.updateBoard
);

boardsRouter.get(
  '/:id/tasks',
  authMiddleware,
  checkBoard,
  boardsCtrl.getAllTasksForBoard
);

export default boardsRouter;
