import Column from '../models/column.js';
import HttpError from './HttpError.js';
import ctrlWrapper from './ctrlWrapper.js';

const checkMoveColumnId = ctrlWrapper(async (req, res, next) => {
  const { _id: boardId } = req.board; // from previous middelware;
  const { column: moveColumnId } = req.body;

  if (!moveColumnId) return next(); // not move
  const columns = await Column.find({ board: boardId });

  const isValidColumn = columns.some(
    column => column._id.toString() === moveColumnId
  );

  if (!isValidColumn) {
    throw HttpError(400, 'Bad column id');
  }
  next();
});

export default checkMoveColumnId;
