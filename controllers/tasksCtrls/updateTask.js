import Task from '../../models/task.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const updateTask = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  if (!updatedTask) {
    throw HttpError(404, 'Task not found');
  }

  res.status(200).json(updatedTask);
});

export default updateTask;
