import Column from '../../models/column.js';
import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const createColumnForBoard = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  const { id: userId } = req.user;

  // Check if the board exists
  const board = await Board.findById(boardId);
  if (!board) {
    throw HttpError(404, 'Board not found');
  }

  // Ensure the user is authorized to access of this board
  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not authorized to access this board');
  }

  // Create the new column
  const column = await Column.create({
    ...req.body,
    board: boardId,
  });

  res.status(201).json(column);
});

export default createColumnForBoard;
