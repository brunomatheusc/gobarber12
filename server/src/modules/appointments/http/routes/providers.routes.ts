import { Router } from 'express';
import ProviderDayAvailabilityController from 'modules/appointments/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from 'modules/appointments/controllers/ProviderMonthAvailabilityController';

import ProvidersController from '../../controllers/ProvidersController';
import ensureAuthenticated from './../../../users/http/middlewares/ensureAuthenticated';

const providersRoutes = Router();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', ProvidersController.index);
providersRoutes.get('/:providerId/month-availability', ProviderMonthAvailabilityController.index);
providersRoutes.get('/:providerId/day-availability', ProviderDayAvailabilityController.index);

export default providersRoutes;