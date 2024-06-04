import Column from '../../models/column.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const createColumn = ctrlWrapper(async (req, res, next) => {
  const { id } = req.board;
  const column = await Column.create({
    ...req.body,
    boardId: id,
  });
  res.status(201).json(board);
});

export default createBoard;
