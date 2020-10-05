import { Router } from 'express';

import AppointmentsController from '../../controllers/AppointmentsController';
import ProviderAppointmentsController from '../../controllers/ProviderAppointmentsController';

import ensureAuthenticated from './../../../users/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/', AppointmentsController.read);
appointmentsRoutes.post('/', AppointmentsController.create);

appointmentsRoutes.get('/me', ProviderAppointmentsController.index);

export default appointmentsRoutes;