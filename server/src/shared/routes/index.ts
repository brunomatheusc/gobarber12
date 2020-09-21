import { Router } from 'express';

import appointmentsRoutes from '../../modules/appointments/http/routes/appointment.routes';
import userRoutes from '../../modules/users/http/routes/user.routes';
import passwordRoutes from '../../modules/users/http/routes/password.routes';
import sessionRoutes from '../../modules/users/http/routes/session.routes';
import profileRoutes from '../../modules/users/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);

export default routes;