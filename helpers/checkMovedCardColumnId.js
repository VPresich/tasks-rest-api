import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from './ctrlWrapper.js';

const checkMovedCardColumnId = ctrlWrapper(async (req, res, next) => {
  const { column: moveColumnId } = req.body;
  const { _id: boardId } = req.board; // from previous middleware

  let board = null;

  try {
    board = await Board.findById(boardId);

    if (!board) {
      throw HttpError(404, 'Board not found');
    }
  } catch {
    throw HttpError(404, 'Board not found');
  }

  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not authorized to access this board');
  }
  req.board = board;
  next();
});

export default checkMovedCardColumnId;
