import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const updateBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedBoard = await Board.findByIdAndUpdate(
    id,
    { $set: req.body },
    {
      new: true,
    }
  );
  if (!updatedBoard) {
    throw HttpError(404);
  }
  res.status(200).json(updatedBoard);
});

export default updateBoard;
