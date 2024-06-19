import express from 'express';
import validateBody from '../helpers/validateBody.js';
import authMiddleware from '../helpers/authMiddleware.js';
import upload from '../helpers/uploadMiddleware.js';
import authCtrls from '../controllers/authCtrls/index.js';
import usersCtrls from '../controllers/usersCtrls/index.js';
import {
  registerSchema,
  loginSchema,
  emailSchema,
  profileSchema,
  themeSchema,
} from '../schemas/usersSchemas.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), authCtrls.register);
authRouter.get('/verify/:verificationToken', authCtrls.verifyEmail);
authRouter.post(
  '/verify',
  validateBody(emailSchema),
  authCtrls.resendVerifyEmail
);
authRouter.post('/login', validateBody(loginSchema), authCtrls.login);
authRouter.post('/logout', authMiddleware, authCtrls.logout);

authRouter.get('/current', authMiddleware, usersCtrls.getCurrent);

authRouter.patch(
  '/',
  authMiddleware,
  validateBody(profileSchema),
  usersCtrls.updateUserInfo
);

authRouter.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  usersCtrls.updateAvatarCloudinary
);

authRouter.get('/avatar', authMiddleware, usersCtrls.getAvatarUrl);

authRouter.patch(
  '/themes',
  authMiddleware,
  validateBody(themeSchema),
  usersCtrls.updateTheme
);

authRouter.get('/themes', authMiddleware, usersCtrls.getTheme);

authRouter.patch(
  '/profile',
  authMiddleware,
  upload.single('avatar'),
  validateBody(profileSchema),
  usersCtrls.updateProfile
);

authRouter.get('/google', authCtrls.googleAuth);
authRouter.get('/google-redirect', authCtrls.googleRedirect);

export default authRouter;
