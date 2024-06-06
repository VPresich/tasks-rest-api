import path from 'node:path';
import fs from 'node:fs/promises';

import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import { uploadFileToCloudinary } from '../../helpers/uploadCloudinary.js';
import { deleteFile } from '../../helpers/imageUtiles.js';
import { AVATAR_SIZE_1 } from '../../helpers/constants.js';

const updateAvatarCloudinary = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { path: tempUpload } = req.file;

  const fileName = `${id}avatar`;
  const folder = 'avatars';
  const avatarURL = await uploadFileToCloudinary(
    tempUpload,
    fileName,
    folder,
    AVATAR_SIZE_1
  );

  await deleteFile(tempUpload);
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

export default updateAvatarCloudinary;
