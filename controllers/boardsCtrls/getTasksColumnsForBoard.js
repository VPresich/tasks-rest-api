import Task from '../../models/task.js';
import Column from '../../models/column.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getTasksColumnsForBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;

  const columns = await Column.find({ board: id });

  let allColumns = [];
  for (const column of columns) {
    const tasks = await Task.find({ column: column._id });

    const colWithTasks = { ...column.toObject(), tasks };

    allColumns.push(colWithTasks);
  }

  res.status(200).json(allColumns);
});

export default getTasksColumnsForBoard;
