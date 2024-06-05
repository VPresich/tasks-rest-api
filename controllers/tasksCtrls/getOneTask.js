import Column from '../../models/column.js';
import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getOneTask = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  // Find the column and populate board details
  const column = await Column.findById(id).populate(
    'boardId',
    '_id title background'
  );
  if (!column) {
    throw HttpError(404, 'Column not found');
  }

  const { boardId } = column;

  // Find the board to check the owner
  const board = await Board.findById(boardId);
  if (!board) {
    throw HttpError(404, 'Board not found');
  }

  // Ensure the user is authorized to delete this column
  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not authorized to remove this column');
  }

  // Ensure the user is authorized to access this column
  if (!userId.equals(boardId.owner)) {
    throw HttpError(403, 'You are not authorized to access this column');
  }

  res.status(200).json(column);
});

export default getOneTask;
