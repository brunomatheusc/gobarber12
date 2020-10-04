import { Router } from 'express';
import ProviderDayAvailabilityController from '../../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../../controllers/ProviderMonthAvailabilityController';

import ProvidersController from '../../controllers/ProvidersController';
import ensureAuthenticated from './../../../users/http/middlewares/ensureAuthenticated';

const providersRoutes = Router();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', ProvidersController.index);
providersRoutes.get('/:providerId/day-availability', ProviderDayAvailabilityController.index);
providersRoutes.get('/:providerId/month-availability', ProviderMonthAvailabilityController.index);

export default providersRoutes;