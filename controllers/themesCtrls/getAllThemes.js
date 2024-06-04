import Theme from '../../models/theme.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAllThemes = ctrlWrapper(async (req, res, next) => {
  const themes = await Theme.find();
  res.json(themes);
  res.status(200).json(themes);
});

export default getAllThemes;
