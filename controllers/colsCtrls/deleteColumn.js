import Task from '../../models/task.js';
import Column from '../../models/column.js';
import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const deleteColumn = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params; // checked in middleware

  // Delete tasks associated with the column
  await Task.deleteMany({ column: id });

  // Delete the column
  const removedColumn = await Column.findByIdAndDelete(id);

  // Send response with the deleted column
  res.status(200).json(removedColumn);
});

export default deleteColumn;
