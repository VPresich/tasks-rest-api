import Column from '../models/column.js';
import Board from '../models/board.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from './ctrlWrapper.js';

const checkColumnAndBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  let column = null;
  let board = null;
  try {
    column = await Column.findById(id);
    if (!column) {
      throw HttpError(404, 'Column not found');
    }
    board = await Board.findById(column.board);
    if (!board) {
      throw HttpError(404, 'Board not found');
    }
  } catch {
    throw HttpError(404, 'Board or Column not found');
  }

  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not the owner of this column');
  }
  req.column = column;
  req.board = board;
  next();
});

export default checkColumnAndBoard;
