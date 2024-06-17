import Background from '../models/background.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from './ctrlWrapper.js';

const checkBackground = ctrlWrapper(async (req, res, next) => {
  const { background } = req.body;

  if (!background) return next();
  if (background === 'no-img') return next();

  let id = null;
  try {
    id = await Background.findById(background);
    if (!id) {
      throw HttpError(404, 'Background not found');
    }
  } catch {
    throw HttpError(404, 'Background not found');
  }

  next();
});

export default checkBackground;
