import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const login = ctrlWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();
  const user = await User.findOne({ email: emailInLowerCase });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  // if (!user.verify) {
  //   throw HttpError(401, 'Your account is not verified');
  // }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      theme: user.theme,
    },
  });
});

export default login;
