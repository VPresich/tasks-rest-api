import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import queryString from 'query-string';

const googleAuth = ctrlWrapper(async (req, res, next) => {
  const redirectURI = `${process.env.BACKEND_BASE_URL}/users/google-redirect`;

  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectURI,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  return res.redirect(googleAuthUrl);
});

export default googleAuth;
