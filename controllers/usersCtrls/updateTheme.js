import User from '../../models/user.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import HttpError from '../../helpers/HttpError.js';

const updateTheme = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  const { theme } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  user.theme = theme.toLowerCase();
  await user.save();
  res.json({ theme: user.theme });
});

export default updateTheme;
