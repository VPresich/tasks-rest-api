import Jimp from 'jimp';
import path from 'node:path';
import fs from 'node:fs/promises';

import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import { uploadFileToGCS } from '../../helpers/upload.js';

const updateAvatarGCS = ctrlWrapper(async (req, res, next) => {
  const { id, avatarURL: oldAvatarURL } = req.user;
  const { path: tempUpload, originalname } = req.file;

  // Create unique avatars name for the user
  const gcsFileName = `${id}avatar${path.extname(originalname)}`;

  // Avatars name with full path
  const gcsPath = 'avatars/' + gcsFileName;

  // Change size of the user file
  await resizeImage(tempUpload, 250, 250);

  // upload to ToGCS
  let avatarURL = await uploadFileToGCS(tempUpload, gcsPath);
  avatarURL = `https://storage.cloud.google.com/${process.env.GOOGLE_BUCKET_NAME}/${gcsPath}`;
  await deleteAvatar(tempUpload);

  // Change field in DB
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

export default updateAvatarGCS;
