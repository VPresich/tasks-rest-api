import Board from '../../models/board.js';
import Column from '../../models/column.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAllColsForBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params; //checked

  // Fetch columns associated with the board
  const cols = await Column.find({ board: id }).populate(
    'board',
    '_id title background'
  );

  res.status(200).json(cols);
});

export default getAllColsForBoard;
