import Column from '../../models/column.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const createColumnForBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params; //checked

  // Create the new column
  const column = await Column.create({
    ...req.body,
    board: id,
  });

  res.status(201).json(column);
});

export default createColumnForBoard;
