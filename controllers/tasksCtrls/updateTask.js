import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const updateTask = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const updatedBoard = await Board.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedBoard) {
    throw HttpError(404);
  }
  if (!userId.equals(updatedBoard.owner)) {
    throw HttpError(403, 'You are not authorized to update this board');
  }
  res.status(200).json(updatedBoard);
});

export default updateTask;
