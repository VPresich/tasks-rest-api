import Column from '../models/column.js';
import Board from '../models/board.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from './ctrlWrapper.js';

const checkColumnAndBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const column = await Column.findById(id);
  if (!column) {
    throw HttpError(404, 'Column not found');
  }
  const board = await Board.findById(column.board);
  if (!board) {
    throw HttpError(404, 'Board not found');
  }

  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not authorized to access this board');
  }
  req.column = column;
  req.board = board;
  next();
});

export default checkColumnAndBoard;
