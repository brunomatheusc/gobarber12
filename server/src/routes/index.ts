import { Router } from 'express';

import appointmentsRoutes from './appointment.routes';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', userRoutes);
routes.use('/session', sessionRoutes);

export default routes;