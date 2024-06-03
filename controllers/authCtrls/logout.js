import User from '../../models/user.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const logout = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).end();
});

export default logout;
