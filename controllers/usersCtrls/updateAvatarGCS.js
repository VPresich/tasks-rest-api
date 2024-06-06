import Jimp from 'jimp';
import path from 'node:path';
import fs from 'node:fs/promises';

import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import { uploadFileToGCS } from '../../helpers/upload.js';
import { CLOUD_STORAGE } from '../../helpers/constants.js';
import { AVATAR_SIZE_1 } from '../../helpers/constants.js';
import { resizeImage } from '../../helpers/imageUtiles.js';

const updateAvatarGCS = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  // Change size of the user file
  await resizeImage(tempUpload, AVATAR_SIZE_1, AVATAR_SIZE_1);
  const avatarURL = await saveFilesToStorage(tempUpload, id, 'avatars/');
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

export async function saveFilesToStorage(tempUpload, id, subPath) {
  // Create unique file name for the user
  const gcsFileName = `${id}avatar${path.extname(tempUpload)}`;

  // Avatars name with full path
  const gcsPath = subPath + gcsFileName;
  try {
    // upload to ToGCS
    let fileURL = await uploadFileToGCS(tempUpload, gcsPath);
    fileURL = `${CLOUD_STORAGE}${process.env.GOOGLE_BUCKET_NAME}/${gcsPath}`;

    // delete temp file
    await deleteFile(tempUpload);
    return fileURL;
  } catch (error) {
    throw new Error('Failed to update avatar in storage');
  }
}

export default updateAvatarGCS;
