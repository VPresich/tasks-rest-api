import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getOneBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const board = await Board.findById(id).populate(
    'owner',
    '_id name email avatarUrl'
  );
  if (!board) {
    throw HttpError(404);
  }
  if (!userId.equals(board.owner._id)) {
    throw HttpError(403, 'You are not authorized to access this contact');
  }
  res.status(200).json(board);
});

export default getOneBoard;
