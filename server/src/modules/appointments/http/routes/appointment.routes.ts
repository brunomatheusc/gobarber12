import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AppointmentsController from '../../controllers/AppointmentsController';
import ProviderAppointmentsController from '../../controllers/ProviderAppointmentsController';

import ensureAuthenticated from './../../../users/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post('/', celebrate({
	[Segments.BODY]: {
		provider_id: Joi.string().uuid().required(),
		date: Joi.date()
	}
}), AppointmentsController.create);
appointmentsRoutes.get('/', AppointmentsController.read);

appointmentsRoutes.get('/me', ProviderAppointmentsController.index);

export default appointmentsRoutes;