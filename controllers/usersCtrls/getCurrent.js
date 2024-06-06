import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getCurrent = ctrlWrapper(async (req, res, next) => {
  const { name, email, avatarURL, theme } = req.user;
  res.json({ name, email, avatarURL, theme });
});

export default getCurrent;
