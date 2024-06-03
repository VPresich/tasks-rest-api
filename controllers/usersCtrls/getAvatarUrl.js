import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAvatarUrl = ctrlWrapper(async (req, res, next) => {
  const { id, avatarURL } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw HttpError(401);
  }
  if (!user.avatarURL) {
    throw HttpError(404, 'Avatar not found');
  }
  res.status(200).json({ avatarURL });
});

export default getAvatarUrl;
