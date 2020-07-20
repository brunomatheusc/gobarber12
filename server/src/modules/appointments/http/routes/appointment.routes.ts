import { Router } from 'express';

import AppointmentsController from '../../../../controllers/AppointmentsController';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', AppointmentsController.read);
appointmentsRoutes.post('/', AppointmentsController.create);

export default appointmentsRoutes;