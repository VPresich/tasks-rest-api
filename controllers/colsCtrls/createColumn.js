import Column from '../../models/column.js';
import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const createColumn = ctrlWrapper(async (req, res, next) => {
  const { id } = req.board;

  // Check if the board exists
  const board = await Board.findById(id);
  if (!board) {
    throw HttpError(404, 'Board not found');
  }

  // Create the new column
  const column = await Column.create({
    ...req.body,
    boardId: id,
  });

  res.status(201).json(column);
});

export default createColumn;
