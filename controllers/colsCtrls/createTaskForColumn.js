import Task from '../../models/task.js';
import Column from '../../models/column.js';
import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const createTaskForColumn = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params; //columnId
  // Create the new task
  const task = await Task.create({
    ...req.body,
    column: id,
  });

  res.status(201).json(task);
});

export default createTaskForColumn;
