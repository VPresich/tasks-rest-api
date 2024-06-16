import Background from '../../models/background.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAllBackgrounds = ctrlWrapper(async (req, res, next) => {
  const { id: userId } = req.user;
  const bgrs = await Background.find();
  res.status(200).json(bgrs);
});

export default getAllBackgrounds;
