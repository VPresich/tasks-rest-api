import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//import gravatar from 'gravatar';
import crypto from 'node:crypto';
import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import sendVerificationToken from '../../helpers/sendVerificationToken.js';
import { PATH_DEF_LIGHT_AVATAR } from '../../helpers/constants.js';

const register = ctrlWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();
  const user = await User.findOne({ email: emailInLowerCase });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);

  //const avatarURL = gravatar.url(email);
  const avatarURL = PATH_DEF_LIGHT_AVATAR;
  const verificationToken = crypto.randomUUID();

  //await sendVerificationToken(email, verificationToken);

  const newUser = await User.create({
    name,
    email: emailInLowerCase,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      theme: newUser.theme,
    },
  });
});

export default register;
