import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getTheme = ctrlWrapper(async (req, res, next) => {
  const { id, theme } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw HttpError(401);
  }
  if (!user.theme) {
    throw HttpError(404, 'Theme not found');
  }
  res.status(200).json({ theme });
});

export default getTheme;
