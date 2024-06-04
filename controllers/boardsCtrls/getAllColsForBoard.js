import Board from '../../models/board.js';
import Column from '../../models/column.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAllColsForBoard = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  const { id: userId } = req.user;

  // Find the board to check the owner
  const board = await Board.findById(boardId);
  if (!board) {
    throw HttpError(404, 'Board not found');
  }

  // Ensure the user is authorized to access columns of this board
  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not authorized to access this board');
  }

  // Fetch columns associated with the board
  const cols = await Column.find({ board: boardId }).populate(
    'board',
    '_id title background'
  );

  res.status(200).json(cols);
});

export default getAllColsForBoard;
