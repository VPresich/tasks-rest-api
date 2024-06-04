import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const deleteBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const removedBoard = await Board.findByIdAndDelete(id);
  if (!removedBoard) {
    throw HttpError(404);
  }
  if (!userId.equals(removedBoard.owner)) {
    throw HttpError(403, 'You are not authorized to remove this board');
  }
  //TODO REMOVE COLUMNS and TASKS
  res.status(200).json(removedBoard);
});

export default deleteBoard;
