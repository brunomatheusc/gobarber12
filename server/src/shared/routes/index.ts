import { Router } from 'express';

import appointmentsRoutes from '../../modules/appointments/http/routes/appointment.routes';
import userRoutes from '../../modules/users/http/routes/user.routes';
import passwordRoutes from '../../modules/users/http/routes/user.routes';
import sessionRoutes from '../../modules/users/http/routes/session.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/password', passwordRoutes);

export default routes;