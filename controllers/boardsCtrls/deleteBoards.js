import Board from '../../models/board.js';
import Task from '../../models/task.js';
import Column from '../../models/column.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const deleteBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const removedBoard = await Board.findById(id);
  if (!removedBoard) {
    throw HttpError(404);
  }

  if (!userId.equals(removedBoard.owner)) {
    throw HttpError(403, 'You are not authorized to remove this board');
  }

  const columns = await Column.find({ board: id });
  const taskIds = columns.flatMap(column => column.cards);
  await Task.deleteMany({ _id: { $in: taskIds } });
  await Column.deleteMany({ board: id });
  await Board.findByIdAndDelete(id);
  res.status(200).json(removedBoard);
});

export default deleteBoard;
