import Column from '../../models/column.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const updateColumn = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedColumn = await Column.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedColumn) {
    throw HttpError(404);
  }
  res.status(200).json(updatedColumn);
});

export default updateColumn;
