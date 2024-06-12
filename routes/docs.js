import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: 'json' };
const docRouter = express.Router();
docRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default docRouter;
