import Column from '../../models/column.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const getOneColumn = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params; //columnId is checked in MidleWare

  const column = await Column.findById(id).populate(
    'board',
    '_id title background'
  );
  res.status(200).json(column);
});

export default getOneColumn;
