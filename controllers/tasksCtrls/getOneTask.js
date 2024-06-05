import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getOneTask = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;

  res.status(200).json(req.task);
});

export default getOneTask;
