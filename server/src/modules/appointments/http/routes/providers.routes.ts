import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProviderDayAvailabilityController from '../../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../../controllers/ProviderMonthAvailabilityController';

import ProvidersController from '../../controllers/ProvidersController';
import ensureAuthenticated from './../../../users/http/middlewares/ensureAuthenticated';

const providersRoutes = Router();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', ProvidersController.index);
providersRoutes.get('/:providerId/day-availability', celebrate({
	[Segments.PARAMS]: {
		provider_id: Joi.string().uuid().required()
	}
}), ProviderDayAvailabilityController.index);

providersRoutes.get('/:providerId/month-availability', celebrate({
	[Segments.PARAMS]: {
		provider_id: Joi.string().uuid().required()
	}
}), ProviderMonthAvailabilityController.index);

export default providersRoutes;