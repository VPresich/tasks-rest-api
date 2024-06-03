import crypto from 'node:crypto';
import User from '../../models/user.js';
import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import sendVerificationToken from '../../helpers/sendVerificationToken.js';

const resendVerifyEmail = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  if (!user.verificationToken) {
    const verificationToken = crypto.randomUUID();
    user.verificationToken = verificationToken;
    await user.save();
  }

  await sendVerificationToken(email, user.verificationToken);
  res.json({
    message: 'Verify email sent',
  });
});

export default resendVerifyEmail;
