import { Router } from 'express';

import ProvidersController from '../../controllers/ProvidersController';
import ensureAuthenticated from './../../../users/http/middlewares/ensureAuthenticated';

const providersRoutes = Router();

providersRoutes.use(ensureAuthenticated);
providersRoutes.get('/', ProvidersController.index);

export default providersRoutes;