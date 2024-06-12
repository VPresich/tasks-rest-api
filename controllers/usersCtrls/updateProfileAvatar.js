import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import { uploadFileToCloudinary } from '../../helpers/uploadCloudinary.js';
import { AVATAR_SIZE_1 } from '../../helpers/constants.js';
import { deleteFile } from '../../helpers/imageUtiles.js';

export const updateProfile = ctrlWrapper(async (req, res, next) => {
  const { name, email, password, theme } = req.body;
  console.log('NAME:', name);
  const { id } = req.user;
  const { path: tempUpload } = req.file;

  const existingUser = await User.findOne({ email });
  if (existingUser && !existingUser._id.equals(id)) {
    throw HttpError(409, 'Email already in use');
  }

  let hashPassword = null;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }
  const fileName = `${id}avatar`;
  const folder = 'avatars';
  let avatarURL = '';
  if (tempUpload) {
    avatarURL = await uploadFileToCloudinary(
      tempUpload,
      fileName,
      folder,
      AVATAR_SIZE_1
    );
  }
  await deleteFile(tempUpload);
  const updatedUserData = {};
  if (name) updatedUserData.name = name;
  if (email) updatedUserData.email = email;
  if (hashPassword) updatedUserData.password = hashPassword;
  if (avatarURL) updatedUserData.avatarURL = avatarURL;

  const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });

  res.status(200).json({
    name: updatedUser.name,
    email: updatedUser.email,
    avatarURL: updatedUser.avatarURL,
    theme: updatedUser.theme,
  });
});

export default updateProfile;
