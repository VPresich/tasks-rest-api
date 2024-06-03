import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getCurrent = ctrlWrapper(async (req, res, next) => {
  const { name, email, avatarURL } = req.user;
  res.json({ name, email, avatarURL });
});

export default getCurrent;
