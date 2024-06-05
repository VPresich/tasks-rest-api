import Task from '../../models/task.js';
import Column from '../../models/column.js';
import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const deleteTask = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params; //id column
  const { id: userId } = req.user;

  // Find the column to be removed
  const removedColumn = await Column.findById(id);
  if (!removedColumn) {
    throw HttpError(404, 'Column not found');
  }

  const { boardId } = removedColumn;

  // Find the board to check the owner
  const board = await Board.findById(boardId);
  if (!board) {
    throw HttpError(404, 'Board not found');
  }

  // Ensure the user is authorized to delete this column
  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not authorized to remove this column');
  }

  // Delete tasks associated with the column
  await Task.deleteMany({ columnId: id });

  // Delete the column
  await Column.findByIdAndDelete(id);

  // Send response with the deleted column details
  res.status(200).json(removedColumn);
});

export default deleteTask;
