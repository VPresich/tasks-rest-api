import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

export const updateUserInfo = ctrlWrapper(async (req, res, next) => {
  const { name, email, password, theme } = req.body;
  const { id } = req.user;
  const existingUser = await User.findOne({ email });
  if (existingUser && !existingUser._id.equals(id)) {
    throw HttpError(409, 'Email already in use');
  }
  let hashPassword = null;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  const updatedUserData = {};
  if (name) updatedUserData.name = name;
  if (email) updatedUserData.email = email;
  if (hashPassword) updatedUserData.password = hashPassword;
  if (theme) updatedUserData.theme = theme;

  const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    theme: updatedUser.theme,
    avatarURL: updatedUser.avatarURL,
  });
});

export default updateUserInfo;
