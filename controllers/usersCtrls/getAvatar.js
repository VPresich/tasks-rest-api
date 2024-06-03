import Jimp from 'jimp';
import path from 'node:path';
import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getAvatar = ctrlWrapper(async (req, res, next) => {
  const { id, avatarURL } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw HttpError(401);
  }
  if (!user.avatarURL) {
    throw HttpError(404, 'Avatar not found');
  }

  if (avatarURL.includes('gravatar')) {
    return res.redirect(avatarURL);
  }

  const avatarDir = path.resolve('public', avatarURL);
  res.status(200).sendFile(avatarDir);
});

export default getAvatar;
