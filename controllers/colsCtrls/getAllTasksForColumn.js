import Board from '../../models/board.js';
import Column from '../../models/column.js';
import Task from '../../models/task.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAllTasksForColumn = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;

  // Fetch tasks associated with the column
  const tasks = await Task.find({ column: id }).populate('column', '_id title');

  res.status(200).json(tasks);
});

export default getAllTasksForColumn;
