import Jimp from 'jimp';
import path from 'node:path';
import fs from 'node:fs/promises';

import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import { AVATAR_SIZE_1 } from '../../helpers/constants.js';

const updateAvatar = ctrlWrapper(async (req, res, next) => {
  const { id, avatarURL: oldAvatarURL } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatarsDir = path.resolve('public', 'avatars');

  // Create unique avatars name for the user
  const avatarName = `${id}avatar${path.extname(originalname)}`;

  // Avatars name with full path
  const resultUpload = path.resolve(avatarsDir, avatarName);

  // Change size of the user file
  await resizeImage(tempUpload, AVATAR_SIZE_1, AVATAR_SIZE_1);

  // Delete old avatar from dir
  await deleteAvatar(oldAvatarURL);

  // Move tempUpload to the avatars dir
  await fs.rename(tempUpload, resultUpload);

  // Change field in DB
  const avatarURL = path.join('avatars', avatarName);
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { avatarURL },
    { new: true }
  );
  if (!updatedUser) {
    throw HttpError(401);
  }
  res.status(200).json({
    avatarURL,
  });
});

async function deleteAvatar(oldAvatarURL) {
  if (oldAvatarURL && !oldAvatarURL.includes('gravatar')) {
    const oldAvatarFullName = path.resolve('public', oldAvatarURL);

    try {
      await fs.access(oldAvatarFullName);
      await fs.unlink(oldAvatarFullName);
    } catch (error) {}
  }
}

async function resizeImage(imagePath, width, height) {
  const image = await Jimp.read(imagePath);
  await image.resize(width, height);
  await image.writeAsync(imagePath);
}

export default updateAvatar;
