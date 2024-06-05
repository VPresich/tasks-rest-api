import Board from '../models/board.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from './ctrlWrapper.js';

const checkBoard = ctrlWrapper(async (req, res, next) => {
  const { id: boardId } = req.params;
  const { id: userId } = req.user;

   const board = await Board.findById(boardId);
  if (!board) {
    throw HttpError(404, 'Board not found');
  }

  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not authorized to access this board');
  }
  req.board = board;
  next();
});

export default checkBoard;
