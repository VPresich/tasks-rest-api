import Task from '../models/task.js';
import Column from '../models/column.js';
import Board from '../models/board.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const checkTask = ctrlWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const { id: userId } = req.user;

  const task = await Task.findById(taskId).populate('column', '_id title');
  if (!task) {
    throw HttpError(404, 'Task not found');
  }

  const column = await Column.findById(task.column);
  if (!column) {
    throw HttpError(404, 'Column not found');
  }

  const board = await Board.findById(column.board);
  if (!board) {
    throw HttpError(404, 'Board not found');
  }

  if (!userId.equals(board.owner)) {
    throw HttpError(403, 'You are not authorized to access this task');
  }

  req.task = task;
  req.column = column;
  req.board = board;

  next();
});

export default checkTask;
