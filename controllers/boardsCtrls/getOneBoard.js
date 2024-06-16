import Board from '../../models/board.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getOneBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;

  const board = await Board.findById(id).populate(
    'owner',
    '_id name email avatarURL theme'
  );

  if (!board) {
    throw HttpError(404);
  }

  res.status(200).json(board);
});

export default getOneBoard;
