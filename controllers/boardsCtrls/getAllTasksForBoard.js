import Task from '../../models/task.js';
import Column from '../../models/column.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAllTasksForBoard = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const columns = await Column.find({ board: id });
  let allCards = [];

  for (const column of columns) {
    const cards = await Task.find({ column: column.id });
    allCards = allCards.concat(cards);
  }
  res.status(200).json(allCards);
});

export default getAllTasksForBoard;
