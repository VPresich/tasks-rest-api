import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import { saveFilesToStorage, resizeImage } from './updateAvatarGCS.js';

export const updateProfile = ctrlWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log('NAME:', name);
  const { id } = req.user;
  const { path: tempUpload } = req.file;

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser._id !== id) {
    throw HttpError(409, 'Email already in use');
  }

  let hashPassword = null;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  let avatarURL = '';
  if (tempUpload) {
    await resizeImage(tempUpload, 250, 250);
    avatarURL = await saveFilesToStorage(tempUpload, id, 'avatars/');
  }

  const updatedUserData = {};
  if (name) updatedUserData.name = name;
  if (email) updatedUserData.email = email;
  if (hashPassword) updatedUserData.password = hashPassword;
  if (avatarURL) updatedUserData.avatarURL = avatarURL;

  const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });

  res.status(200).json({
    updatedUser,
  });
});

export default updateProfile;
