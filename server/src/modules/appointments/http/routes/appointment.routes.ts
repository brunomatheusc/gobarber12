import { Router } from 'express';

import AppointmentsController from '../../controllers/AppointmentsController';
import ProviderAppointmentsController from '../../controllers/ProviderAppointmentsController';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', AppointmentsController.read);
appointmentsRoutes.post('/', AppointmentsController.create);

appointmentsRoutes.get('/me', ProviderAppointmentsController.index);

export default appointmentsRoutes;