import queryString from 'query-string';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { URL } from 'url';
import User from '../../models/user.js';
import { PATH_DEF_LIGHT_AVATAR } from '../../helpers/constants.js';

import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import HttpError from '../../helpers/HttpError.js';

const googleRedirect = ctrlWrapper(async (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenResponse = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_BASE_URL}/users/google-redirect`,
      grant_type: 'authorization_code',
      code: code,
    },
  });
  const { access_token, id_token } = tokenResponse.data;

  const userDataResponse = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { id, name, email } = userDataResponse.data;
  const emailInLowerCase = email.toLowerCase();

  const frontEndURL = `${process.env.FRONTEND_BASE_URL}welcome`;

  let user = await User.findOne({ googleId: id });

  if (!user) {
    user = await User.findOne({ email: emailInLowerCase });

    if (user) {
      if (!user.googleId) {
        user.googleId = id;
        await user.save();
      } else {
        //   throw HttpError(409, 'Email in use');
        return res.redirect(frontEndURL);
      }
    } else {
      const hashPassword = await bcrypt.hash('random_password', 10);
      user = new User({
        name,
        email: emailInLowerCase,
        password: hashPassword,
        googleId: id,
        avatarURL: PATH_DEF_LIGHT_AVATAR,
        verificationToken: 'verified',
        verify: true,
      });

      await user.save();
    }
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  user.token = token;
  await user.save();

  return res.redirect(`${frontEndURL}?token=${token}`);
});

export default googleRedirect;
