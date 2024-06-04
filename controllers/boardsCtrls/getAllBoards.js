import Board from '../../models/board.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAllBoards = ctrlWrapper(async (req, res, next) => {
  const { id: userId } = req.user;
  const boards = await Board.find({ owner: userId }).populate(
    'owner',
    '_id name email avatarUrl'
  );
  res.status(200).json(boards);
});

export default getAllBoards;
