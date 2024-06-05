import Board from '../../models/board.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const createBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;
  const board = await Board.create({
    ...req.body,
    owner: id,
  });
  res.status(201).json(board);
});

export default createBoard;
