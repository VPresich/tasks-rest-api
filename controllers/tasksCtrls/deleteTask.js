import Task from '../../models/task.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const deleteTask = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const removedTask = await Task.findByIdAndDelete(id);
  // Send response with the deleted task
  res.status(200).json(removedTask);
});

export default deleteTask;
